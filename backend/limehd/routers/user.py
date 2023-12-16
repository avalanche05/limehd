from fastapi import APIRouter, Body, Depends, HTTPException, Response
from requests import Session

from limehd import schemas, crud, serializers, models
from limehd.dependencies import get_db, current_user

user_router = APIRouter(
    prefix="/user",
    tags=["User"],
)


@user_router.get(path="")
def get_user(user: models.User = Depends(current_user),
             db: Session = Depends(get_db)
             ) -> schemas.User:
    return serializers.get_user(user)
