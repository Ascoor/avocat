import argparse, json, os
from collections import Counter

def load(path):
    if not os.path.exists(path):
        return []
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dir", default="data/filtered")
    ap.add_argument("--year", default="2017")
    args = ap.parse_args()

    proc = load(os.path.join(args.dir, f"procedures_{args.year}.json"))
    sess = load(os.path.join(args.dir, f"sessions_{args.year}.json"))
    ads  = load(os.path.join(args.dir, f"announcements_{args.year}.json"))
    un   = load(os.path.join(args.dir, "unmatched.json"))

    def summarize(name, rows):
        c = Counter()
        for r in rows:
            c["rows"] += 1
            if r.get("leg_case_id"): c["matched"] += 1
            else: c["unmatched"] += 1
            st = (r.get("status") or "").strip()
            if st: c[f"status:{st}"] += 1
        print(f"\n== {name} ==")
        print("rows:", c["rows"], "matched:", c["matched"], "unmatched:", c["unmatched"])
        for k,v in c.most_common(10):
            if k.startswith("status:"):
                print(k, v)

    summarize("procedures", proc)
    summarize("sessions", sess)
    summarize("announcements", ads)

    print("\n== unmatched total ==")
    print("unmatched.json rows:", len(un))
    if un:
        print("sample unmatched:", {k: un[0].get(k) for k in ("legacy_kind","case_slug","legacy_source","unmatched_reason")})

if __name__ == "__main__":
    main()
