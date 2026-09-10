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
      product,
      purity,
      quantity,
      packaging,
      destinationPort,
      application,
      message,
    } = body;

    // Validate required fields
    if (!fullName || !businessEmail || !country || !quantity) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
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

    // If SMTP credentials are not yet set in .env.local or contain placeholder
    const isUnconfigured = !host || !user || !pass || rawPass.includes('PASTE_YOUR') || pass === '';

    if (isUnconfigured) {
      console.warn(
        '[RFQ Service] SMTP not configured in .env.local. Received inquiry:',
        { fullName, companyName, businessEmail, product, purity, quantity, country }
      );

      return NextResponse.json({
        success: true,
        isSimulated: true,
        message:
          'Enquiry captured. Note: SMTP credentials not configured in .env.local, so physical email was not dispatched via mail server.',
      });
    }

    // Configure Nodemailer transporter (optimized for Google Workspace / Gmail or custom SMTP)
    const isGmail = host === 'smtp.gmail.com' || host === 'gmail';
    const transporter = nodemailer.createTransport(
      isGmail
        ? {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user,
              pass,
            },
          }
        : {
            host,
            port,
            secure: port === 465,
            auth: {
              user,
              pass,
            },
          }
    );

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; background-color: #F9F7F2; padding: 24px; border-radius: 12px; border: 1px solid #E5DDD1;">
        <div style="background-color: #0A6684; padding: 20px; border-radius: 8px; text-align: center; color: #FFFFFF;">
          <h1 style="margin: 0; font-size: 22px; letter-spacing: 1px; color: #FFFFFF;">SEABIRD EXIM</h1>
          <p style="margin: 4px 0 0; font-size: 13px; color: #D2AC67; font-weight: bold;">New Commercial RFQ Received</p>
        </div>

        <div style="background-color: #FFFFFF; padding: 24px; border-radius: 8px; margin-top: 16px; border: 1px solid #E5DDD1;">
          <h2 style="font-size: 16px; color: #0A6684; margin-top: 0; border-bottom: 2px solid #F9F7F2; padding-bottom: 8px;">Buyer & Contact Details</h2>
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #666; width: 140px;">Contact Name:</td><td style="font-weight: bold; color: #111E24;">${fullName}</td></tr>
            <tr><td style="padding: 6px 0; color: #666;">Company:</td><td style="font-weight: bold; color: #111E24;">${companyName || 'Not specified'}</td></tr>
            <tr><td style="padding: 6px 0; color: #666;">Business Email:</td><td><a href="mailto:${businessEmail}" style="color: #0A6684; font-weight: bold;">${businessEmail}</a></td></tr>
            <tr><td style="padding: 6px 0; color: #666;">Phone / WhatsApp:</td><td style="color: #111E24;">${phoneWhatsapp || 'Not provided'}</td></tr>
            <tr><td style="padding: 6px 0; color: #666;">Destination Country:</td><td style="font-weight: bold; color: #0A6684;">${country}</td></tr>
            <tr><td style="padding: 6px 0; color: #666;">Destination Port:</td><td>${destinationPort || 'TBD'}</td></tr>
          </table>

          <h2 style="font-size: 16px; color: #0A6684; margin-top: 20px; border-bottom: 2px solid #F9F7F2; padding-bottom: 8px;">Procurement Specifications</h2>
          <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
            <tr><td style="padding: 6px 0; color: #666; width: 140px;">Product:</td><td style="font-weight: bold; color: #0A6684;">${product}</td></tr>
            <tr><td style="padding: 6px 0; color: #666;">Purity Grade:</td><td style="font-weight: bold; color: #0A6684; background-color: #F0EAE1; padding: 2px 8px; border-radius: 4px; display: inline-block;">${purity}</td></tr>
            <tr><td style="padding: 6px 0; color: #666;">Target Quantity:</td><td style="font-weight: bold; color: #111E24;">${quantity}</td></tr>
            <tr><td style="padding: 6px 0; color: #666;">Packaging:</td><td>${packaging}</td></tr>
            <tr><td style="padding: 6px 0; color: #666;">Downstream Application:</td><td>${application}</td></tr>
          </table>

          ${
            message
              ? `
            <h2 style="font-size: 16px; color: #0A6684; margin-top: 20px; border-bottom: 2px solid #F9F7F2; padding-bottom: 8px;">Special Instructions / Technical Notes</h2>
            <div style="background-color: #F9F7F2; padding: 12px; border-radius: 6px; font-size: 13px; color: #111E24; line-height: 1.5;">
              ${message.replace(/\n/g, '<br/>')}
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

    // Send Mail to Seabird EXIM team
    await transporter.sendMail({
      from: `"Seabird EXIM Website" <${user}>`,
      to: toEmail,
      cc: ccEmails,
      replyTo: businessEmail,
      subject: `[New RFQ] ${product} (${purity}) - ${quantity} from ${companyName || fullName} (${country})`,
      html: emailHtml,
    });

    return NextResponse.json({
      success: true,
      message: 'RFQ email dispatched successfully to export desk.',
    });
  } catch (error) {
    console.error('[RFQ Error]:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || 'Failed to send inquiry' },
      { status: 500 }
    );
  }
}
