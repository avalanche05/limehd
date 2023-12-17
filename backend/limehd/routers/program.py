from fastapi import APIRouter, Body, Depends, HTTPException, Response
from requests import Session
from datetime import datetime

from limehd import schemas, crud, serializers, models
from limehd.dependencies import get_db, current_user

program_router = APIRouter(
    prefix="/program",
    tags=["Program"],
)


@program_router.get(path="")
def get_program(response: Response, user: models.User = Depends(current_user),
                name: str | None = None,
                genre: str | None = None,
                category: str | None = None,
                start: datetime | None = None,
                finish: datetime | None = None,
                search_name: str | None = None,
                db: Session = Depends(get_db)) -> schemas.Channel:
    db_programs = crud.get_programs(db, start_date=start,
                                    finish_date=finish,
                                    genre=genre,
                                    category=category,
                                    search_name=search_name)

    return serializers.get_program(sprogram)


@program_router.get(path="/{id}")
def get_program_by_program_id(id: int, db: Session = Depends(get_db)) -> schemas.Program:
    program = crud.get_program_by_program_id(db, id)

    return serializers.get_program(program)


@program_router.post(path="/{id}/rating")
def add_program_rating(
        program_id: int,
        mark: int,
        db: Session = Depends(get_db),
) -> schemas.Program:

    program = crud.program.get_program_by_program_id(db, program_id)
    marked_program = crud.update_program_rating(db, program, mark)
    return serializers.get_program(marked_program)


@program_router.post(path="/{id}/like")
def like_program(response: Response, id: int, user: models.User = Depends(current_user), db: Session = Depends(get_db)):
    cookie = user.fingerprint
    response.set_cookie(key='fingerprint', value=cookie)
    program = crud.program.get_program_by_program_id(db, id)
    if not program:
        raise HTTPException(status_code=404)
    else:
        new_user = crud.users.add_program(db, user, program)
        return serializers.serialize_user(new_user)
