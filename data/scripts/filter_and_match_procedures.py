import argparse
import json
import os
import re
from collections import defaultdict
from datetime import datetime
from typing import Any, Dict, List, Optional

from sqlalchemy import text
from db import make_engine

AR_DIGITS = str.maketrans("٠١٢٣٤٥٦٧٨٩", "0123456789")

def normalize_digits(s: str) -> str:
    return s.translate(AR_DIGITS)

def clean_str(v: Any) -> Optional[str]:
    if v is None:
        return None
    if isinstance(v, (int, float)):
        return str(v)
    if not isinstance(v, str):
        return None
    s = v.strip()
    s = re.sub(r"\s+", " ", s)
    return s if s else None

def parse_date(v: Any) -> Optional[str]:
    s = clean_str(v)
    if not s:
        return None
    s = normalize_digits(s)

    m = re.match(r"^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$", s)
    if m:
        d, mo, y = int(m.group(1)), int(m.group(2)), int(m.group(3))
        try:
            return datetime(y, mo, d).strftime("%Y-%m-%d")
        except:
            return None

    m = re.match(r"^(\d{4})-(\d{1,2})-(\d{1,2})$", s)
    if m:
        y, mo, d = int(m.group(1)), int(m.group(2)), int(m.group(3))
        try:
            return datetime(y, mo, d).strftime("%Y-%m-%d")
        except:
            return None

    return None

def normalize_status(v: Any) -> Optional[str]:
    s = clean_str(v)
    if not s:
        return None
    s = s.replace("جارى", "جاري")

    mapping = {
        "تم": "تمت",
        "تمت": "تمت",
        "جاري": "جاري التنفيذ",
        "جاري التنفيذ": "جاري التنفيذ",
        "لم ينفذ": "لم ينفذ",
        "لم يُنفذ": "لم ينفذ",
    }
    return mapping.get(s, s)

def detect_kind(rec: dict, source_path: str = "") -> str:
    p = (source_path or "").lower()

    # 1) path-based
    if "/sessions/" in p or "\\sessions\\" in p:
        return "session"
    if "/announcements/" in p or "\\announcements\\" in p:
        return "announcement"
    if "/others/" in p or "\\others\\" in p:
        return "procedure"

    # 2) field-based sessions (strongest)
    session_keys = {
        "session_date", "session_type", "session_status",
        "roll_number", "requests_and_pleas", "judgement_statement", "circuit"
    }
    if any(k in rec and rec.get(k) not in (None, "", []) for k in session_keys):
        return "session"

    # 3) announcement hints
    pt = rec.get("procedure_type") or rec.get("procedureType") or ""
    if isinstance(pt, str) and ("اعلان" in pt or "إعلان" in pt):
        return "announcement"
    # optional ad fields if exist
    if any(k in rec for k in ("send_date", "receive_date")):
        return "announcement"

    # 4) procedure hints
    proc_keys = {"date_start", "date_end", "procedure_place", "procedure_place_type", "order_details"}
    if any(k in rec and rec.get(k) not in (None, "", []) for k in proc_keys):
        return "procedure"

    # 5) fallback by procedure_type
    if isinstance(pt, str) and ("جلس" in pt):
        return "session"
    if isinstance(pt, str) and ("إجر" in pt or "اجراء" in pt or "إجراء" in pt):
        return "procedure"

    return "procedure"

def iter_json_files(root: str) -> List[str]:
    if os.path.isfile(root):
        return [root]
    out = []
    for r, _, files in os.walk(root):
        for f in files:
            if f.lower().endswith(".json"):
                out.append(os.path.join(r, f))
    return sorted(out)

def load_rows(path: str) -> List[Dict[str, Any]]:
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    if isinstance(data, list):
        return [x for x in data if isinstance(x, dict)]
    if isinstance(data, dict):
        for k in ("data", "items", "records"):
            v = data.get(k)
            if isinstance(v, list):
                return [x for x in v if isinstance(x, dict)]
        return [data]
    return []

def build_slug_to_id(engine) -> Dict[str, int]:
    q = text("select id, slug from leg_cases where is_deleted = false")
    m: Dict[str, int] = {}
    with engine.connect() as conn:
        for row in conn.execute(q):
            slug = (row.slug or "").strip()
            if slug:
                m[slug] = int(row.id)
    return m

