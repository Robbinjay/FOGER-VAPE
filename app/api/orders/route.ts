import { NextRequest, NextResponse } from 'next/server';
import { sendZohoOrderNotifications, OrderDetails } from '@/lib/zoho-mail';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, shippingAddress, items, pricing } = body;

    // Validate essential fields
    if (!customer?.email || !customer?.firstName || !customer?.lastName) {
      return NextResponse.json(
        { success: false, error: 'Customer name and email are required.' },
        { status: 400 }
      );
    }

    if (!shippingAddress?.address || !shippingAddress?.city || !shippingAddress?.state || !shippingAddress?.zip) {
      return NextResponse.json(
        { success: false, error: 'Complete shipping address is required.' },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Order must contain at least one product.' },
        { status: 400 }
      );
    }

    // Generate unique order number (e.g., FG-839201)
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `FG-${randomSuffix}`;
    const createdAt = new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const orderDetails: OrderDetails = {
      orderNumber,
      createdAt,
      customer: {
        firstName: customer.firstName.trim(),
        lastName: customer.lastName.trim(),
        email: customer.email.trim(),
        newsletter: Boolean(customer.newsletter),
      },
      shippingAddress: {
        address: shippingAddress.address.trim(),
        city: shippingAddress.city.trim(),
        state: shippingAddress.state.trim(),
        zip: shippingAddress.zip.trim(),
      },
      items: items.map((item: any) => ({
        id: String(item.id),
        name: String(item.name),
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
        flavor: item.flavor || undefined,
        category: item.category || undefined,
        puffs: item.puffs || undefined,
      })),
      pricing: {
        subtotal: Number(pricing?.subtotal) || 0,
        shipping: Number(pricing?.shipping) || 0,
        tax: Number(pricing?.tax) || 0,
        total: Number(pricing?.total) || 0,
      },
    };

    // Strictly send notifications via Zoho Mail to both client and store admin
    const emailDispatch = await sendZohoOrderNotifications(orderDetails);

    return NextResponse.json({
      success: true,
      orderNumber,
      createdAt,
      emailDispatch,
      message: 'Order processed successfully and notifications dispatched via Zoho Mail.',
    });
  } catch (error: any) {
    console.error('Order processing error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Internal server error processing order.',
      },
      { status: 500 }
    );
  }
}
