FROM python:slim-bullseye

WORKDIR /app

RUN pip install sqlalchemy scheduler jinja2 werkzeug psycopg2-binary

COPY . .

CMD ["python", "schedule.py"]