def to_money(v: Any) -> str:
    s = clean_str(v) or "0"
    s = normalize_digits(s)
    s = s.replace(",", "").replace(" ", "")
    return s if s else "0"

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--input", required=True, help="e.g. data/procedures")
    ap.add_argument("--output", default="data/filtered", help="output folder")
    ap.add_argument("--year", type=int, default=None, help="only this year (based on date)")
    args = ap.parse_args()

    engine = make_engine()
    slug_map = build_slug_to_id(engine)
    print(f"Loaded {len(slug_map)} leg_cases slugs from DB")

    buckets_proc = defaultdict(list)    # year -> []
    buckets_sess = defaultdict(list)
    buckets_ads  = defaultdict(list)
    unmatched = []

    files = iter_json_files(args.input)
    for fp in files:
        rows = load_rows(fp)
        for rec in rows:
            kind = detect_kind(rec, fp)

            case_slug = clean_str(rec.get("case_slug"))
            if case_slug:
                case_slug = normalize_digits(case_slug)

            leg_case_id = slug_map.get(case_slug) if case_slug else None

            if kind == "session":
                d = parse_date(rec.get("session_date"))
                year = int(d[:4]) if d else None
                if args.year and year != args.year:
                    continue

                out = {
                    "legacy_kind": "session",
                    "legacy_source": fp,
                    "case_slug": case_slug,
                    "leg_case_id": leg_case_id,

                    "session_date": d,
                    "session_type": clean_str(rec.get("session_type")),
                    "status": normalize_status(rec.get("session_status")),
                    "court_or_prosecution": clean_str(rec.get("court_or_prosecution")),
                    "circuit": clean_str(rec.get("circuit")),
                    "roll_number": clean_str(rec.get("roll_number")),
                    "lawyer_name": clean_str(rec.get("lawyer_name")),

                    "orders": clean_str(rec.get("requests_and_pleas")),
                    "result": clean_str(rec.get("resultes") or rec.get("results") or rec.get("decision_or_result")),
                    "judgement_statement": clean_str(rec.get("judgement_statement")),
                    "note": clean_str(rec.get("notes")),

                    "cost1": to_money(rec.get("cost1")),
                    "cost2": to_money(rec.get("cost2")),
                    "cost3": to_money(rec.get("cost3")),
                    "extra_costs": {
                        "cost4": to_money(rec.get("cost4")),
                        "cost5": to_money(rec.get("cost5")),
                        "cost6": to_money(rec.get("cost6")),
                    },
                }

                if leg_case_id:
                    buckets_sess[year or "unknown"].append(out)
                else:
                    out["unmatched_reason"] = "case_slug_not_found"
                    unmatched.append(out)

            elif kind == "announcement":
                ds = parse_date(rec.get("date_start") or rec.get("send_date"))
                de = parse_date(rec.get("date_end") or rec.get("receive_date"))
                year = int(ds[:4]) if ds else None
                if args.year and year != args.year:
                    continue

                out = {
                    "legacy_kind": "announcement",
                    "legacy_source": fp,
                    "case_slug": case_slug,
                    "leg_case_id": leg_case_id,

                    "date_start": ds,
                    "date_end": de,
                    "procedure_place": clean_str(rec.get("procedure_place")),
                    "procedure_place_type": clean_str(rec.get("procedure_place_type")),
                    "status": normalize_status(rec.get("status") or rec.get("session_status")),
                    "lawyer_name": clean_str(rec.get("lawyer_name")),

                    "description": clean_str(rec.get("order_details")),
                    "result": clean_str(rec.get("resultes") or rec.get("results") or rec.get("decision_or_result")),
                    "note": clean_str(rec.get("notes")),

                    "cost1": to_money(rec.get("cost1")),
                    "cost2": to_money(rec.get("cost2")),
                    "cost3": to_money(rec.get("cost3")),
                    "extra_costs": {
                        "cost4": to_money(rec.get("cost4")),
                        "cost5": to_money(rec.get("cost5")),
                        "cost6": to_money(rec.get("cost6")),
                    },
                }

                if leg_case_id:
                    buckets_ads[year or "unknown"].append(out)
                else:
                    out["unmatched_reason"] = "case_slug_not_found"
                    unmatched.append(out)

            else:
                ds = parse_date(rec.get("date_start"))
                de = parse_date(rec.get("date_end"))
                year = int(ds[:4]) if ds else None
                if args.year and year != args.year:
                    continue

                out = {
                    "legacy_kind": "procedure",
                    "legacy_source": fp,
                    "case_slug": case_slug,
                    "leg_case_id": leg_case_id,

                    "date_start": ds,
                    "date_end": de,
                    "procedure_place": clean_str(rec.get("procedure_place")),
                    "procedure_place_type": clean_str(rec.get("procedure_place_type")),
                    "status": normalize_status(rec.get("status")),
                    "lawyer_name": clean_str(rec.get("lawyer_name")),

                    "job": clean_str(rec.get("order_details")),
                    "result": clean_str(rec.get("resultes") or rec.get("results") or rec.get("decision_or_result")),
                    "note": clean_str(rec.get("notes")),

                    "cost1": to_money(rec.get("cost1")),
                    "cost2": to_money(rec.get("cost2")),
                    "cost3": to_money(rec.get("cost3")),
                    "extra_costs": {
                        "cost4": to_money(rec.get("cost4")),
                        "cost5": to_money(rec.get("cost5")),
                        "cost6": to_money(rec.get("cost6")),
                    },
                }

                if leg_case_id:
                    buckets_proc[year or "unknown"].append(out)
                else:
                    out["unmatched_reason"] = "case_slug_not_found"
                    unmatched.append(out)

    os.makedirs(args.output, exist_ok=True)

    for y, rows in buckets_proc.items():
        with open(os.path.join(args.output, f"procedures_{y}.json"), "w", encoding="utf-8") as f:
            json.dump(rows, f, ensure_ascii=False, indent=2)

    for y, rows in buckets_sess.items():
        with open(os.path.join(args.output, f"sessions_{y}.json"), "w", encoding="utf-8") as f:
            json.dump(rows, f, ensure_ascii=False, indent=2)

    for y, rows in buckets_ads.items():
        with open(os.path.join(args.output, f"announcements_{y}.json"), "w", encoding="utf-8") as f:
            json.dump(rows, f, ensure_ascii=False, indent=2)

    with open(os.path.join(args.output, "unmatched.json"), "w", encoding="utf-8") as f:
        json.dump(unmatched, f, ensure_ascii=False, indent=2)

    print("DONE")
    print(f"procedures buckets:     {len(buckets_proc)}")
    print(f"sessions buckets:       {len(buckets_sess)}")
    print(f"announcements buckets:  {len(buckets_ads)}")
    print(f"unmatched records:      {len(unmatched)}")
    print(f"output folder:          {args.output}")

if __name__ == "__main__":
    main()
    