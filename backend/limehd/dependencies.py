from fastapi import Cookie, HTTPException, status, Depends
from sqlalchemy.orm import Session
from .db import SessionLocal
import logging
from limehd import models


# from app.service.auth import get_current_user
# from app.utils.logging import log
# from app.data import models


def get_db():
    with SessionLocal() as db:
        yield db


async def current_user(
        db: Session = Depends(get_db),
        access_token: str | None = None,
) -> models.User:
    pass
