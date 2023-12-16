from contextlib import asynccontextmanager
from fastapi import FastAPI, APIRouter, Response, Depends
from fastapi.middleware.cors import CORSMiddleware
from . import db
from sqlalchemy.orm import DeclarativeBase, Session
from limehd.dependencies import get_db
from limehd.auth import current_user
from limehd import models


class Base(DeclarativeBase):
    pass


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(bind=db.engine)
    yield


_app = FastAPI(lifespan=lifespan)

_app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


router = APIRouter()


@router.post('/', response_model=dict[str, int])
def test(response: Response, user: models.User = Depends(current_user), db: Session = Depends(get_db)) -> dict[str, int]:
    cookie = user.fingerprint
    response.set_cookie(key='fingerprint', value=cookie)
    return {'1': 1}


_app.include_router(router)
