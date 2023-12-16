import smtplib
import os
from email.mime.text import MIMEText
import smtplib, ssl
from jinja2 import Environment, FileSystemLoader


TEMPLATES_DIRECTORY = "./template"
template_loader = FileSystemLoader(os.path.abspath(TEMPLATES_DIRECTORY))

SMTP_SERVER: smtplib.SMTP | None = None
TEMPLATES = Environment(loader=template_loader)
html_template = TEMPLATES.get_template("template.html")

SERVICE_MAIL_USER = os.getenv('SERVICE_MAIL_USER')
SERVICE_MAIL_PASSWORD = os.getenv('SERVICE_MAIL_PASSWORD')
SERVICE_MAIL_HOST = os.getenv('SERVICE_MAIL_HOST')


def mailing(data: dict, address: str):
    smtp_server = SERVICE_MAIL_HOST
    port = 587
    sender_email = SERVICE_MAIL_USER
    password = SERVICE_MAIL_PASSWORD

    try:
        context = ssl.create_default_context()
        server = smtplib.SMTP(smtp_server, port)
        server.starttls(context=context) # Secure the connection
        server.login(sender_email, password)
        msg = MIMEText(
            TEMPLATES.get_template("template.html").render(**data),
            "html",
        )
        server.send_message(msg, sender_email, address)
    except Exception as e:
        # Print any error messages to stdout
        print(e)
    finally:
        server.quit()
