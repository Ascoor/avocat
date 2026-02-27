import os
from sqlalchemy import create_engine

def make_engine():
    user = os.getenv("DB_USERNAME", "app")
    pwd  = os.getenv("DB_PASSWORD", "app_password")
    host = os.getenv("DB_HOST", "127.0.0.1")
    port = os.getenv("DB_PORT", "55432")
    db   = os.getenv("DB_DATABASE", "app")

    url = f"postgresql+psycopg2://{user}:{pwd}@{host}:{port}/{db}"
    return create_engine(url, pool_pre_ping=True)
