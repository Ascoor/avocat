import argparse, json, os
from sqlalchemy import create_engine, text

def make_engine():
    u=os.getenv("DB_USERNAME","app")
    p=os.getenv("DB_PASSWORD","app_password")
    h=os.getenv("DB_HOST","127.0.0.1")
    pt=os.getenv("DB_PORT","55432")
    d=os.getenv("DB_DATABASE","app")
    return create_engine(f"postgresql+psycopg2://{u}:{p}@{h}:{pt}/{d}", pool_pre_ping=True)

def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--input", default="data/new-legalCases/leg_cases_normalized.json")
    ap.add_argument("--created-by", type=int, required=True)
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--skip-missing", action="store_true", help="skip rows missing type/subtype instead of failing")
    args = ap.parse_args()

    rows = load_json(args.input)
    if not isinstance(rows, list):
        raise SystemExit("input is not a list")

    eng = make_engine()

    # existing slugs -> id
    existing = {}
    with eng.connect() as c:
        for r in c.execute(text("select id, slug from leg_cases")).mappings():
            existing[str(r["slug"])] = int(r["id"])

    inserted = updated = skipped = missing = 0

    upsert_sql = text("""
        insert into leg_cases
            (slug, title, description, fees, total_expenses, total_payments, expenses,
             case_type_id, case_sub_type_id,
             created_by, updated_by,
             litigants_name, litigants_address, litigants_phone,
             litigants_lawyer_name, litigants_lawyer_phone,
             client_capacity, status,
             created_at, updated_at)
        values
            (:slug, :title, :description, :fees, :total_expenses, :total_payments, :expenses,
             :case_type_id, :case_sub_type_id,
             :created_by, :updated_by,
             :litigants_name, :litigants_address, :litigants_phone,
             :litigants_lawyer_name, :litigants_lawyer_phone,
             :client_capacity, :status,
             now(), now())
        on conflict (slug) do update set
            title = excluded.title,
            description = excluded.description,
            fees = excluded.fees,
            total_expenses = excluded.total_expenses,
            total_payments = excluded.total_payments,
            expenses = excluded.expenses,
            case_type_id = excluded.case_type_id,
            case_sub_type_id = excluded.case_sub_type_id,
            updated_by = excluded.updated_by,
            litigants_name = excluded.litigants_name,
            litigants_address = excluded.litigants_address,
            litigants_phone = excluded.litigants_phone,
            litigants_lawyer_name = excluded.litigants_lawyer_name,
            litigants_lawyer_phone = excluded.litigants_lawyer_phone,
            client_capacity = excluded.client_capacity,
            status = excluded.status,
            updated_at = now()
        returning id
    """)

    # مهم: لازم يكون عندك unique index على slug عشان ON CONFLICT يشتغل.
    # لو مش موجود، السكربت هيفشل ويقولك.

    with eng.begin() as c:
        for row in rows:
            slug = str(row.get("slug") or "").strip()
            if not slug:
                skipped += 1
                continue

            if not row.get("case_type_id") or not row.get("case_sub_type_id"):
                if args.skip_missing:
                    missing += 1
                    continue
                raise SystemExit(f"Row missing mappings for slug={slug}")

            payload = dict(row)
            payload["created_by"] = args.created_by
            payload["updated_by"] = row.get("updated_by") or None

            # dry-run
            if args.dry_run:
                if slug in existing:
                    updated += 1
                else:
                    inserted += 1
                continue

            new_id = c.execute(upsert_sql, payload).scalar()
            if slug in existing:
                updated += 1
            else:
                inserted += 1
                existing[slug] = int(new_id)

    print("DONE import_leg_cases")
    print("input rows:", len(rows))
    print("inserted:", inserted, "updated:", updated, "skipped:", skipped, "missing:", missing)
    if args.dry_run:
        print("(dry-run) no DB writes")

if __name__ == "__main__":
    main()
