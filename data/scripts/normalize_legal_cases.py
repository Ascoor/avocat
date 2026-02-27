import argparse, glob, json, os, re
from typing import Any, Dict, List, Optional, Tuple

from sqlalchemy import text
from db import make_engine

AR_REPL = str.maketrans({
    "أ": "ا", "إ": "ا", "آ": "ا",
    "ى": "ي", "ؤ": "و", "ئ": "ي",
    "ة": "ه",
})

def clean(s: Any) -> Optional[str]:
    if s is None:
        return None
    if not isinstance(s, str):
        s = str(s)
    s = s.strip()
    s = re.sub(r"\s+", " ", s)
    return s or None

def norm_ar(s: Optional[str]) -> str:
    if not s:
        return ""
    s = clean(s) or ""
    s = s.translate(AR_REPL)
    s = s.replace("ـ", "")
    s = re.sub(r"\s+", " ", s).strip()
    s = re.sub(r"^(ال)+", "", s)  # remove leading "ال"
    return s.lower()

def is_header_row(row: dict) -> bool:
    # header غالباً: year="السنة" أو slug="رقم ملف القضية"
    y = norm_ar(row.get("year"))
    slug = (row.get("slug") or "")
    return y in ("السنه", "السنة", "year") or ("رقم ملف القضية" in slug)

def score_row(row: dict) -> int:
    # نختار السجل الأكثر اكتمالاً عند تكرار slug
    fields = [
        "case_subject", "case_number", "court", "case_type",
        "judicial_level", "client_name", "client_status",
        "case_status", "year",
    ]
    return sum(1 for f in fields if clean(row.get(f)))

def load_rows(path: str) -> List[dict]:
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    if isinstance(data, list):
        return [x for x in data if isinstance(x, dict)]
    return []

def build_case_types_map(engine) -> Dict[str, int]:
    q = text("select id, name from case_types where deleted_at is null")
    m: Dict[str, int] = {}
    with engine.connect() as c:
        for r in c.execute(q).mappings():
            n = clean(r["name"])
            if n:
                m[norm_ar(n)] = int(r["id"])
    return m

def build_case_sub_types_map(engine) -> Dict[Tuple[int, str], int]:
    q = text("select id, name, case_type_id from case_sub_types where deleted_at is null")
    m: Dict[Tuple[int, str], int] = {}
    with engine.connect() as c:
        for r in c.execute(q).mappings():
            n = clean(r["name"])
            if n:
                m[(int(r["case_type_id"]), norm_ar(n))] = int(r["id"])
    return m

def build_case_sub_types_any_map(engine) -> Dict[str, int]:
    # fallback بالاسم فقط (لتجاوز عدم اتساق seed)
    q = text("select id, name from case_sub_types where deleted_at is null")
    m: Dict[str, int] = {}
    with engine.connect() as c:
        for r in c.execute(q).mappings():
            n = clean(r["name"])
            if n:
                k = norm_ar(n)
                if k not in m:
                    m[k] = int(r["id"])
    return m

