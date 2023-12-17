from sqlalchemy.orm import Session

from limehd.models import program as db_model_program
from limehd import schemas, serializers, models


def get_program(db_program: db_model_program.Program, is_empty_streams: bool = False) -> schemas.Program:
    print(db_program.id, db_program.name, db_program.start, db_program.finish, db_program.rating, db_program.genre, db_program.category, db_program.image, db_program.streams)
    program = schemas.Program(
        id=db_program.id,
        name=db_program.name,
        description=db_program.description,
        start=db_program.start,
        finish=db_program.finish,
        rating=db_program.rating,
        genre=db_program.genre,
        category=db_program.category,
        image=db_program.image,
        streams=[serializers.get_stream(stream) for stream in db_program.streams] if not is_empty_streams else [],
    )
    return program


def get_programs(db_programs: list[db_model_program.Program], user_id: int) -> list[schemas.Program]:
    return [get_program(db_program) for db_program in db_programs]
