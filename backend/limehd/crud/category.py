from sqlalchemy.orm import Session
from limehd.models import Program


def get_categories(db: Session) -> list[str]:
    db_categories = db.query(Program.category).distinct()
    return [category[0] for category in db_categories]
