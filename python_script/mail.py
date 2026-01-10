import base64
import sys
from email.message import EmailMessage

from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
import os

SCOPES = ['https://www.googleapis.com/auth/gmail.send']

# =====================
# EDIT EMAIL CONTENT
# =====================
SUBJECT = "HackVeda Idea Submission Form Link"
BODY = """Dear Team Leaders,

We are excited to announce that the idea submission phase for HackVeda is now open.

Please submit your team's proposal using the form link provided below. To ensure a smooth review process, all teams must strictly adhere to the following requirements:

1) Use the official PPT format: Submissions must be made using the slide deck linked below.
2) Follow the guidelines: Review the rulebook/guidelines document carefully before finalizing your submission.

Important links:
- Submission Form: https://docs.google.com/forms/d/e/1FAIpQLSdEABLy1s2eSylEMP5-IEzpghI2nEXRbpqrh5agtxw2gHZD6A/viewform?usp=dialog
- Submission Guidelines: https://drive.google.com/file/d/1ape-rJqmuSZDE6r4ITjgXJ7DRB9eezpe/view
- Official Idea PPT Template: https://docs.google.com/presentation/d/1ifZ9GZPlaS-Xqy748fxYinOKp9C8kFdb/edit?slide=id.p1#slide=id.p1

Submission deadline: January 16th, 2025, at 11:59 PM.

We look forward to seeing your innovative ideas!

Best regards,
Team HackVeda
"""

# Get email from command line argument or input
if len(sys.argv) > 1:
    recipient = sys.argv[1].strip()
else:
    recipient = input("Enter Recipient Email Address: ").strip()


def authenticate_gmail():
    creds = None

    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES
            )
            creds = flow.run_local_server(port=0)

        with open('token.json', 'w') as token:
            token.write(creds.to_json())

    return creds


def send_email():
    creds = authenticate_gmail()
    service = build('gmail', 'v1', credentials=creds)

    message = EmailMessage()
    message.set_content(BODY)
    message['To'] = recipient
    message['From'] = "me"
    message['Subject'] = SUBJECT

    encoded_message = base64.urlsafe_b64encode(
        message.as_bytes()
    ).decode()

    send_message = service.users().messages().send(
        userId="me",
        body={'raw': encoded_message}
    ).execute()

    print("✅ Email sent successfully!")


send_email()