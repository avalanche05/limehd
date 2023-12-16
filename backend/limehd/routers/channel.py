from fastapi import APIRouter, Body, Depends, HTTPException, Response
from requests import Session
from datetime import datetime

from limehd import schemas, crud, serializers, models
from limehd.dependencies import get_db, current_user

channel_router = APIRouter(
    prefix="/channel",
    tags=["Channel"],
)


@channel_router.get(path="")
def get_channel_by_channel_name(channel_name: str,
                                start: datetime,
                                end: datetime,
                                db: Session = Depends(get_db),
                                ) -> schemas.Channel:
    channel = crud.get_channel_by_channel_name(...)

    return channel


@channel_router.get(path="/{id}")
def get_channel_by_channel_id(id: int,
                              db: Session = Depends(get_db),
                              ) -> schemas.Channel:
    channel = crud.get_channel_by_channel_id(...)

    return channel


@channel_router.post(path="/{id}/rating")
def add_channel_rating(id: int,
                       db: Session = Depends(get_db)):
    ...


@channel_router.post(path="/{id}/like")
def like_channel(id: int,
                 db: Session = Depends(get_db)):
    ...
