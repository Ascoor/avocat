import argparse
from sqlalchemy import inspect
from db import make_engine

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--table", required=True)
    args = ap.parse_args()

    engine = make_engine()
    insp = inspect(engine)

    cols = insp.get_columns(args.table)
    if not cols:
        print(f"Table not found or has no columns: {args.table}")
        return

    print(f"Columns for {args.table}:")
    for c in cols:
        print(f"- {c['name']} ({c['type']}) nullable={c.get('nullable')} default={c.get('default')}")

if __name__ == "__main__":
    main()
