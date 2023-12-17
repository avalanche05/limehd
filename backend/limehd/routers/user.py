from fastapi import APIRouter, Body, Depends, HTTPException, Response, HTTPException, status
from requests import Session
from datetime import datetime
from typing import List

from limehd import schemas, crud, serializers, models
from limehd.dependencies import get_db, current_user
from limehd.schemas import LoginSchema
from limehd.crud import get_by_email, create_user, create_token
from limehd.models import User
from limehd.serializers import get_token

user_router = APIRouter(
    prefix="/user",
    tags=["User"],
)


@user_router.post('/register')
def register(login_schema: LoginSchema, db: Session = Depends(get_db)):
    user_by_email = get_by_email(db, login_schema.login)
    if not user_by_email:
        user = create_user(db, login_schema)
        token = create_token(db, user.id)
        return get_token(token)
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Вы уже зарегистрированы")


@user_router.post("/login")
def login(login_schema: LoginSchema, db: Session = Depends(get_db)):
    user = get_by_email(db, login_schema.login)
    if user and user.check_password(login_schema.password):
        token = create_token(db, user.id)
        return get_token(token)
    else:
        return HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Неправильный логин или пароль")


@user_router.get(path="/subscriptions")
def get_user_subscriptions(response: Response,
                           start: datetime = None,
                           finish: datetime = None,
                           user: models.User = Depends(current_user),
                           db: Session = Depends(get_db)):
    cookie = user.fingerprint
    response.set_cookie(key="fingerprint", value=cookie, samesite="None")
    favorite_programs = crud.get_favorite_programs(db, user.id)
    favorite_streams = crud.get_favorite_streams(db, favorite_programs, start=start, finish=finish)

    return serializers.get_streams(favorite_streams)
