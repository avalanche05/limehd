from fastapi import Depends
from sqlalchemy.orm import Session
from limehd.models import User, Program
from limehd.utils import generate_fingerprint
from limehd.crud.token import read_token
from limehd import error


def create_user_without_fingerprint(db: Session) -> User:
    fingerprint = generate_fingerprint()
    user = User(
        email=None,
        hashed_password=None,
        fingerprint=fingerprint
    )
    db.add(user)
    db.commit()
    return user


def get_by_user_id(db: Session, fingerprint: str) -> User:
    user = db.query(User).filter(User.fingerprint == fingerprint).first()
    return user


def check_cookie(db: Session, cookie: str) -> User | None:
    user = db.query(User).filter(User.fingerprint == cookie).first()
    if user:
        return user.fingerprint
    return None


def get_by_email(db: Session, email: str) -> User | None:
    user = db.query(User).filter(User.email == email).first()
    return user


def add_program(db: Session, user: User, program: Program) -> User:
    user.programs.append(program)
    db.commit()
    return user


def read_user_by_token(db: Session, token: str) -> User:
    """Получение пользователя"""
    token = read_token(db, token)

    user = db.query(User).filter(User.id == token.user_id).first()

    if user is None:
        raise error.UserNotFoundError()

    return user
