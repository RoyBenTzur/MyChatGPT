from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from typing import Generator
from config import config


Base = declarative_base()


# Create the database schema if it does not exist yet:
def create_database() -> None:
    # Connect to MySQL without specifying the target DB:
    root_url = (
        f"mysql+pymysql://{config.db_user}:{config.db_password}"
        f"@{config.db_host}"
    )
    root_engine = create_engine(root_url)
    with root_engine.connect() as conn:
        conn.execute(text(f"CREATE DATABASE IF NOT EXISTS {config.db_name}"))  # Idempotent.
    root_engine.dispose()


# Main DB engine using the target database:
DATABASE_URL = (
    f"mysql+pymysql://{config.db_user}:{config.db_password}"
    f"@{config.db_host}/{config.db_name}"
)
engine = create_engine(DATABASE_URL)

# Session factory — one session per request:
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# FastAPI dependency that yields a DB session and closes it when done:
def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()  # Always release the connection.
