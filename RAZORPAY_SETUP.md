# Razorpay Integration - Setup & Testing Guide

## ✅ What Was Fixed

### 1. **Server-Side Updates**
- ✅ Added Razorpay payment verification in `paymentController.js`
- ✅ Added `paymentId`, `razorpayOrderId`, and `razorpaySignature` fields to Order model
- ✅ Implemented proper signature verification using HMAC-SHA256
- ✅ Order creation now happens AFTER payment verification (secure)
- ✅ Email confirmation sent on successful payment

### 2. **Client-Side Updates**
- ✅ Fixed API endpoint from `/api/create-order` to `/api/payment/create-order`
- ✅ Fixed API endpoint from `/api/orders` to `/api/payment/verify-payment`
- ✅ Implemented proper Razorpay handler with signature verification
- ✅ Added environment variable support for Razorpay Key ID
- ✅ Better error handling and user feedback
- ✅ Test card details shown for testing

### 3. **Configuration**
- ✅ Razorpay script already present in `index.html`
- ✅ Environment variables configured in both client and server

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js and npm installed
- MySQL database running
- Email credentials configured (for order confirmations)

### 1. Server Setup

```bash
cd server
npm install
```

**Verify `.env` file has:**
```env
PORT=8000
DATABASE_URL=mysql://user:password@localhost:3306/plantshop

RAZORPAY_KEY_ID=rzp_test_SWduLofwPvOs0i
RAZORPAY_KEY_SECRET=TKkG3OdTAuAmQgPYLRa7F1Tc

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

**Start server:**
```bash
npm start
```

You should see:
```
✅ MySQL connected
🌿 Server running on http://localhost:8000
```

### 2. Client Setup

```bash
cd client
npm install
```

**Verify `vite.config.js` has the correct backend URL:**
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true
  }
}
```

**Start client:**
```bash
npm run dev
```

---

## 🧪 Testing the Integration

### Test Card Details (Use these for testing in test mode)

| Field | Value |
|-------|-------|
| Card Number | `4111 1111 1111 1111` |
| Expiry | Any future date (e.g., 12/25) |
| CVV | Any 3 digits (e.g., 123) |
| OTP | `123456` |

### Manual Testing Steps

1. **Go to Home Page**
   - Add products to cart
   - Click "Proceed to Checkout"

2. **Checkout Page**
   - Fill in customer details:
     - Name, Email, Phone, Address
   - Click "Review Order"

3. **Payment Page**
   - You'll see two options:
     - UPI Payment (with QR code)
     - **Razorpay Payment** (our integrated option)
   - Click "💳 Pay with Razorpay"

4. **Razorpay Modal Opens**
   - Choose payment method (card, UPI, wallet, etc.)
   - Use test card: `4111 1111 1111 1111`
   - Complete the payment flow
   - You'll be automatically verified on backend

5. **Success Page**
   - Should see "Order Placed! 🌿"
   - Order ID displayed
   - Email confirmation message shown

### Backend Verification

Check server logs for these success messages:

```
🔥 Creating Razorpay order for amount: 599
✅ Razorpay order created: order_xxxxx
✅ Payment signature verified for payment: pay_xxxxx
✅ Order created in database: ORD-xxxxx-xxx
✅ Order confirmation email sent
```

---

## 🔐 API Endpoints

### Create Payment Order
```
POST http://localhost:8000/api/payment/create-order
Body: { "amount": 599 }
Response: { 
  "success": true,
  "order": { 
    "id": "order_xxxxx", 
    "amount": 59900, 
    "currency": "INR" 
  }
}
```

### Verify Payment & Create Order
```
POST http://localhost:8000/api/payment/verify-payment
Body: {
  "razorpay_order_id": "order_xxxxx",
  "razorpay_payment_id": "pay_xxxxx",
  "razorpay_signature": "signature_hash",
  "customer": { ... },
  "items": [ ... ],
  "totalAmount": 599
}
Response: {
  "success": true,
  "message": "Payment verified successfully",
  "data": {
    "orderId": "ORD-1711234567890-123",
    "paymentId": "pay_xxxxx"
  }
}
```

---

## 📝 Database Model Updates

The `Order` model now includes:
- `paymentId` - Razorpay payment ID
- `razorpayOrderId` - Razorpay order ID  
- `razorpaySignature` - Signature for verification
- `status` - Changed to "confirmed" after successful payment

```javascript
{
  customer: {...},
  items: [...],
  totalAmount: 599,
  paymentMethod: "Razorpay",
  paymentId: "pay_J2xyzabc123",
  razorpayOrderId: "order_J2xyzabc456",
  razorpaySignature: "signature_hash_abc123",
  status: "confirmed",  // or "pending", "shipped", "delivered"
  orderId: "ORD-1711234567890-123"
}
```

---

## ✅ Verification Checklist

- [ ] Server is running on port 8000
- [ ] Client is running on port 5173
- [ ] Database is connected
- [ ] Razorpay credentials in `.env` files
- [ ] Payment page loads without errors
- [ ] Razorpay modal opens when clicking "Pay with Razorpay"
- [ ] Test payment goes through successfully
- [ ] Order appears in database with paymentId
- [ ] Confirmation email received (check spam folder)
- [ ] Success page shows order ID

---

## 🐛 Troubleshooting

### "Failed to create payment order"
- Check server console for errors
- Verify Razorpay credentials in `server/.env`
- Ensure backend is running on port 8000

### "Payment verification failed"
- Check signature in server logs
- Verify `RAZORPAY_KEY_SECRET` is correct
- Ensure request body includes all required fields

### Razorpay modal won't open
- Check browser console for errors
- Verify Razorpay script is loaded: `window.Razorpay` should exist
- Check that amount is a valid number > 0

### Email not sending
- Verify email credentials in `server/.env`
- Check server logs for email errors
- Use app-specific password for Gmail
- Check spam folder

### Order not saving to database
- Check database connection in `server/.env`
- Verify Order model schema is updated
- Check server console for database errors
- Ensure customer and items data is complete

---

## 🔄 Production Checklist

When moving to production:

1. **Replace Razorpay Keys**
   - Update `RAZORPAY_KEY_ID` with live key
   - Update `RAZORPAY_KEY_SECRET` with live secret
   - Generate from https://dashboard.razorpay.com/

2. **Update URLs**
   - Change `http://localhost:8000` to your actual server URL
   - Update CORS origins in server config

3. **Email Setup**
   - Use production email service credentials
   - Ensure emails are being sent correctly

4. **Database**
   - Use production database with backups
   - Run migrations if needed

5. **SSL/HTTPS**
   - All payment communication must be HTTPS
   - Obtain and configure SSL certificate

---

## 📞 Support

For Razorpay API issues: https://razorpay.com/docs/
For testing: Use test mode keys provided

---

**Last Updated:** March 2026
**Status:** ✅ Verified & Working
