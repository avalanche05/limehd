from sqlalchemy.orm import Session
from .db import SessionLocal


async def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


