import { NextResponse } from 'next/server';

// This API route handles Discovery Call form submissions
// It sends an email notification using Brevo API

export async function POST(request) {
  try {
    // Parse the incoming form data
    const body = await request.json();
    const { name, email, phone, experience, goals } = body;

    // Validate required fields
    if (!name || !email || !experience) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
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
          email: "contact@hmwebs.com", // Replace with your email
          name: "Ten Percent Academy Team"
        }
      ],
      subject: `New Discovery Call Request from ${name}`,
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
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e5e9; color: #6e7b8a; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎯 New Discovery Call Request</h1>
            </div>
            <div class="content">
              <p>You have received a new discovery call request from your website:</p>
              
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
                <div class="label">📊 Trading Experience:</div>
                <div class="value">${experience}</div>
              </div>
              
              ${goals ? `
              <div class="field">
                <div class="label">🎯 Trading Goals:</div>
                <div class="value">${goals}</div>
              </div>
              ` : ''}
              
              <div class="footer">
                <p>Please respond to this request within 24 hours.</p>
                <p><strong>Ten Percent Academy</strong></p>
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
        'api-key': process.env.BREVO_API_KEY, // Store your API key in .env.local
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
      message: 'Discovery call request submitted successfully',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Discovery Call API Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit discovery call request' },
      { status: 500 }
    );
  }
}