const razorpay = require("../config/razorpay");
const verifySignature = require("../utils/verifySignature");
const Order = require("../models/Order");
const nodemailer = require("nodemailer");

// Create transporter for emails
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

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
    .join("");

  return `
  <!DOCTYPE html>
  <html>
  <body style="margin:0;padding:0;background:#f1f8e9;font-family:'Segoe UI',sans-serif;">
    <div style="max-width:600px;margin:30px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
      
      <!-- Header -->
      <div style="background:linear-gradient(135deg,#2d6a4f,#52b788);padding:30px;text-align:center;">
        <h1 style="margin:0;color:#fff;font-size:28px;">🌿 Plantify</h1>
        <p style="margin:8px 0 0;color:#d8f3dc;font-size:14px;">Payment Confirmed!</p>
      </div>

      <!-- Order Info -->
      <div style="padding:24px 30px;background:#f9fbe7;border-bottom:2px solid #e8f5e9;">
        <h2 style="margin:0 0 6px;color:#2d6a4f;font-size:18px;">Order #${order.orderId}</h2>
        <p style="margin:0;color:#666;font-size:13px;">Payment ID: ${order.paymentId}</p>
        <p style="margin:8px 0 0;color:#666;font-size:13px;">Placed on: ${new Date(order.createdAt).toLocaleString("en-IN")}</p>
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

// ✅ CREATE RAZORPAY ORDER
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
    }

    console.log("🔥 Creating Razorpay order for amount:", amount);

    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    console.log("✅ Razorpay order created:", order.id);

    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      },
    });
  } catch (err) {
    console.error("❌ Razorpay Error:", err.message);
    res.status(500).json({ 
      success: false, 
      error: "Failed to create payment order: " + err.message 
    });
  }
};

// ✅ VERIFY PAYMENT AND CREATE ORDER
exports.verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customer,
      items,
      totalAmount,
    } = req.body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment details",
      });
    }

    if (!customer || !items || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: "Missing order details",
      });
    }

    // Verify signature
    const isValid = verifySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      console.error("❌ Payment signature verification failed");
      return res.status(400).json({
        success: false,
        message: "Payment verification failed. Invalid signature.",
      });
    }

    console.log("✅ Payment signature verified for payment:", razorpay_payment_id);

    // Create order in database
    const order = await Order.create({
      customer,
      items,
      totalAmount,
      paymentMethod: "Razorpay",
      paymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      razorpaySignature: razorpay_signature,
      status: "confirmed",
    });

    console.log("✅ Order created in database:", order.orderId);

    // Send email (non-blocking)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = createTransporter();
        await transporter.sendMail({
          from: `"Plantify 🌿" <${process.env.EMAIL_USER}>`,
          to: order.customer.email,
          subject: `Order Confirmation - ${order.orderId}`,
          html: generateOrderEmail(order),
        });
        console.log("✅ Order confirmation email sent");
      } catch (emailErr) {
        console.warn("⚠️ Email sending failed:", emailErr.message);
      }
    }

    res.json({
      success: true,
      message: "Payment verified successfully",
      data: {
        orderId: order.orderId,
        paymentId: razorpay_payment_id,
      },
    });
  } catch (err) {
    console.error("❌ Verification Error:", err);
    res.status(500).json({
      success: false,
      message: "Payment verification failed: " + err.message,
    });
  }
};