import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'

const SCOPES = ['https://www.googleapis.com/auth/gmail.send']
const TOKEN_PATH = path.join(process.cwd(), 'python_script', 'token.json')
const CREDENTIALS_PATH = path.join(process.cwd(), 'python_script', 'credentials.json')

const IDEA_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdEABLy1s2eSylEMP5-IEzpghI2nEXRbpqrh5agtxw2gHZD6A/viewform?usp=dialog'

interface EmailContent {
  to: string
  subject: string
  body: string
}

async function authenticateGmail() {
  let credentials
  let token

  // Try to load from files first (local development)
  if (fs.existsSync(CREDENTIALS_PATH) && fs.existsSync(TOKEN_PATH)) {
    credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8'))
    token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'))
  }
  // Fallback to environment variables (production)
  else if (process.env.GMAIL_CREDENTIALS && process.env.GMAIL_TOKEN) {
    credentials = JSON.parse(process.env.GMAIL_CREDENTIALS)
    token = JSON.parse(process.env.GMAIL_TOKEN)
  } else {
    throw new Error('Gmail credentials not found. Please set GMAIL_CREDENTIALS and GMAIL_TOKEN environment variables.')
  }

  const { client_secret, client_id, redirect_uris } = credentials.installed || credentials.web

  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  )

  oAuth2Client.setCredentials(token)

  return oAuth2Client
}

export async function sendEmailViaGmailAPI(recipientEmail: string): Promise<void> {
  const auth = await authenticateGmail()
  const gmail = google.gmail({ version: 'v1', auth })

  const subject = 'HackVeda Idea Submission Form Link'
  const body = `Dear Team Leaders,

We are excited to announce that the idea submission phase for HackVeda is now open.

Please submit your team's proposal using the form link provided below. To ensure a smooth review process, all teams must strictly adhere to the following requirements:

1) Use the official PPT format: Submissions must be made using the slide deck linked below.
2) Follow the guidelines: Review the rulebook/guidelines document carefully before finalizing your submission.

Important links:
- Submission Form: ${IDEA_FORM_URL}
- Submission Guidelines: https://drive.google.com/file/d/1ape-rJqmuSZDE6r4ITjgXJ7DRB9eezpe/view
- Official Idea PPT Template: https://docs.google.com/presentation/d/1ifZ9GZPlaS-Xqy748fxYinOKp9C8kFdb/edit?slide=id.p1#slide=id.p1

Submission deadline: January 16th, 2025, at 11:59 PM.

We look forward to seeing your innovative ideas!

Best regards,
Team HackVeda`

  // Create email message
  const message = [
    `To: ${recipientEmail}`,
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
    `Subject: ${subject}`,
    '',
    body,
  ].join('\n')

  // Encode message in base64
  const encodedMessage = Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')

  // Send email
  await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage,
    },
  })

  console.log(`✅ Email sent successfully to ${recipientEmail}`)
}
