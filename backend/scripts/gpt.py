import openai

from limehd.dependencies import get_db
from limehd.models import Program


def get_program_genre(program_description: str) -> bool:
    api_key = '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'

    openai.api_key = api_key

    response = openai.Completion.create(
        engine="text-davinci-002",
        prompt=f"Define the genre of the program based on it's description. Description: '{program_description}",
        max_tokens=50
    )

    return response.choices[0].text


db = next(get_db())
programs = db.query(Program).all()
for program in programs:
    print(program.description)
