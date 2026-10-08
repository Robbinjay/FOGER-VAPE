import nodemailer from 'nodemailer';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  flavor?: string;
  category?: string;
  puffs?: string;
}

export interface OrderDetails {
  orderNumber: string;
  createdAt: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    newsletter?: boolean;
  };
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  items: OrderItem[];
  pricing: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
}

export interface EmailDispatchResult {
  success: boolean;
  clientSent: boolean;
  adminSent: boolean;
  mode: 'live' | 'simulation';
  message: string;
  error?: string;
}

/**
 * Creates the Zoho Mail SMTP Transporter.
 * Zoho Mail SMTP Settings:
 * Host: smtppro.zoho.com (for Zoho Workplace/organization domains) or smtp.zoho.com (personal)
 * Port: 465 (SSL) or 587 (TLS)
 */
function getZohoTransporter() {
  const user = process.env.ZOHO_MAIL_USER;
  const pass = process.env.ZOHO_MAIL_PASSWORD;
  const host = process.env.ZOHO_MAIL_HOST || 'smtppro.zoho.com';
  const port = parseInt(process.env.ZOHO_MAIL_PORT || '465', 10);
  const secure = port === 465;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });
}

function generateClientEmailHtml(order: OrderDetails, storeName: string): string {
  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 12px 8px; border-bottom: 1px solid #e5e7eb;">
        <strong style="color: #111827; font-size: 14px;">${item.name}</strong>
        ${item.flavor ? `<br/><span style="color: #6b7280; font-size: 12px;">Flavor: ${item.flavor}</span>` : ''}
        ${item.puffs ? `<span style="color: #d97706; font-size: 12px; font-weight: 600;"> • ${item.puffs}</span>` : ''}
      </td>
      <td style="padding: 12px 8px; text-align: center; border-bottom: 1px solid #e5e7eb; color: #374151; font-size: 14px;">
        ${item.quantity}
      </td>
      <td style="padding: 12px 8px; text-align: right; border-bottom: 1px solid #e5e7eb; color: #111827; font-size: 14px; font-weight: 600;">
        $${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your Order Confirmation - ${order.orderNumber}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f3f4f6; margin: 0; padding: 24px; color: #1f2937;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
    <!-- Header -->
    <div style="background-color: #000000; padding: 32px 24px; text-align: center; border-bottom: 3px solid #facc15;">
      <h1 style="color: #ffffff; margin: 0; font-size: 26px; text-transform: uppercase; letter-spacing: 1px; font-weight: 900;">
        FOGER <span style="color: #facc15;">VAPES</span>
      </h1>
      <p style="color: #9ca3af; margin: 8px 0 0 0; font-size: 13px; text-transform: uppercase; letter-spacing: 2px;">
        Order Confirmation
      </p>
    </div>

    <!-- Body -->
    <div style="padding: 32px 24px;">
      <h2 style="font-size: 20px; font-weight: 800; color: #111827; margin: 0 0 12px 0;">
        Thank you for your order, ${order.customer.firstName}!
      </h2>
      <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
        We have received your order <strong>#${order.orderNumber}</strong> and it is now being processed. Below is a summary of your purchased items and delivery address.
      </p>

      <!-- Order Metadata Box -->
      <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
        <table style="width: 100%; font-size: 13px;">
          <tr>
            <td style="color: #6b7280; padding: 4px 0;">Order Number:</td>
            <td style="text-align: right; font-weight: 700; color: #111827; padding: 4px 0;">#${order.orderNumber}</td>
          </tr>
          <tr>
            <td style="color: #6b7280; padding: 4px 0;">Order Date:</td>
            <td style="text-align: right; font-weight: 600; color: #111827; padding: 4px 0;">${order.createdAt}</td>
          </tr>
          <tr>
            <td style="color: #6b7280; padding: 4px 0;">Delivery Status:</td>
            <td style="text-align: right; font-weight: 700; color: #059669; padding: 4px 0;">Processing • Fast Dispatch</td>
          </tr>
        </table>
      </div>

      <!-- Items Table -->
      <h3 style="font-size: 16px; font-weight: 700; color: #111827; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.5px;">
        Items Ordered
      </h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <thead>
          <tr style="background-color: #f9fafb; text-align: left;">
            <th style="padding: 10px 8px; font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 700; border-bottom: 1px solid #e5e7eb;">Product</th>
            <th style="padding: 10px 8px; font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 700; border-bottom: 1px solid #e5e7eb; text-align: center;">Qty</th>
            <th style="padding: 10px 8px; font-size: 12px; text-transform: uppercase; color: #6b7280; font-weight: 700; border-bottom: 1px solid #e5e7eb; text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <!-- Totals Breakdown -->
      <div style="background-color: #f9fafb; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
        <table style="width: 100%; font-size: 14px;">
          <tr>
            <td style="color: #6b7280; padding: 6px 0;">Subtotal:</td>
            <td style="text-align: right; font-weight: 600; color: #111827; padding: 6px 0;">$${order.pricing.subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td style="color: #6b7280; padding: 6px 0;">Shipping:</td>
            <td style="text-align: right; font-weight: 600; color: #111827; padding: 6px 0;">
              ${order.pricing.shipping === 0 ? '<span style="color: #059669; font-weight: 700;">FREE</span>' : `$${order.pricing.shipping.toFixed(2)}`}
            </td>
          </tr>
          <tr>
            <td style="color: #6b7280; padding: 6px 0;">Estimated Taxes:</td>
            <td style="text-align: right; font-weight: 600; color: #111827; padding: 6px 0;">$${order.pricing.tax.toFixed(2)}</td>
          </tr>
          <tr style="border-top: 2px solid #e5e7eb;">
            <td style="color: #111827; padding: 12px 0 0 0; font-size: 16px; font-weight: 800;">Total Paid:</td>
            <td style="text-align: right; font-size: 18px; font-weight: 900; color: #111827; padding: 12px 0 0 0;">
              $${order.pricing.total.toFixed(2)} USD
            </td>
          </tr>
        </table>
      </div>

      <!-- Shipping Destination -->
      <h3 style="font-size: 16px; font-weight: 700; color: #111827; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 0.5px;">
        Shipping Destination
      </h3>
      <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; font-size: 14px; color: #374151; line-height: 1.6; margin-bottom: 24px;">
        <strong>${order.customer.firstName} ${order.customer.lastName}</strong><br/>
        ${order.shippingAddress.address}<br/>
        ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}<br/>
        United States
      </div>

      <!-- Adult Signature Notice -->
      <div style="background-color: #fffbeb; border-left: 4px solid #facc15; padding: 12px 16px; margin-bottom: 24px; font-size: 12px; color: #92400e; border-radius: 0 8px 8px 0;">
        <strong>Age Verification Compliance:</strong> In accordance with federal regulations, an adult signature (21+) with valid ID is required upon carrier delivery.
      </div>

      <!-- Support Footer -->
      <p style="color: #6b7280; font-size: 13px; text-align: center; margin: 0;">
        Need assistance with your order? Reply directly to this email or reach us through our 
        <a href="https://foger-vapes.store/contact" style="color: #d97706; text-decoration: none; font-weight: 600;">Contact Support Page</a>.
      </p>
    </div>

    <!-- Footer -->
    <div style="background-color: #111827; padding: 20px 24px; text-align: center; color: #9ca3af; font-size: 11px;">
      <p style="margin: 0 0 4px 0;">&copy; ${new Date().getFullYear()} ${storeName}. Authorized Foger Vape Distributor & Reseller.</p>
      <p style="margin: 0;">Sent via Zoho Mail to ${order.customer.email}</p>
    </div>
  </div>
</body>
</html>
  `;
}

function generateAdminEmailHtml(order: OrderDetails, storeName: string): string {
  const itemsHtml = order.items
    .map(
      (item) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #374151; color: #ffffff;">
        <strong>${item.name}</strong>
        ${item.flavor ? `<div style="color: #9ca3af; font-size: 12px;">Flavor: ${item.flavor}</div>` : ''}
        ${item.category ? `<div style="color: #facc15; font-size: 11px; text-transform: uppercase;">${item.category}</div>` : ''}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #374151; color: #facc15; font-weight: 700; text-align: center; font-size: 15px;">
        x${item.quantity}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #374151; color: #ffffff; text-align: right; font-weight: 600;">
        $${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Order Alert - #${order.orderNumber}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #111827; margin: 0; padding: 24px; color: #e5e7eb;">
  <div style="max-width: 650px; margin: 0 auto; background: #1f2937; border-radius: 16px; overflow: hidden; border: 1px solid #374151;">
    <!-- Alert Banner -->
    <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 24px; text-align: center; color: #000000;">
      <span style="display: inline-block; background-color: #000000; color: #facc15; font-size: 11px; font-weight: 900; text-transform: uppercase; padding: 4px 12px; border-radius: 9999px; letter-spacing: 1.5px; margin-bottom: 8px;">
        ⚡ NEW ORDER RECEIVED
      </span>
      <h1 style="margin: 0; font-size: 26px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px;">
        Order #${order.orderNumber}
      </h1>
      <p style="margin: 6px 0 0 0; font-size: 16px; font-weight: 700;">
        Total: $${order.pricing.total.toFixed(2)} USD
      </p>
    </div>

    <!-- Content -->
    <div style="padding: 28px 24px;">
      <!-- Customer & Shipping Summary Grid -->
      <table style="width: 100%; margin-bottom: 24px; border-collapse: separate; border-spacing: 12px 0;">
        <tr>
          <td style="width: 50%; vertical-align: top; background-color: #111827; padding: 16px; border-radius: 12px; border: 1px solid #374151;">
            <div style="color: #9ca3af; font-size: 11px; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; margin-bottom: 8px;">
              Customer Info
            </div>
            <div style="color: #ffffff; font-weight: 700; font-size: 14px;">
              ${order.customer.firstName} ${order.customer.lastName}
            </div>
            <div style="color: #60a5fa; font-size: 13px; margin-top: 4px;">
              <a href="mailto:${order.customer.email}" style="color: #60a5fa; text-decoration: none;">${order.customer.email}</a>
            </div>
            <div style="color: #9ca3af; font-size: 11px; margin-top: 8px;">
              Marketing opted-in: ${order.customer.newsletter ? 'Yes' : 'No'}
            </div>
          </td>
          <td style="width: 50%; vertical-align: top; background-color: #111827; padding: 16px; border-radius: 12px; border: 1px solid #374151;">
            <div style="color: #9ca3af; font-size: 11px; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; margin-bottom: 8px;">
              Shipping Address
            </div>
            <div style="color: #e5e7eb; font-size: 13px; line-height: 1.5;">
              ${order.shippingAddress.address}<br/>
              ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}<br/>
              <strong>United States</strong>
            </div>
          </td>
        </tr>
      </table>

      <!-- Order Items Table -->
      <div style="color: #facc15; font-size: 12px; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; margin-bottom: 8px;">
        Items for Fulfillment (${order.items.reduce((acc, i) => acc + i.quantity, 0)} Total Units)
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background-color: #111827; border-radius: 12px; overflow: hidden; border: 1px solid #374151;">
        <thead>
          <tr style="background-color: #0b0f19; text-align: left;">
            <th style="padding: 10px; color: #9ca3af; font-size: 11px; text-transform: uppercase; border-bottom: 1px solid #374151;">Item</th>
            <th style="padding: 10px; color: #9ca3af; font-size: 11px; text-transform: uppercase; border-bottom: 1px solid #374151; text-align: center;">Qty</th>
            <th style="padding: 10px; color: #9ca3af; font-size: 11px; text-transform: uppercase; border-bottom: 1px solid #374151; text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <!-- Financial Totals -->
      <div style="background-color: #111827; padding: 16px; border-radius: 12px; border: 1px solid #374151; margin-bottom: 24px;">
        <table style="width: 100%; font-size: 13px; color: #9ca3af;">
          <tr>
            <td style="padding: 4px 0;">Subtotal:</td>
            <td style="text-align: right; color: #ffffff; font-weight: 600;">$${order.pricing.subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0;">Shipping Fee:</td>
            <td style="text-align: right; color: #ffffff; font-weight: 600;">$${order.pricing.shipping.toFixed(2)}</td>
          </tr>
          <tr>
            <td style="padding: 4px 0;">Taxes (8%):</td>
            <td style="text-align: right; color: #ffffff; font-weight: 600;">$${order.pricing.tax.toFixed(2)}</td>
          </tr>
          <tr style="border-top: 1px solid #374151;">
            <td style="padding: 10px 0 0 0; color: #ffffff; font-size: 15px; font-weight: 800;">Total Revenue:</td>
            <td style="text-align: right; color: #facc15; font-size: 17px; font-weight: 900; padding: 10px 0 0 0;">
              $${order.pricing.total.toFixed(2)} USD
            </td>
          </tr>
        </table>
      </div>

      <!-- Action Note -->
      <div style="background-color: #0b0f19; border: 1px dashed #4b5563; padding: 14px; border-radius: 12px; text-align: center; font-size: 12px; color: #9ca3af;">
        🔒 This notification was automatically dispatched via <strong>Zoho Mail</strong> to notify store administrators of pending inventory fulfillment.
      </div>
    </div>

    <!-- Admin Footer -->
    <div style="background-color: #0b0f19; padding: 16px 24px; text-align: center; color: #6b7280; font-size: 11px; border-top: 1px solid #374151;">
      ${storeName} Management Console • Received at ${order.createdAt}
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Dispatches order notifications strictly via Zoho Mail SMTP.
 * Sends:
 * 1. Client Order Confirmation -> order.customer.email
 * 2. Admin Order Notification -> ZOHO_ADMIN_EMAIL or ZOHO_MAIL_USER
 */
export async function sendZohoOrderNotifications(
  order: OrderDetails
): Promise<EmailDispatchResult> {
  const user = process.env.ZOHO_MAIL_USER;
  const pass = process.env.ZOHO_MAIL_PASSWORD;
  const adminEmail = process.env.ZOHO_ADMIN_EMAIL || user;
  const fromName = process.env.ZOHO_MAIL_FROM_NAME || 'Foger Vapes Store';

  // If Zoho Mail credentials are not set in environment secrets, return simulation info
  if (!user || !pass) {
    console.warn(
      '[ZohoMail Warning] ZOHO_MAIL_USER or ZOHO_MAIL_PASSWORD environment variables are not set. Running in simulation mode.'
    );
    return {
      success: true,
      clientSent: false,
      adminSent: false,
      mode: 'simulation',
      message:
        'Zoho Mail credentials not configured in environment variables. Simulated email dispatch.',
    };
  }

  const transporter = getZohoTransporter();
  if (!transporter) {
    return {
      success: false,
      clientSent: false,
      adminSent: false,
      mode: 'simulation',
      message: 'Failed to initialize Zoho Mail SMTP transporter.',
    };
  }

  const fromHeader = `"${fromName}" <${user}>`;

  // 1. Send to Client
  let clientSent = false;
  let adminSent = false;
  let lastError = '';

  try {
    const clientMailOptions = {
      from: fromHeader,
      to: order.customer.email,
      replyTo: user,
      subject: `Order Confirmation #${order.orderNumber} - Foger Vapes`,
      html: generateClientEmailHtml(order, fromName),
      text: `Thank you for your order #${order.orderNumber}, ${order.customer.firstName}!\n\nTotal: $${order.pricing.total.toFixed(2)}\nShipping to: ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zip}\n\nWe will notify you once your package ships.`,
    };

    await transporter.sendMail(clientMailOptions);
    clientSent = true;
    console.log(`[ZohoMail Success] Client confirmation sent to ${order.customer.email}`);
  } catch (err: any) {
    console.error('[ZohoMail Error] Failed to send client confirmation:', err);
    lastError = err?.message || 'Error sending client confirmation';
  }

  // 2. Send to Admin
  if (adminEmail) {
    try {
      const adminMailOptions = {
        from: fromHeader,
        to: adminEmail,
        replyTo: order.customer.email,
        subject: `⚡ [NEW ORDER] #${order.orderNumber} ($${order.pricing.total.toFixed(2)}) - ${order.customer.firstName} ${order.customer.lastName}`,
        html: generateAdminEmailHtml(order, fromName),
        text: `New order received #${order.orderNumber} for $${order.pricing.total.toFixed(2)} from ${order.customer.firstName} ${order.customer.lastName} (${order.customer.email}).`,
      };

      await transporter.sendMail(adminMailOptions);
      adminSent = true;
      console.log(`[ZohoMail Success] Admin order alert sent to ${adminEmail}`);
    } catch (err: any) {
      console.error('[ZohoMail Error] Failed to send admin order alert:', err);
      if (!lastError) {
        lastError = err?.message || 'Error sending admin alert';
      }
    }
  }

  const overallSuccess = clientSent || adminSent;

  return {
    success: overallSuccess,
    clientSent,
    adminSent,
    mode: 'live',
    message: overallSuccess
      ? 'Order notifications successfully dispatched via Zoho Mail to client and admin.'
      : 'Failed to send notifications through Zoho Mail.',
    error: lastError || undefined,
  };
}
