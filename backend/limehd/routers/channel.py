from fastapi import APIRouter, Depends, Response, Request
from sqlalchemy.orm import Session

from limehd import schemas, crud, serializers, models
from limehd.dependencies import get_db, current_user
from datetime import datetime

channel_router = APIRouter(
    prefix="/channel",
    tags=["Channel"],
)


@channel_router.get(path="")
def get_channels(
        request: Request,
        search_name: str = None,
        start: datetime = None,
        finish: datetime = None,
        db: Session = Depends(get_db),
) -> list[schemas.Channel]:
    headers = request.headers
    print(headers)
    if 'Authorization' in headers:
        bearer = headers['Authorization'].split()[1]
        user = crud.read_user_by_token(db, bearer)
        user_id = user.id
    else:
        user_id = -1

    channels = crud.get_channels(db, search_name=search_name, start=start, finish=finish)
    return serializers.get_channels(channels, user_id)


@channel_router.get(path="/{channel_id}")
def get_channel_by_channel_id(
        request: Request,
        channel_id: int,
        db: Session = Depends(get_db),
) -> schemas.Channel:
    headers = request.headers
    if 'Authorization' in headers:
        bearer = headers['Authorization'].split()[1]
        user = crud.read_user_by_token(db, bearer)
        user_id = user.id
    else:
        user_id = -1
    channel = crud.get_channel_by_channel_id(db, id=channel_id)
    return serializers.get_channel(channel, user_id)


@channel_router.post(path="/{channel_id}/rating")
def add_channel_rating(
        channel_id: int,
        mark: float,
        db: Session = Depends(get_db),
) -> dict:
    crud.update_channel_rating(db, channel_id=channel_id, mark=mark)
    return {"message": f"Rating updated for channel with ID {channel_id}"}


@channel_router.post(path="/{channel_id}/like")
def like_channel(response: Response,
                 channel_id: int,
                 user: models.User = Depends(current_user),
                 db: Session = Depends(get_db),
                 ) -> dict:
    cookie = user.fingerprint
    response.set_cookie(key="fingerprint", value=cookie, samesite="None", secure=True)
    crud.add_subscriber_to_channel(db, user_id=user.id, channel_id=channel_id)
    return {"message": f"User with ID {user.id} subscribed to channel with ID {id}"}
