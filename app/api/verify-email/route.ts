import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import teamLeaderEmails from '@/data/team-leader-emails.json'

const execAsync = promisify(exec)

// Function to trigger Python mail script
async function triggerPythonMailScript(email: string) {
  try {
    const pythonScriptPath = path.join(process.cwd(), 'python_script', 'mail.py')
    // Execute Python script with email as argument
    const { stdout, stderr } = await execAsync(`python "${pythonScriptPath}" "${email}"`, {
      cwd: path.join(process.cwd(), 'python_script'),
      timeout: 30000, // 30 second timeout
    })
    console.log(`✅ Python mail script executed successfully for ${email}`)
    if (stdout) console.log('Script output:', stdout)
  } catch (error) {
    console.error(`⚠️ Python mail script completed with error for ${email}:`, error)
    // Don't throw - script likely executed and sent mail despite error output
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

    // Trigger Python mail script to send email
    await triggerPythonMailScript(normalizedEmail)

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
