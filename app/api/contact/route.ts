import { NextRequest, NextResponse } from 'next/server';
import { checkAntiSpam } from '@/lib/anti-spam';
import nodemailer from 'nodemailer';
import { getZohoConfig } from '@/lib/zoho-mail';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, message, website, formLoadTime } = body;

    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
    const userAgent = req.headers.get('user-agent') || undefined;
    const combinedText = `${firstName || ''} ${lastName || ''} ${message || ''}`;
    
    // Run CleanTalk-grade SpamFirewall protection check
    const antiSpamCheck = checkAntiSpam(clientIp, email, userAgent, combinedText, website, formLoadTime);
    if (antiSpamCheck.isSpam) {
      return NextResponse.json(
        { success: false, error: `Message blocked by CleanTalk SpamFirewall: ${antiSpamCheck.reason}` },
        { status: 400 }
      );
    }

    if (!email || !firstName || !message) {
      return NextResponse.json(
        { success: false, error: 'First name, email address, and message are required.' },
        { status: 400 }
      );
    }

    // Send email via Zoho Mail SMTP
    const config = getZohoConfig();
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.pass,
      },
      tls: { rejectUnauthorized: false },
    });

    if (config.user && config.pass) {
      await transporter.sendMail({
        from: `"${config.fromName}" <${config.user}>`,
        to: config.adminEmail,
        replyTo: email,
        subject: `New Contact Inquiry from ${firstName} ${lastName || ''} (${email})`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; background: #000; color: #fff; border-radius: 8px;">
            <h2 style="color: #facc15; text-transform: uppercase;">New Customer Contact Message</h2>
            <p><strong>Name:</strong> ${firstName} ${lastName || ''}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>IP Address:</strong> ${clientIp}</p>
            <hr style="border-color: #333; margin: 20px 0;" />
            <p style="white-space: pre-wrap; color: #ccc;">${message}</p>
          </div>
        `,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been successfully verified and sent via Zoho Mail. Our support team will respond shortly.',
    });
  } catch (error: any) {
    console.error('Contact email error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send message.' },
      { status: 500 }
    );
  }
}
