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
def get_program(name: str | None, genre: str | None, category: str | None,
                db: Session = Depends(get_db)) -> schemas.Channel:
    program = crud.get_program()
    return serializers.get_program(program)


@program_router.get(path="/{id}")
def get_program_by_program_id(id: int, db: Session = Depends(get_db)) -> schemas.Program:
    program = crud.get_program_by_program_id(id=id)

    return serializers.get_program(program)


@program_router.post(path="/{id}/rating")
def add_program_rating(response: Response, id: int, user: models.User = Depends(current_user), db: Session = Depends(get_db)):
    cookie = user.fingerprint
    response.set_cookie(key='fingerprint', value=cookie)


@program_router.post(path="/{id}/like")
def like_program(response: Response, id: int, user: models.User = Depends(current_user), db: Session = Depends(get_db)):
    cookie = user.fingerprint
    response.set_cookie(key='fingerprint', value=cookie)
    program = crud.program.get_program_by_program_id(id)
    new_user = crud.users.add_program(db, user, program)
    return new_user
