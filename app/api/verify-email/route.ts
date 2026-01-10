import { NextRequest, NextResponse } from 'next/server'
import teamLeaderEmails from '@/data/team-leader-emails.json'
import { sendEmailViaGmailAPI } from '@/lib/gmail-api'

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

    // Send email using Gmail API
    await sendEmailViaGmailAPI(normalizedEmail)

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
