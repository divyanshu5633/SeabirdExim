import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      companyName,
      businessEmail,
      phoneWhatsapp,
      country,
      product = 'Psyllium Husk',
      grade,
      quantity,
      message,
    } = body;

    // Validate strictly the required first-inquiry fields
    if (!fullName || !companyName || !businessEmail || !phoneWhatsapp || !country) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Please fill in all required fields: Full Name, Company, Business Email, Phone/WhatsApp, and Country.' 
        },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(businessEmail.trim())) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid business email address.' },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST?.trim();
    const port = Number(process.env.SMTP_PORT) || 465;
    const user = process.env.SMTP_USER?.trim();
    const rawPass = process.env.SMTP_PASS?.trim() || '';
    const pass = rawPass.replace(/['"\s]/g, '');
    const toEmail = process.env.RFQ_TO_EMAIL?.trim() || 'sales@seabirdexim.com';
    const ccEmails = process.env.RFQ_CC_EMAIL?.trim() || 'admin@seabirdexim.com, info@seabirdexim.com';

    // If SMTP credentials are not yet configured in .env.local
    const isUnconfigured = !host || !user || !pass || rawPass.includes('PASTE_YOUR') || pass === '';

    if (isUnconfigured) {
      console.warn(
        '[RFQ Service] SMTP not configured in .env.local. Captured first inquiry:',
        { fullName, companyName, businessEmail, phoneWhatsapp, country, product, grade, quantity }
      );

      return NextResponse.json({
        success: true,
        isSimulated: true,
        message:
          'Inquiry captured successfully. (Note: SMTP credentials not configured in .env.local, email was not physically sent via mail server).',
      });
    }

    // Configure Nodemailer transporter (Gmail / Google Workspace or standard SMTP)
    const isGmail = host === 'smtp.gmail.com' || host === 'gmail';
    const transporter = nodemailer.createTransport(
      isGmail
        ? {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: { user, pass },
          }
        : {
            host,
            port,
            secure: port === 465,
            auth: { user, pass },
          }
    );

    // Clean plain text representation
    const textContent = `
NEW WEBSITE INQUIRY

BUYER DETAILS
- Full Name: ${fullName.trim()}
- Company: ${companyName.trim()}
- Business Email: ${businessEmail.trim()}
- Phone / WhatsApp: ${phoneWhatsapp.trim()}
- Country: ${country.trim()}

PRODUCT REQUIREMENT
- Product: ${product}
- Grade: ${grade ? grade.trim() : 'Not specified / Need guidance'}
- Estimated Quantity: ${quantity ? quantity.trim() : 'Not specified'}
- Message / Requirement: ${message ? message.trim() : 'None'}

--
Sent via Seabird EXIM Website Procurement Desk (Surat, Gujarat, India)
    `.trim();

    // Clean HTML email representation
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; background-color: #F9F7F2; padding: 24px; border-radius: 12px; border: 1px solid #E5DDD1;">
        <div style="background-color: #0A6684; padding: 20px; border-radius: 8px; text-align: center; color: #FFFFFF;">
          <h1 style="margin: 0; font-size: 22px; letter-spacing: 1px; color: #FFFFFF;">SEABIRD EXIM</h1>
          <p style="margin: 4px 0 0; font-size: 13px; color: #D2AC67; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">New Website Inquiry</p>
        </div>

        <div style="background-color: #FFFFFF; padding: 24px; border-radius: 8px; margin-top: 16px; border: 1px solid #E5DDD1;">
          <h2 style="font-size: 15px; color: #0A6684; margin-top: 0; border-bottom: 2px solid #F9F7F2; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Buyer Details</h2>
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #666; width: 140px;">Full Name:</td><td style="font-weight: bold; color: #111E24;">${fullName.trim()}</td></tr>
            <tr><td style="padding: 6px 0; color: #666;">Company:</td><td style="font-weight: bold; color: #111E24;">${companyName.trim()}</td></tr>
            <tr><td style="padding: 6px 0; color: #666;">Business Email:</td><td><a href="mailto:${businessEmail.trim()}" style="color: #0A6684; font-weight: bold;">${businessEmail.trim()}</a></td></tr>
            <tr><td style="padding: 6px 0; color: #666;">Phone / WhatsApp:</td><td style="font-weight: bold; color: #111E24;">${phoneWhatsapp.trim()}</td></tr>
            <tr><td style="padding: 6px 0; color: #666;">Country:</td><td style="font-weight: bold; color: #0A6684;">${country.trim()}</td></tr>
          </table>

          <h2 style="font-size: 15px; color: #0A6684; margin-top: 22px; border-bottom: 2px solid #F9F7F2; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Product Requirement</h2>
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #666; width: 140px;">Product:</td><td style="font-weight: bold; color: #0A6684;">${product}</td></tr>
            <tr><td style="padding: 6px 0; color: #666;">Grade:</td><td style="font-weight: bold; color: #111E24; background-color: #F0EAE1; padding: 2px 8px; border-radius: 4px; display: inline-block;">${grade ? grade.trim() : 'Not specified / Need guidance'}</td></tr>
            <tr><td style="padding: 6px 0; color: #666;">Estimated Quantity:</td><td style="font-weight: bold; color: #111E24;">${quantity ? quantity.trim() : 'Not specified'}</td></tr>
          </table>

          ${
            message && message.trim()
              ? `
            <h2 style="font-size: 15px; color: #0A6684; margin-top: 22px; border-bottom: 2px solid #F9F7F2; padding-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Message / Requirement</h2>
            <div style="background-color: #F9F7F2; padding: 12px 14px; border-radius: 6px; font-size: 13px; color: #111E24; line-height: 1.6; border-left: 3px solid #0A6684;">
              ${message.trim().replace(/\n/g, '<br/>')}
            </div>
          `
              : ''
          }
        </div>

        <div style="text-align: center; margin-top: 16px; font-size: 12px; color: #888;">
          <p>Seabird EXIM &bull; Surat, Gujarat, India &bull; <a href="https://seabirdexim.com" style="color: #0A6684;">seabirdexim.com</a></p>
        </div>
      </div>
    `;

    // Subject line
    const gradeSubject = grade ? ` (${grade})` : '';
    const qtySubject = quantity ? ` - ${quantity}` : '';
    const subject = `[New Website Inquiry] ${product}${gradeSubject}${qtySubject} from ${companyName.trim()} (${country.trim()})`;

    // Send Mail to Seabird EXIM export desk
    await transporter.sendMail({
      from: `"Seabird EXIM Website" <${user}>`,
      to: toEmail,
      cc: ccEmails,
      replyTo: businessEmail.trim(),
      subject,
      text: textContent,
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      message: 'Your inquiry has been submitted successfully to our export desk.',
    });
  } catch (error) {
    console.error('[RFQ Error]:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || 'Failed to dispatch inquiry' },
      { status: 500 }
    );
  }
}
