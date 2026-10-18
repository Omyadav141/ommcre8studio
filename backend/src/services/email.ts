import { Inquiry } from "../db";

export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export class EmailService {
  private resendApiKey?: string;
  private founderEmail: string;

  constructor() {
    this.resendApiKey = process.env.RESEND_API_KEY;
    this.founderEmail = process.env.STUDIO_EMAIL || "omyadv@icloud.com";
  }

  public async sendEmail(options: EmailOptions): Promise<{ success: boolean; id?: string }> {
    // If Resend API key is configured, send live email
    if (this.resendApiKey) {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.resendApiKey}`,
          },
          body: JSON.stringify({
            from: process.env.FROM_EMAIL || "OMCRE8 Studio <notifications@omyadav.online>",
            to: options.to,
            subject: options.subject,
            html: options.html,
            text: options.text,
          }),
        });

        if (response.ok) {
          const data = (await response.json()) as { id: string };
          console.log(`[Email] Live email sent to ${options.to} via Resend. ID: ${data.id}`);
          return { success: true, id: data.id };
        } else {
          console.error(`[Email] Resend error:`, await response.text());
        }
      } catch (err) {
        console.error(`[Email] Dispatch failed:`, err);
      }
    }

    // Development / Fallback mode: log clean delivery preview
    console.log(`\n================= EMAIL AUTOMATION DISPATCH =================`);
    console.log(`To: ${options.to}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Body (Plain Text):\n${options.text}`);
    console.log(`=============================================================\n`);

    return { success: true, id: `mock-${Date.now()}` };
  }

  // 1. Client Confirmation Email
  public async sendClientInquiryConfirmation(inquiry: Inquiry) {
    const subject = `Enquiry Received: ${inquiry.title} [${inquiry.reference}]`;
    const text = `Hi ${inquiry.name},

Thank you for reaching out to OMCRE8 Studio. We have received your project details for "${inquiry.title}".

Your Studio Reference Code: ${inquiry.reference}
Selected Service: ${inquiry.service}
Budget: ${inquiry.budget || "To be discussed"}
Timeline: ${inquiry.timeline || "Standard"}

Our founder, Om Yadav, and our discipline leads are reviewing your brief. We will follow up via ${inquiry.contactPref || "Email"} within 24 hours.

If you would like to speak sooner, you can book a direct discovery call on Om's calendar:
https://calendly.com/omyadv

Best regards,
The OMCRE8 Studio Team
Delhi NCR & Worldwide
https://www.omyadav.online
`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #08090B; color: #ededed; margin: 0; padding: 24px; }
    .card { background: #111317; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 32px; max-width: 600px; margin: 0 auto; }
    .brand { font-size: 14px; font-weight: 700; letter-spacing: 0.2em; color: #20b2aa; }
    h1 { font-size: 24px; font-weight: 600; margin-top: 16px; color: #ffffff; }
    p { font-size: 14px; line-height: 1.6; color: #a1a1aa; }
    .ref-box { background: rgba(32,178,170,0.1); border: 1px solid rgba(32,178,170,0.3); padding: 12px 16px; border-radius: 8px; font-family: monospace; font-size: 14px; color: #20b2aa; margin: 20px 0; }
    .btn { display: inline-block; background: #20b2aa; color: #08090B; font-weight: 600; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-size: 13px; margin-top: 16px; }
    .footer { font-size: 11px; color: #71717a; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px; margin-top: 24px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="brand">OMCRE8 STUDIO</div>
    <h1>Your enquiry is received.</h1>
    <p>Hi ${inquiry.name},</p>
    <p>Thank you for trusting OMCRE8 Studio with your project. Founder <strong>Om Yadav</strong> and our team of ~20 engineers, designers, and cinematographers have received your brief.</p>
    
    <div class="ref-box">
      Reference ID: <strong>${inquiry.reference}</strong><br/>
      Project: ${inquiry.title}
    </div>

    <p>We review every brief directly and will follow up with our initial thoughts, recommended scope, and quotation within 24 business hours.</p>

    <a href="https://calendly.com/omyadv" class="btn">Book Discovery Call with Om &rarr;</a>

    <div class="footer">
      OMCRE8 Studio · Digital Engineering, Brand Design & Film Production<br/>
      <a href="https://www.omyadav.online" style="color: #20b2aa;">omyadav.online</a>
    </div>
  </div>
</body>
</html>
`;

    return this.sendEmail({
      to: inquiry.email,
      subject,
      text,
      html,
    });
  }

  // 2. Founder Alert Email
  public async sendFounderLeadAlert(inquiry: Inquiry) {
    const subject = `[NEW LEAD] ${inquiry.name} (${inquiry.company || "Independent"}) — ${inquiry.service}`;
    const text = `NEW PROJECT ENQUIRY RECEIVED

Reference: ${inquiry.reference}
Client: ${inquiry.name}
Email: ${inquiry.email}
Phone: ${inquiry.phone || "N/A"}
Company: ${inquiry.company || "N/A"}
Website: ${inquiry.website || "N/A"}
Service: ${inquiry.service}
Budget: ${inquiry.budget || "Unspecified"}
Timeline: ${inquiry.timeline || "Unspecified"}

Title:
${inquiry.title}

Brief:
${inquiry.description}

Preferred Contact: ${inquiry.contactPref || "Email"}

Review in Admin Portal: http://localhost:5174
`;

    const html = `
<div style="font-family: sans-serif; background: #08090B; color: #ededed; padding: 24px;">
  <div style="max-width: 600px; background: #13151b; padding: 24px; border-radius: 8px; border: 1px solid #333;">
    <h2 style="color: #20b2aa; margin-top: 0;">New Project Enquiry Alert</h2>
    <p><strong>Reference:</strong> ${inquiry.reference}</p>
    <p><strong>Client:</strong> ${inquiry.name} (${inquiry.email})</p>
    <p><strong>Company:</strong> ${inquiry.company || "N/A"} | <strong>Phone:</strong> ${inquiry.phone || "N/A"}</p>
    <p><strong>Service:</strong> ${inquiry.service} | <strong>Budget:</strong> ${inquiry.budget || "N/A"}</p>
    <hr style="border-color: #333; margin: 16px 0;" />
    <p><strong>Project:</strong> ${inquiry.title}</p>
    <div style="background: #000; padding: 12px; border-radius: 6px; font-size: 13px; line-height: 1.5;">${inquiry.description}</div>
  </div>
</div>
`;

    return this.sendEmail({
      to: this.founderEmail,
      subject,
      text,
      html,
    });
  }
}

export const emailService = new EmailService();
