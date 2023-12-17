from fastapi import APIRouter, Body, Depends, HTTPException, Response, Header, Request
from requests import Session
from datetime import datetime

from limehd import schemas, crud, serializers, models
from limehd.dependencies import get_db, current_user

program_router = APIRouter(
    prefix="/program",
    tags=["Program"],
)


def get_all_headers(headers: dict = Depends(lambda x: x.headers)):
    return headers


@program_router.get(path="")
def get_program(request: Request,
                genre: str | None = None,
                category: str | None = None,
                start: datetime | None = None,
                finish: datetime | None = None,
                search_name: str | None = None,
                db: Session = Depends(get_db),
                ) -> list[schemas.Program]:
    headers = request.headers
    if 'Authorization' in headers:
        bearer = headers['Authorization'].split()[1]
        user = crud.read_user_by_token(db, bearer)
        user_id = user.id
    else:
        user_id = -1
    db_programs = crud.get_programs(db, search_name=search_name,
                                    genre=genre,
                                    category=category,
                                    start=start,
                                    finish=finish)
    return serializers.get_programs(db_programs, user_id)


@program_router.get(path="/{id}")
def get_program_by_program_id(request: Request, id: int, db: Session = Depends(get_db)) -> schemas.Program:
    headers = request.headers
    if 'Authorization' in headers:
        bearer = headers['Authorization'].split()[1]
        user = crud.read_user_by_token(db, bearer)
        user_id = user.id
    else:
        user_id = -1
    program = crud.get_program_by_program_id(db, id)
    return serializers.get_program(program, user_id)


@program_router.post(path="/{program_id}/rating")
def add_program_rating(
        program_id: int,
        mark: float,
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
