import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';

// This API route handles Group Coaching enrollment requests
// It sends an email notification using Brevo API

export async function POST(request) {
  try {
    // Parse the incoming form data
    const body = await request.json();
    const { name, email, phone, goal } = body;

    // Validate required fields
    if (!name || !email || !goal) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    // 🛡️ RATE LIMITING - Allow max 2 enrollments per email per hour
    const isAllowed = checkRateLimit(email, 2, 3600000);
    
    if (!isAllowed) {
      return NextResponse.json(
        { 
          error: 'Too many enrollment requests. Please try again in 1 hour.',
          rateLimitExceeded: true
        },
        { status: 429 }
      );
    }

    // Prepare email content for Brevo
    const emailData = {
      sender: {
        name: "Ten Percent Academy",
        email: "contact@hmwebs.com" // Replace with your verified sender email
      },
      to: [
        {
          email: "tenpercentacademy10@gmail.com", // Replace with your email
          name: "Ten Percent Academy Team"
        }
      ],
      subject: `New Group Coaching Enrollment from ${name}`,
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #00b66f; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f7f9fa; padding: 30px; border: 1px solid #e2e5e9; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #0f172a; }
            .value { margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #00b66f; }
            .badge { display: inline-block; background-color: #00b66f; color: white; padding: 5px 15px; border-radius: 20px; font-size: 14px; margin-top: 10px; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e5e9; color: #6e7b8a; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏆 New Group Coaching Enrollment</h1>
            </div>
            <div class="content">
              <p>You have received a new enrollment request for the Group Coaching Program:</p>
              
              <div class="field">
                <div class="label">👤 Name:</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              
              ${phone ? `
              <div class="field">
                <div class="label">📱 Phone:</div>
                <div class="value">${phone}</div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="label">🎯 Goal for Joining:</div>
                <div class="value">${goal}</div>
              </div>
              
              <div style="background-color: #e6f7f0; padding: 15px; border-radius: 8px; margin-top: 20px;">
                <p style="margin: 0; color: #0f172a;"><strong>Program Details:</strong></p>
                <p style="margin: 10px 0 0 0; color: #6e7b8a;">
                  • Duration: 8 Weeks Complete Program<br>
                  • Price: $300 (Payment plans available)<br>
                  • Group Size: Maximum 12 participants<br>
                  • Sessions: 2 weekly 2-hour group sessions<br>
                  • Bonus: Weekly 2h follow-up meetings
                </p>
              </div>
              
              <div class="footer">
                <p>Please review the enrollment request and send program details within 24 hours.</p>
                <p><strong>Ten Percent Academy - Group Coaching Program</strong></p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Send email using Brevo API
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify(emailData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API Error:', errorData);
      throw new Error('Failed to send email');
    }

    const result = await response.json();

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Group coaching enrollment submitted successfully',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Group Coaching API Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit group coaching enrollment' },
      { status: 500 }
    );
  }
}