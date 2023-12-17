from sqlalchemy.orm import Session
from limehd.models import Token
from limehd.utils.token import generate_bearer_token
from limehd import error


def create_token(db: Session, user_id: int) -> Token:
    """Создание токена"""
    db_token = Token(
        value=generate_bearer_token(10),
        user_id=user_id,
        is_alive=True,
    )
    db.add(db_token)
    db.commit()
    db.refresh(db_token)

    return db_token


def read_token(db: Session, value: str) -> Token:
    """Получение токена"""
    token = db.query(Token).filter(Token.value == value).first()

    if token is None:
        raise Exception("Not authentithicated")

    return token
