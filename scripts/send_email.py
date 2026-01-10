import os
import smtplib
from email.message import EmailMessage
from pathlib import Path
import argparse
import json

IDEA_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdEABLy1s2eSylEMP5-IEzpghI2nEXRbpqrh5agtxw2gHZD6A/viewform?usp=dialog"

DEFAULT_SUBJECT = "HackVeda Idea Submission Link"
DEFAULT_BODY = (
    "Hi team leader,\n\n"
    "Your email has been verified. Please submit your idea using the link below:\n"
    f"{IDEA_FORM_URL}\n\n"
    "If you did not request this, please ignore this email.\n\n"
    "— HackVeda Team"
)


def send_mail(recipient: str, subject: str = DEFAULT_SUBJECT, body: str = DEFAULT_BODY) -> None:
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASS")
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("SMTP_PORT", "465"))
    smtp_from = os.getenv("SMTP_FROM", smtp_user)

    if not smtp_user or not smtp_pass:
        raise RuntimeError("SMTP_USER and SMTP_PASS are required (use an app password for Gmail)")

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = smtp_from
    msg["To"] = recipient.strip().lower()
    msg.set_content(body)

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_pass)
        server.send_message(msg)


def load_recipients(source: str | None) -> list[str]:
    if source is None:
        return []
    path = Path(source)
    if not path.exists():
        raise FileNotFoundError(f"Recipient file not found: {path}")
    if path.suffix.lower() == ".json":
        data = json.loads(path.read_text())
        if isinstance(data, dict) and "emails" in data:
            return [e.strip().lower() for e in data["emails"] if e]
        if isinstance(data, list):
            return [str(e).strip().lower() for e in data if e]
    raise ValueError("Unsupported recipient file format; use JSON with an 'emails' array")


def main() -> None:
    parser = argparse.ArgumentParser(description="Send HackVeda idea submission link via email")
    parser.add_argument("--email", help="Single recipient email address")
    parser.add_argument("--file", help="Path to JSON file with an 'emails' array")
    args = parser.parse_args()

    recipients: list[str] = []

    if args.email:
        recipients.append(args.email.strip().lower())

    if args.file:
        recipients.extend(load_recipients(args.file))

    if not recipients:
        parser.error("Provide --email or --file")

    for recipient in recipients:
        send_mail(recipient)
        print(f"Sent to {recipient}")


if __name__ == "__main__":
    main()
