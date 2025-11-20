import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rateLimit';
// This API route handles Premium Signals Group enrollment requests
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
      subject: `🔔 New Premium Signals Request from ${name}`,
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
            .stats {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
              margin-top: 15px;
            }
            .stat-item {
              background-color: white;
              padding: 15px;
              border-radius: 6px;
              text-align: center;
              border: 1px solid #e2e5e9;
            }
            .stat-value {
              font-size: 24px;
              font-weight: bold;
              color: #f5b53f;
              margin-bottom: 5px;
            }
            .stat-label {
              font-size: 12px;
              color: #6e7b8a;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔔 New Signals Group Request!</h1>
              <div class="badge">PREMIUM SIGNALS - $99/MONTH</div>
            </div>
            <div class="content">
              <p style="font-size: 16px; margin-bottom: 20px;">
                <strong>Excellent!</strong> You have received a new request to join the <span class="highlight">Premium Trading Signals Group</span>.
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
                <h3>📊 Premium Signals Package Details</h3>
                <p><strong>Monthly Subscription:</strong> $99/month</p>
                <br>
                <p><strong>What's Included:</strong></p>
                <p>✅ Daily trading signals delivered in real-time</p>
                <p>✅ Entry and exit points for every trade</p>
                <p>✅ Stop-loss and take-profit levels</p>
                <p>✅ Risk management tips and position sizing</p>
                <p>✅ Market analysis and trade rationale</p>
                <p>✅ 24/7 support in private group</p>
                <p>✅ Educational content and strategy explanations</p>
                <br>
                <p><strong>Delivery Method:</strong> Private Telegram/WhatsApp Group</p>
                <p><strong>Signals Frequency:</strong> Multiple times daily during market hours</p>
                
                <div class="stats">
                  <div class="stat-item">
                    <div class="stat-value">85%+</div>
                    <div class="stat-label">Win Rate</div>
                  </div>
                  <div class="stat-item">
                    <div class="stat-value">3-5</div>
                    <div class="stat-label">Daily Signals</div>
                  </div>
                </div>
              </div>
              
              <div class="success-box">
                <h3>✅ Next Steps - Action Required</h3>
                <p><strong>1. Review and respond within 24 hours</strong></p>
                <p style="margin-left: 20px;">• Send personalized welcome email</p>
                <p style="margin-left: 20px;">• Explain subscription process and payment methods</p>
                <p style="margin-left: 20px;">• Include payment link or instructions</p>
                <br>
                <p><strong>2. Upon payment confirmation:</strong></p>
                <p style="margin-left: 20px;">• Add customer to private Telegram/WhatsApp signals group</p>
                <p style="margin-left: 20px;">• Send welcome message with group rules</p>
                <p style="margin-left: 20px;">• Provide signal interpretation guide</p>
                <p style="margin-left: 20px;">• Share risk management guidelines</p>
                <br>
                <p><strong>3. Onboarding:</strong></p>
                <p style="margin-left: 20px;">• Explain signal format and timing</p>
                <p style="margin-left: 20px;">• Set expectations for response times</p>
                <p style="margin-left: 20px;">• Introduce support channels</p>
                <p style="margin-left: 20px;">• Schedule subscription renewal reminder</p>
                <br>
                <p><strong>4. Follow-up:</strong></p>
                <p style="margin-left: 20px;">• Check in after first week</p>
                <p style="margin-left: 20px;">• Gather feedback</p>
                <p style="margin-left: 20px;">• Ensure customer is utilizing signals effectively</p>
              </div>
              
              <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #2196f3;">
  
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
                <p>Premium Trading Signals - Join the elite 10%</p>
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
      message: 'Signals group request submitted successfully',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Signals Group API Error:', error);
    return NextResponse.json(
      { error: 'Failed to submit signals group request' },
      { status: 500 }
    );
  }
}