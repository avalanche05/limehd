from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import db, routers, config
from limehd.routers import user_router, channel_router, program_router


@asynccontextmanager
async def lifespan(_: FastAPI):
    db.BaseSqlModel.metadata.create_all(bind=db.engine)
    yield


def create_app() -> FastAPI:
    _app = FastAPI(lifespan=lifespan)

    _app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    _app.include_router(user_router)
    _app.include_router(channel_router)
    _app.include_router(program_router)

    return _app
