import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import teamLeaderEmails from '@/data/team-leader-emails.json'

const execAsync = promisify(exec)

const IDEA_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdEABLy1s2eSylEMP5-IEzpghI2nEXRbpqrh5agtxw2gHZD6A/viewform?usp=dialog'

// Nodemailer transporter for production
const transporter = nodemailer.createTransport({
  pool: true,
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 465),
  secure: process.env.SMTP_SECURE === 'true' || true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  maxConnections: 5,
  maxMessages: 500,
})

const emailFrom = process.env.SMTP_FROM || process.env.SMTP_USER || 'no-reply@hackveda.local'

// Function to send email using nodemailer (production)
async function sendEmailViaNodemailer(email: string) {
  const emailHTML = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #E16D3C;">Dear Team Leaders,</h2>
      <p>We are excited to announce that the idea submission phase for <strong>HackVeda</strong> is now open.</p>
      <p>Please submit your team's proposal using the form link provided below. To ensure a smooth review process, all teams must strictly adhere to the following requirements:</p>
      <ol>
        <li><strong>Use the official PPT format:</strong> Submissions must be made using the slide deck linked below.</li>
        <li><strong>Follow the guidelines:</strong> Review the rulebook/guidelines document carefully before finalizing your submission.</li>
      </ol>
      <h3 style="color: #E16D3C;">Important Links:</h3>
      <ul>
        <li><a href="${IDEA_FORM_URL}" style="color: #E16D3C;">Submission Form</a></li>
        <li><a href="https://drive.google.com/file/d/1ape-rJqmuSZDE6r4ITjgXJ7DRB9eezpe/view" style="color: #E16D3C;">Submission Guidelines</a></li>
        <li><a href="https://docs.google.com/presentation/d/1ifZ9GZPlaS-Xqy748fxYinOKp9C8kFdb/edit?slide=id.p1#slide=id.p1" style="color: #E16D3C;">Official Idea PPT Template</a></li>
      </ul>
      <p style="color: #d32f2f; font-weight: bold;">Submission deadline: January 16th, 2025, at 11:59 PM</p>
      <p>We look forward to seeing your innovative ideas!</p>
      <p style="margin-top: 20px;">Best regards,<br><strong>Team HackVeda</strong></p>
    </div>
  `

  await transporter.sendMail({
    from: emailFrom,
    to: email,
    subject: 'HackVeda Idea Submission Form Link',
    text: `Dear Team Leaders,

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
Team HackVeda`,
    html: emailHTML,
  })
}

// Function to trigger Python mail script (local development only)
async function triggerPythonMailScript(email: string) {
  try {
    const pythonScriptPath = path.join(process.cwd(), 'python_script', 'mail.py')
    const { stdout, stderr } = await execAsync(`python "${pythonScriptPath}" "${email}"`, {
      cwd: path.join(process.cwd(), 'python_script'),
      timeout: 30000,
    })
    console.log(`✅ Python mail script executed successfully for ${email}`)
    if (stdout) console.log('Script output:', stdout)
  } catch (error) {
    console.error(`⚠️ Python script failed:`, error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Normalize email to lowercase
    const normalizedEmail = email.trim().toLowerCase()

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(normalizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Check if email exists in registered team leader emails
    if (!teamLeaderEmails.emails.includes(normalizedEmail)) {
      return NextResponse.json(
        {
          error: 'Email not registered. Please ensure you are using the team leader email registered with us.'
        },
        { status: 404 }
      )
    }

    // Ensure SMTP credentials are present
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact support.' },
        { status: 500 }
      )
    }

    // Try Python script first (local), fallback to nodemailer (production)
    try {
      await triggerPythonMailScript(normalizedEmail)
    } catch (pythonError) {
      console.log('Python script unavailable, using nodemailer fallback')
      await sendEmailViaNodemailer(normalizedEmail)
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      email: normalizedEmail
    })

  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json(
      { error: 'An error occurred while verifying the email' },
      { status: 500 }
    )
  }
}
