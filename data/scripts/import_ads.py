import argparse, json, os, re
from typing import Any, Optional, Dict, Tuple
from sqlalchemy import text
from db import make_engine

def clean(s: Any) -> Optional[str]:
    if s is None:
        return None
    if not isinstance(s, str):
        s = str(s)
    s = s.strip()
    s = re.sub(r"\s+", " ", s)
    return s or None

def norm_key(s: Optional[str]) -> str:
    if not s:
        return ""
    s = clean(s) or ""
    return s.lower()

def load_json(path: str):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def build_name_to_id(engine, table: str, name_col: str = "name") -> Dict[str, int]:
    q = text(f"select id, {name_col} as name from {table} where deleted_at is null")
    m = {}
    with engine.connect() as c:
        for r in c.execute(q).mappings():
            n = clean(r["name"])
            if n:
                m[norm_key(n)] = int(r["id"])
    return m

def build_users_name_to_id(engine) -> Dict[str, int]:
    q = text("select id, name from users")
    m = {}
    with engine.connect() as c:
        for r in c.execute(q).mappings():
            n = clean(r["name"])
            if n:
                m[norm_key(n)] = int(r["id"])
    return m

def find_existing_ad(engine, leg_case_id: int, send_date: str, description: str) -> Optional[int]:
    q = text("""
        select id from legal_ads
        where leg_case_id = :leg_case_id
          and send_date = :send_date
          and lower(description) = lower(:description)
        limit 1
    """)
    with engine.connect() as c:
        return c.execute(q, {"leg_case_id": leg_case_id, "send_date": send_date, "description": description}).scalar()

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--year", required=True)
    ap.add_argument("--dir", default="data/filtered")
    ap.add_argument("--created-by", type=int, default=1)
    ap.add_argument("--default-court-id", type=int, required=True)
    ap.add_argument("--default-ad-type-id", type=int, required=True)
    ap.add_argument("--default-lawyer-send", default="1", help="string stored in lawyer_send_id")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    path = os.path.join(args.dir, f"announcements_{args.year}.json")
    rows = load_json(path) if os.path.exists(path) else []
    print(f"Loaded {len(rows)} announcement rows from {path}")

    engine = make_engine()

    courts = build_name_to_id(engine, "courts", "name")
    ad_types = build_name_to_id(engine, "legal_ad_types", "name")
    users_by_name = build_users_name_to_id(engine)

    inserted = updated = skipped = missing_case = 0

    with engine.begin() as c:
        for r in rows:
            leg_case_id = r.get("leg_case_id")
            if not leg_case_id:
                missing_case += 1
                continue

            send_date = r.get("date_start")
            if not send_date:
                skipped += 1
                continue

            description = clean(r.get("description")) or ""
            if not description:
                skipped += 1
                continue

            receive_date = r.get("date_end")
            status = clean(r.get("status")) or "قيد التجهيز"
            results = clean(r.get("result"))

            # court mapping: prefer procedure_place -> courts.name, else default
            court_name = clean(r.get("procedure_place"))
            court_id = courts.get(norm_key(court_name)) if court_name else None
            if not court_id:
                court_id = args.default_court_id

            # ad type mapping: try name contains "إعلان" else default
            ad_type_id = None
            # if we have a named type in record later, use it; currently we don't, so heuristic:
            if "اعلان" in description or "إعلان" in description:
                # try to find "إعلان" type by exact
                ad_type_id = ad_types.get(norm_key("إعلان")) or ad_types.get(norm_key("اعلان"))
            if not ad_type_id:
                ad_type_id = args.default_ad_type_id

            # lawyer_send_id: map lawyer_name to users.id as string, else default
            lawyer_name = clean(r.get("lawyer_name"))
            lawyer_id = users_by_name.get(norm_key(lawyer_name)) if lawyer_name else None
            lawyer_send_id = str(lawyer_id) if lawyer_id else str(args.default_lawyer_send)

            cost1 = r.get("cost1") or "0"
            cost2 = r.get("cost2") or "0"
            cost3 = r.get("cost3") or "0"

            existing_id = find_existing_ad(engine, int(leg_case_id), send_date, description)
            if existing_id:
                # update
                if args.dry_run:
                    updated += 1
                    continue
                c.execute(text("""
                    update legal_ads
                    set results = :results,
                        receive_date = :receive_date,
                        status = :status,
                        court_id = :court_id,
                        legal_ad_type_id = :legal_ad_type_id,
                        lawyer_send_id = :lawyer_send_id,
                        cost1 = :cost1, cost2 = :cost2, cost3 = :cost3,
                        updated_by = :updated_by,
                        updated_at = now()
                    where id = :id
                """), {
                    "id": existing_id,
                    "results": results,
                    "receive_date": receive_date,
                    "status": status,
                    "court_id": court_id,
                    "legal_ad_type_id": ad_type_id,
                    "lawyer_send_id": lawyer_send_id,
                    "cost1": cost1, "cost2": cost2, "cost3": cost3,
                    "updated_by": args.created_by,
                })
                updated += 1
            else:
                # insert
                if args.dry_run:
                    inserted += 1
                    continue
                c.execute(text("""
                    insert into legal_ads
                        (description, results, send_date, receive_date,
                         lawyer_send_id, legal_ad_type_id,
                         status, leg_case_id, court_id,
                         cost1, cost2, cost3, created_by, created_at, updated_at)
                    values
                        (:description, :results, :send_date, :receive_date,
                         :lawyer_send_id, :legal_ad_type_id,
                         :status, :leg_case_id, :court_id,
                         :cost1, :cost2, :cost3, :created_by, now(), now())
                """), {
                    "description": description,
                    "results": results,
                    "send_date": send_date,
                    "receive_date": receive_date,
                    "lawyer_send_id": lawyer_send_id,
                    "legal_ad_type_id": ad_type_id,
                    "status": status,
                    "leg_case_id": int(leg_case_id),
                    "court_id": int(court_id),
                    "cost1": cost1, "cost2": cost2, "cost3": cost3,
                    "created_by": args.created_by,
                })
                inserted += 1

    print("DONE import_ads")
    print("inserted:", inserted, "updated:", updated, "skipped:", skipped, "missing_case:", missing_case)

if __name__ == "__main__":
    main()
