const Order = require('../models/Order');
const nodemailer = require('nodemailer');

// Generate HTML email bill
const generateOrderEmail = (order) => {
  const itemRows = order.items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px;border-bottom:1px solid #e8f5e9;">${item.name}</td>
        <td style="padding:10px;border-bottom:1px solid #e8f5e9;text-align:center;">${item.quantity}</td>
        <td style="padding:10px;border-bottom:1px solid #e8f5e9;text-align:right;">₹${item.price}</td>
        <td style="padding:10px;border-bottom:1px solid #e8f5e9;text-align:right;">₹${(item.price * item.quantity).toFixed(2)}</td>
      </tr>`
    )
    .join('');

  return `
  <!DOCTYPE html>
  <html>
  <body style="margin:0;padding:0;background:#f1f8e9;font-family:'Segoe UI',sans-serif;">
    <div style="max-width:600px;margin:30px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <div style="background:linear-gradient(135deg,#2d6a4f,#52b788);padding:30px;text-align:center;">
        <h1 style="margin:0;color:#fff;font-size:28px;">🌿 Plantify</h1>
        <p style="margin:8px 0 0;color:#d8f3dc;font-size:14px;">New Order Received!</p>
      </div>

      <!-- Order Info -->
      <div style="padding:24px 30px;background:#f9fbe7;border-bottom:2px solid #e8f5e9;">
        <h2 style="margin:0 0 6px;color:#2d6a4f;font-size:18px;">Order #${order.orderId}</h2>
        <p style="margin:0;color:#666;font-size:13px;">Placed on: ${new Date(order.createdAt).toLocaleString('en-IN')}</p>
      </div>

      <!-- Customer Details -->
      <div style="padding:24px 30px;border-bottom:2px solid #e8f5e9;">
        <h3 style="margin:0 0 16px;color:#2d6a4f;font-size:16px;">👤 Customer Details</h3>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:4px 0;color:#555;width:120px;">Name:</td><td style="padding:4px 0;font-weight:600;">${order.customer.name}</td></tr>
          <tr><td style="padding:4px 0;color:#555;">Email:</td><td style="padding:4px 0;">${order.customer.email}</td></tr>
          <tr><td style="padding:4px 0;color:#555;">Phone:</td><td style="padding:4px 0;">${order.customer.phone}</td></tr>
          <tr><td style="padding:4px 0;color:#555;vertical-align:top;">Address:</td><td style="padding:4px 0;">${order.customer.address}</td></tr>
        </table>
      </div>

      <!-- Order Items -->
      <div style="padding:24px 30px;border-bottom:2px solid #e8f5e9;">
        <h3 style="margin:0 0 16px;color:#2d6a4f;font-size:16px;">🛍️ Ordered Items</h3>
        <table style="width:100%;border-collapse:collapse;">
          <thead>
            <tr style="background:#e8f5e9;">
              <th style="padding:10px;text-align:left;color:#2d6a4f;font-size:13px;">Product</th>
              <th style="padding:10px;text-align:center;color:#2d6a4f;font-size:13px;">Qty</th>
              <th style="padding:10px;text-align:right;color:#2d6a4f;font-size:13px;">Unit Price</th>
              <th style="padding:10px;text-align:right;color:#2d6a4f;font-size:13px;">Subtotal</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
        </table>
      </div>

      <!-- Total -->
      <div style="padding:20px 30px;background:#e8f5e9;text-align:right;">
        <p style="margin:0;font-size:13px;color:#555;">Payment Method: <strong>${order.paymentMethod}</strong></p>
        <p style="margin:8px 0 0;font-size:22px;font-weight:700;color:#2d6a4f;">Total: ₹${order.totalAmount.toFixed(2)}</p>
      </div>

      <!-- Footer -->
      <div style="padding:20px 30px;text-align:center;">
        <p style="margin:0;color:#aaa;font-size:12px;">This is an automated email from Plantify Store.</p>
      </div>
    </div>
  </body>
  </html>`;
};

const placeOrder = async (req, res) => {
  try {
    const { customer, items, totalAmount, paymentMethod } = req.body;

    // Basic validation
    if (!customer || !items || !totalAmount) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    if (!customer.name || !customer.email || !customer.phone || !customer.address) {
      return res.status(400).json({ success: false, message: 'All customer details are required' });
    }
    if (!items.length) {
      return res.status(400).json({ success: false, message: 'Order must have at least one item' });
    }

    // Save order
    const order = await Order.create({ customer, items, totalAmount, paymentMethod: paymentMethod || 'UPI' });

    // Send email (non-blocking)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = createTransporter();
        await transporter.sendMail({
          from: `"Plantify Store" <${process.env.EMAIL_USER}>`,
          to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
          subject: `🌿 New Order #${order.orderId} from ${customer.name}`,
          html: generateOrderEmail(order),
        });
        console.log(`📧 Order email sent for ${order.orderId}`);
      } catch (emailErr) {
        console.error('Email send failed (order still saved):', emailErr.message);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      data: { orderId: order.orderId, _id: order._id },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to place order', error: err.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch orders', error: err.message });
  }
};

module.exports = { placeOrder, getOrders };
