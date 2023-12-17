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
    program = crud.get_program_by_program_id(id=id)

    return serializers.get_program(program)


@program_router.post(path="/{id}/rating")
def add_program_rating(id: int, db: Session = Depends(get_db)):
    ...


@program_router.post(path="/{id}/like")
def like_program(id: int, db: Session = Depends(get_db)):
    ...
