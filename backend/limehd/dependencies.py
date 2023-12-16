from sqlalchemy.orm import Session
from fastapi import Depends, Header
from .db import SessionLocal
from limehd.crud import check_cookie, create_user_without_fingerprint, get_by_user_id
from limehd.models import User


async def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


async def current_user(
        db: Session = Depends(get_db),
        cookie: str | None = Header(None, convert_underscores=True),
) -> User:
    fingerprint = None
    if cookie and 'fingerprint' in cookie:
        params = cookie.split()
        for param in params:
            if 'fingerprint' in param:
                fingerprint = param.split('=')[1]

    if not fingerprint or not check_cookie(db, fingerprint):
        user = create_user_without_fingerprint(db)
        fingerprint = user.fingerprint
    return get_by_user_id(db, fingerprint)
