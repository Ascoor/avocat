import argparse
from sqlalchemy import text
from db import make_engine

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--table", required=True)
    ap.add_argument("--limit", type=int, default=10)
    args = ap.parse_args()

    e = make_engine()
    q = text(f"select * from {args.table} limit :n")
    with e.connect() as c:
        rows = c.execute(q, {"n": args.limit}).mappings().all()
    print(f"{args.table} sample ({len(rows)} rows):")
    for r in rows:
        print(dict(r))

if __name__ == '__main__':
    main()
