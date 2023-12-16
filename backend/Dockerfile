# Use an official Python runtime as a parent image
FROM python:3.11

WORKDIR /backend

COPY ./backend /backend

RUN python -m pip install poetry

# Install project dependencies
RUN poetry install --no-interaction --no-ansi
RUN pip install uvicorn
RUN pip install fastapi

EXPOSE 8000

# Run app.py when the container launches
CMD ["uvicorn", "limehd.main:app"]