def resolve_case_type_id(case_types: Dict[str, int], raw: Optional[str]) -> Optional[int]:
    if not raw:
        return None
    n = norm_ar(raw)
    direct = case_types.get(n)
    if direct:
        return direct

    # Aliases for common legacy values
    if n in ("مدني", "مدنى"):
        for cand in ("مدني كلي", "مدني جزئي", "مدني", "مدنى كلى", "مدنى جزئى"):
            cid = case_types.get(norm_ar(cand))
            if cid:
                return cid

    if n in ("جنائي", "جنائى"):
        for cand in ("جنايات", "جنائي", "جنائى"):
            cid = case_types.get(norm_ar(cand))
            if cid:
                return cid

    return None

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--input-glob", default="legalCases/cases_batch_*.json")
    ap.add_argument("--out-dir", default="data/new-legalCases")
    ap.add_argument("--created-by", type=int, default=1)
    ap.add_argument("--fail-on-missing", action="store_true")
    args = ap.parse_args()

    os.makedirs(args.out_dir, exist_ok=True)

    files = sorted(glob.glob(args.input_glob))
    if not files:
        raise SystemExit(f"No files matched: {args.input_glob}")

    engine = make_engine()
    case_types = build_case_types_map(engine)
    sub_types = build_case_sub_types_map(engine)
    sub_types_any = build_case_sub_types_any_map(engine)

    by_slug: Dict[str, dict] = {}
    duplicates: List[dict] = []
    missing_case_types: Dict[str, int] = {}
    missing_case_sub_types: Dict[Tuple[str, str], int] = {}

    total_in = 0
    header_skipped = 0

    for fp in files:
        rows = load_rows(fp)
        for row in rows:
            total_in += 1
            if is_header_row(row):
                header_skipped += 1
                continue

            slug = clean(row.get("slug"))
            if not slug:
                continue

            case_type_raw = clean(row.get("case_type"))
            judicial_level_raw = clean(row.get("judicial_level"))

            case_type_id = resolve_case_type_id(case_types, case_type_raw)

            if not case_type_id:
                k = norm_ar(case_type_raw)
                if k:
                    missing_case_types[k] = missing_case_types.get(k, 0) + 1

            case_sub_type_id: Optional[int] = None
            if judicial_level_raw:
                jl = norm_ar(judicial_level_raw)
                if case_type_id:
                    case_sub_type_id = sub_types.get((case_type_id, jl))
                if not case_sub_type_id:
                    # fallback by name only
                    case_sub_type_id = sub_types_any.get(jl)

                if not case_sub_type_id:
                    missing_case_sub_types[(case_type_raw or "", judicial_level_raw)] = (
                        missing_case_sub_types.get((case_type_raw or "", judicial_level_raw), 0) + 1
                    )

            normalized = {
                "slug": slug,
                "title": None,
                "description": clean(row.get("case_subject")),
                "fees": None,
                "total_expenses": 0,
                "total_payments": 0,
                "expenses": None,
                "case_type_id": case_type_id,
                "case_sub_type_id": case_sub_type_id,
                "created_by": args.created_by,
                "updated_by": None,
                "litigants_name": clean(row.get("client_name")),
                "litigants_address": None,
                "litigants_phone": None,
                "litigants_lawyer_name": None,
                "litigants_lawyer_phone": None,
                "client_capacity": clean(row.get("client_status")) or "مدعى",
                "status": clean(row.get("case_status")) or "قيد التجهيز",
                "legacy": {
                    "year": clean(row.get("year")),
                    "court_text": clean(row.get("court")),
                    "case_number_text": clean(row.get("case_number")),
                    "case_type_text": case_type_raw,
                    "judicial_level_text": judicial_level_raw,
                    "source_file": fp,
                },
            }

            prev = by_slug.get(slug)
            if prev:
                duplicates.append({
                    "slug": slug,
                    "kept_from": prev["legacy"]["source_file"],
                    "dropped_from": fp,
                })
                # FIX: score original row vs prev legacy? We'll compare by completeness of legacy fields.
                # Here we compare completeness of current row vs previous kept row using legacy texts.
                current_score = sum(1 for f in ["year","court_text","case_number_text","case_type_text","judicial_level_text"]
                                    if clean(normalized["legacy"].get(f)))
                prev_score = sum(1 for f in ["year","court_text","case_number_text","case_type_text","judicial_level_text"]
                                 if clean(prev["legacy"].get(f)))
                if current_score > prev_score:
                    by_slug[slug] = normalized
            else:
                by_slug[slug] = normalized

    out_path = os.path.join(args.out_dir, "leg_cases_normalized.json")
    report_path = os.path.join(args.out_dir, "report.json")

    output_rows = list(by_slug.values())
    missing_rows = [r for r in output_rows if not r["case_type_id"] or not r["case_sub_type_id"]]

    if args.fail_on_missing and missing_rows:
        with open(report_path, "w", encoding="utf-8") as f:
            json.dump({
                "total_input_rows": total_in,
                "header_rows_skipped": header_skipped,
                "unique_slugs": len(output_rows),
                "duplicates_count": len(duplicates),
                "missing_rows_count": len(missing_rows),
                "missing_case_types": sorted([(k, v) for k, v in missing_case_types.items() if k], key=lambda x: -x[1])[:200],
                "missing_case_sub_types": sorted([([k1, k2], v) for (k1, k2), v in missing_case_sub_types.items()], key=lambda x: -x[1])[:200],
                "sample_missing_rows": missing_rows[:50],
            }, f, ensure_ascii=False, indent=2)
        raise SystemExit(f"Missing mappings detected: {len(missing_rows)} rows. See {report_path}")

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(output_rows, f, ensure_ascii=False, indent=2)

    with open(report_path, "w", encoding="utf-8") as f:
        json.dump({
            "total_input_rows": total_in,
            "header_rows_skipped": header_skipped,
            "unique_slugs": len(output_rows),
            "duplicates_count": len(duplicates),
            "missing_rows_count": len(missing_rows),
            "missing_case_types_top": sorted([(k, v) for k, v in missing_case_types.items() if k], key=lambda x: -x[1])[:50],
            "missing_case_sub_types_top": sorted([([k1, k2], v) for (k1, k2), v in missing_case_sub_types.items()], key=lambda x: -x[1])[:50],
            "duplicates_sample": duplicates[:50],
        }, f, ensure_ascii=False, indent=2)

    print("DONE normalize_legal_cases")
    print("Input rows:", total_in, "Header skipped:", header_skipped)
    print("Unique slugs:", len(output_rows), "Duplicates:", len(duplicates))
    print("Missing mappings rows:", len(missing_rows))
    print("Wrote:", out_path)
    print("Report:", report_path)

if __name__ == "__main__":
    main()