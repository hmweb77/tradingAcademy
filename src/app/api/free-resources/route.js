import { NextResponse } from 'next/server';

import { client } from '../../../../sanity/lib/client';
import { freeResourceByIdQuery } from '../../../../sanity/lib/queries';
import { checkRateLimit } from '@/lib/rateLimit';


// This API route handles Free Resource download requests
// It sends an email with the PDF attachment using Brevo API

export async function POST(request) {
  try {
    // Parse the incoming form data
    const body = await request.json();
    const { name, email, resourceId, resourceTitle } = body;

    // Validate required fields
    if (!name || !email || !resourceId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    // 🛡️ RATE LIMITING - Allow max 5 downloads per email per day
    const isAllowed = checkRateLimit(email, 5, 86400000);
    
    if (!isAllowed) {
      return NextResponse.json(
        { 
          error: 'Too many download requests. Please try again tomorrow.',
          rateLimitExceeded: true
        },
        { status: 429 }
      );
    }

    // Fetch the resource from Sanity to get the PDF URL
    const resource = await client.fetch(freeResourceByIdQuery, { id: resourceId });

    if (!resource || !resource.pdfUrl) {
      return NextResponse.json(
        { error: 'Resource not found or PDF not available' },
        { status: 404 }
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
          email: email,
          name: name
        }
      ],
      subject: `Your Free Resource: ${resourceTitle}`,
      htmlContent: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              background-color: #f8f9fb;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              padding: 20px; 
              background-color: #ffffff;
            }
            .header { 
              background: linear-gradient(135deg, #00b66f 0%, #00a05f 100%);
              color: white; 
              padding: 30px 20px; 
              text-align: center; 
              border-radius: 8px 8px 0 0;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
            }
            .content { 
              background-color: #ffffff; 
              padding: 30px; 
              border: 1px solid #e2e5e9;
              border-top: none;
              border-radius: 0 0 8px 8px;
            }
            .resource-box {
              background-color: #f7f9fa;
              border-left: 4px solid #00b66f;
              padding: 20px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .resource-title {
              font-size: 20px;
              font-weight: bold;
              color: #0f172a;
              margin-bottom: 10px;
            }
            .download-button {
              display: inline-block;
              background-color: #00b66f;
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 6px;
              font-weight: bold;
              margin: 20px 0;
            }
            .download-button:hover {
              background-color: #00a05f;
            }
            .benefits {
              background-color: #f8f9fb;
              padding: 20px;
              border-radius: 6px;
              margin: 20px 0;
            }
            .benefits ul {
              margin: 10px 0;
              padding-left: 20px;
            }
            .benefits li {
              margin: 8px 0;
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
            .social-links {
              margin: 20px 0;
            }
            .social-links a {
              color: #00b66f;
              text-decoration: none;
              margin: 0 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📚 Your Free Resource is Ready!</h1>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              
              <p>Thank you for your interest in Ten Percent Academy! We're excited to share this valuable resource with you.</p>
              
              <div class="resource-box">
                <div class="resource-title">📄 ${resourceTitle}</div>
                <p style="color: #6e7b8a; margin: 0;">Click the button below to download your free PDF resource.</p>
              </div>

              <center>
                <a href="${resource.pdfUrl}" class="download-button" target="_blank">
                  ⬇️ Download PDF Now
                </a>
              </center>

              <div class="benefits">
                <h3 style="color: #0f172a; margin-top: 0;">🎯 What's Next?</h3>
                <ul>
                  <li><strong>Apply what you learn:</strong> Start implementing the strategies from this resource immediately</li>
                  <li><strong>Join our community:</strong> Connect with fellow traders who are on the same journey</li>
                  <li><strong>Explore our programs:</strong> Ready to take your trading to the next level? Check out our live trading sessions and group coaching</li>
                  <li><strong>Book a discovery call:</strong> Get personalized guidance on your trading journey</li>
                </ul>
              </div>

              <p><strong>Pro Tip:</strong> Save this email so you can access your resource anytime!</p>

              <p style="color: #6e7b8a; font-size: 14px; margin-top: 30px;">
                Have questions? Simply reply to this email – we're here to help!
              </p>

              <div class="footer">
                <p><strong>Ten Percent Academy</strong></p>
                <p>Join the elite 10% of traders who consistently profit in the markets</p>
                <div class="social-links">
                  <a href="https://yourwebsite.com">Visit Website</a> |
                  <a href="mailto:info@tenpercentacademy.com">Contact Us</a>
                </div>
                <p style="font-size: 12px; color: #9ca3af; margin-top: 20px;">
                  You're receiving this email because you requested a free resource from Ten Percent Academy.
                </p>
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

    // Also send a notification to the admin
    const adminEmailData = {
      sender: {
        name: "Ten Percent Academy",
        email: "contact@hmwebs.com"
      },
      to: [
        {
          email: "tenpercentacademy10@gmail.com", // Replace with your admin email
          name: "Ten Percent Academy Team"
        }
      ],
      subject: `New Resource Download: ${resourceTitle}`,
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
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📥 New Resource Download</h1>
            </div>
            <div class="content">
              <p>Someone just downloaded a free resource from your website:</p>
              
              <div class="field">
                <div class="label">📄 Resource:</div>
                <div class="value">${resourceTitle}</div>
              </div>
              
              <div class="field">
                <div class="label">👤 Name:</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">📧 Email:</div>
                <div class="value"><a href="mailto:${email}">${email}</a></div>
              </div>
              
              <div class="field">
                <div class="label">🕐 Time:</div>
                <div class="value">${new Date().toLocaleString()}</div>
              </div>
              
              <div style="margin-top: 30px; padding: 15px; background-color: #e6f7f0; border-radius: 8px;">
                <p style="margin: 0; color: #0f172a;"><strong>💡 Next Steps:</strong></p>
                <p style="margin: 10px 0 0 0; color: #6e7b8a;">
                  Consider following up with this lead in 2-3 days to offer additional value or a discovery call.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

    // Send admin notification (don't wait for it)
    fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify(adminEmailData)
    }).catch(err => console.error('Admin notification error:', err));

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Resource sent successfully',
      messageId: result.messageId
    });

  } catch (error) {
    console.error('Free Resources API Error:', error);
    return NextResponse.json(
      { error: 'Failed to send resource. Please try again.' },
      { status: 500 }
    );
  }
}