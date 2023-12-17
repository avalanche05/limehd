from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
from .db import SessionLocal
from limehd.crud import read_user_by_token
from limehd.models import User


oauth2_scheme = HTTPBearer()


def get_db():
    with SessionLocal() as db:
        yield db


def current_user(
        db: Session = Depends(get_db),
        access_token: str | None = Depends(oauth2_scheme)) -> User:
    if not access_token:
        raise HTTPException(
            status_code=401,
            detail="Not authenticated",
        )

    return read_user_by_token(db, access_token.credentials)
