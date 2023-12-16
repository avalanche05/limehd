from typing import List, Type

from sqlalchemy import func, and_
from sqlalchemy.orm import Session
from limehd import models, schemas


def get_program_by_program_id(db: Session, id: int) -> models.Program:
    program = db.query(models.Program).filter(models.Program.id == id).first()

    return program


