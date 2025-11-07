import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';


// This API route handles Combo Package (Complete Trading Package) enrollment requests
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

    // Validate environment variable
    if (!process.env.BREVO_API_KEY) {
      console.error('BREVO_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    // Prepare email content for Brevo
    const emailData = {
      sender: {
        name: "Ten Percent Academy",
        email: "contact@tenpercentacademy.com" // Replace with your verified sender email
      },
      to: [
        {
          email: "tenpercentacademy10@gmail.com", // Replace with your email
          name: "Ten Percent Academy Team"
        }
      ],
      subject: `🎁 New Combo Package Enrollment from ${name}`,
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { 
              background: linear-gradient(135deg, #f5b53f 0%, #e6a52e 100%); 
              color: white; 
              padding: 30px 20px; 
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .header h1 {
              margin: 0 0 10px 0;
              font-size: 28px;
            }
            .badge { 
              display: inline-block; 
              background-color: rgba(255, 255, 255, 0.2); 
              color: white; 
              padding: 8px 20px; 
              border-radius: 20px; 
              font-size: 14px; 
              font-weight: bold;
              margin-top: 10px;
            }
            .content { 
              background-color: #f7f9fa; 
              padding: 30px; 
              border: 1px solid #e2e5e9;
              border-top: none;
            }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #0f172a; margin-bottom: 5px; }
            .value { 
              margin-top: 5px; 
              padding: 12px; 
              background-color: white; 
              border-left: 4px solid #f5b53f;
              border-radius: 4px;
            }
            .info-box {
              background-color: #fff3cd;
              padding: 20px;
              border-radius: 8px;
              margin-top: 20px;
              border-left: 4px solid #f5b53f;
            }
            .info-box h3 {
              margin: 0 0 10px 0;
              color: #0f172a;
            }
            .info-box p {
              margin: 5px 0;
              color: #6e7b8a;
            }
            .success-box {
              background-color: #e6f7f0;
              padding: 20px;
              border-radius: 8px;
              margin-top: 20px;
              border-left: 4px solid #00b66f;
            }
            .success-box h3 {
              margin: 0 0 10px 0;
              color: #0f172a;
            }
            .success-box p {
              margin: 5px 0;
              color: #6e7b8a;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e2e5e9;
              color: #6e7b8a;
              font-size: 14px;
            }
            .highlight {
              color: #f5b53f;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎁 New Combo Package Enrollment!</h1>
              <div class="badge">PREMIUM PACKAGE - $397</div>
            </div>
            <div class="content">
              <p style="font-size: 16px; margin-bottom: 20px;">
                <strong>Great news!</strong> You have received a new enrollment request for the <span class="highlight">Complete Trading Package</span> (Combo Offer).
              </p>
              
              <div class="field">
                <div class="label">👤 Customer Name:</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">📧 Email Address:</div>
                <div class="value"><a href="mailto:${email}" style="color: #f5b53f; text-decoration: none;">${email}</a></div>
              </div>
              
              ${phone ? `
              <div class="field">
                <div class="label">📱 Phone Number:</div>
                <div class="value">${phone}</div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="label">🎯 Goal for Joining:</div>
                <div class="value">${goal}</div>
              </div>
              
              <div class="info-box">
                <h3>📦 Package Details</h3>
                <p><strong>Group Coaching Program:</strong> $297 value</p>
                <p>• 8-week intensive program</p>
                <p>• 2 weekly 2-hour group sessions</p>
                <p>• Maximum 12 participants</p>
                <p>• Weekly 2h follow-up meetings</p>
                <br>
                <p><strong>Premium Signals (2 months):</strong> $198 value</p>
                <p>• Daily trading signals</p>
                <p>• Entry/exit points</p>
                <p>• Risk management tips</p>
                <p>• 24/7 support</p>
                <br>
                <p style="font-size: 18px;"><strong>Total Regular Price:</strong> $495</p>
                <p style="font-size: 20px; color: #f5b53f;"><strong>Combo Price: $397</strong></p>
                <p style="color: #00b66f; font-weight: bold;">💰 Customer Saves: $98!</p>
              </div>
              
              <div class="success-box">
                <h3>✅ Next Steps - Action Required</h3>
                <p><strong>1. Respond within 24 hours</strong></p>
                <p style="margin-left: 20px;">• Send personalized welcome email</p>
                <p style="margin-left: 20px;">• Include payment instructions and options</p>
                <br>
                <p><strong>2. Upon payment confirmation:</strong></p>
                <p style="margin-left: 20px;">• Add to Group Coaching cohort</p>
                <p style="margin-left: 20px;">• Add to Premium Signals group (Telegram/WhatsApp)</p>
                <p style="margin-left: 20px;">• Send access credentials and welcome package</p>
                <br>
                <p><strong>3. Schedule onboarding:</strong></p>
                <p style="margin-left: 20px;">• Send program schedule</p>
                <p style="margin-left: 20px;">• Provide Discord/community access</p>
                <p style="margin-left: 20px;">• Share pre-course materials</p>
              </div>
              
              <div class="footer">
                <p><strong>⏰ Time Received:</strong> ${new Date().toLocaleString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
                <p style="margin-top: 15px;"><strong>Ten Percent Academy</strong></p>
                <p>Join the elite 10% of traders who consistently profit</p>
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
      message: 'Combo package enrollment submitted successfully',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Combo Package API Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit combo package enrollment' },
      { status: 500 }
    );
  }
}