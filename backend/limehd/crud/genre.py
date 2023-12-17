from sqlalchemy.orm import Session
from limehd.models import Program


def get_genres(db: Session) -> list[str]:
    db_genres = db.query(Program.genre).distinct()
    return [genre[0] for genre in db_genres]
