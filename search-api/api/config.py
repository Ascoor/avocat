# config.py

from pydantic import BaseSettings

class Settings(BaseSettings):
    app_name: str = "Search API"
    debug: bool = False
    database_url: str = "sqlite:///:memory:"
    api_key: str = "your_api_key_here"

    class Config:
        env_file = ".env"

settings = Settings()
