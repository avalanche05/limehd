FROM python:slim-bullseye

WORKDIR /app

RUN pip install sqlalchemy scheduler jinja2

COPY . .

CMD ["python", "schedule.py"]