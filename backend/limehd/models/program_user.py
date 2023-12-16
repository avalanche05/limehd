from sqlalchemy import Table, Column, ForeignKey

from limehd.models import BaseSqlModel

association_table_program_user = Table(
    "association_table_program_user",
    BaseSqlModel.metadata,
    Column("user_id", ForeignKey("users.id"), primary_key=True),
    Column("program_id", ForeignKey("programs.id"), primary_key=True),
)
