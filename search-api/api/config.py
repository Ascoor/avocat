# config.py

import os

from pydantic import BaseModel

class Settings(BaseModel):
    app_name: str = "Search API"
    debug: bool = False

settings = Settings(
    app_name=os.environ.get("APP_NAME", "Search API"),
    debug=os.environ.get("APP_DEBUG", "false").lower() in {"1", "true", "yes"},
)
