from sqlalchemy.orm import Session

from limehd.models import program as db_model_program
from limehd import schemas, serializers


def get_program(db: Session, db_program: db_model_program) -> schemas.Program:
    program = schemas.Program(
        id=db_program.id,
        name=db_program.name,
        start=db_program.start,
        finish=db_program.finish,
        rating=db_program.rating,
        genre=db_program.genre,
        category=db_program.categrory,
        image=db_program.image,
        streams=db_program.streams
    )

    return program
