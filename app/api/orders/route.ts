import { NextRequest, NextResponse } from 'next/server';
import { sendZohoOrderNotifications, OrderDetails } from '@/lib/zoho-mail';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, shippingAddress, items, pricing, shippingMethod, paymentMethod } = body;

    // Validate minimum order constraint ($100.00)
    const subtotal = Number(pricing?.subtotal) || 0;
    if (subtotal < 100) {
      return NextResponse.json(
        {
          success: false,
          error: `Minimum order amount is $100.00. Current cart subtotal is $${subtotal.toFixed(2)}. Please add more items.`,
        },
        { status: 400 }
      );
    }

    // Validate essential customer fields
    if (!customer?.email || !customer?.firstName || !customer?.lastName) {
      return NextResponse.json(
        { success: false, error: 'Customer full name and email address are required.' },
        { status: 400 }
      );
    }

    if (!customer?.phone) {
      return NextResponse.json(
        { success: false, error: 'Customer contact phone number is required for shipping.' },
        { status: 400 }
      );
    }

    // Validate shipping address
    if (!shippingAddress?.address || !shippingAddress?.city || !shippingAddress?.state || !shippingAddress?.zip) {
      return NextResponse.json(
        { success: false, error: 'Complete delivery address is required.' },
        { status: 400 }
      );
    }

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Your order must contain at least one product.' },
        { status: 400 }
      );
    }

    // Validate payment method (APPLE_PAY, CRYPTO, CHIME)
    const validPaymentTypes = ['APPLE_PAY', 'CRYPTO', 'CHIME'];
    if (!paymentMethod?.type || !validPaymentTypes.includes(paymentMethod.type)) {
      return NextResponse.json(
        { success: false, error: 'Please select a valid payment option (Apple Pay, Crypto, or Chime).' },
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
        phone: customer.phone.trim(),
        newsletter: Boolean(customer.newsletter),
      },
      shippingAddress: {
        address: shippingAddress.address.trim(),
        city: shippingAddress.city.trim(),
        state: shippingAddress.state.trim(),
        zip: shippingAddress.zip.trim(),
        country: shippingAddress.country?.trim() || 'United States',
        orderNotes: shippingAddress.orderNotes?.trim() || undefined,
      },
      shippingMethod: {
        id: shippingMethod?.id || 'normal',
        name: shippingMethod?.name || (shippingMethod?.id === 'express' ? 'Express Shipping' : shippingMethod?.id === 'same-day' ? 'Ultra Fast Same Day Shipping' : 'Standard Shipping (Normal)'),
        price: (shippingMethod?.id === 'normal' && subtotal >= 200.0) 
          ? 0 
          : (Number(shippingMethod?.price) || (shippingMethod?.id === 'express' ? 30.0 : shippingMethod?.id === 'same-day' ? 70.0 : shippingMethod?.id === 'international' ? 40.0 : 9.99)),
      },
      paymentMethod: {
        type: paymentMethod.type,
        label: paymentMethod.label || paymentMethod.type,
        reference: paymentMethod.reference?.trim() || undefined,
        details: paymentMethod.details?.trim() || undefined,
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
        subtotal,
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
      orderDetails,
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
