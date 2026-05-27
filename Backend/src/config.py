import os
from dotenv import load_dotenv

# Load variables from .env file:
load_dotenv()


class Config:
    # Ctor:
    def __init__(self) -> None:
        self.openai_api_key: str = os.getenv("OPENAI_API_KEY", "")
        self.db_host: str = os.getenv("DB_HOST", "localhost")
        self.db_user: str = os.getenv("DB_USER", "root")
        self.db_password: str = os.getenv("DB_PASSWORD", "")
        self.db_name: str = os.getenv("DB_NAME", "chat_db")
        self.port: int = int(os.getenv("PORT", "8000"))


# Singleton config instance used across the app:
config = Config()
