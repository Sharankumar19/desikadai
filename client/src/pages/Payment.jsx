
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import { useCart } from '../context/CartContext';
import { useCheckout } from '../context/CheckoutContext';

const Payment = () => {
  const { checkoutData } = useCheckout();
  const { clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState('');

  // Initialize EmailJS on component mount
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
    console.log('✅ EmailJS initialized');
  }, []);

  if (!checkoutData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-5xl mb-4">⚠️</p>
        <h2 className="text-2xl font-bold text-stone-700 mb-3">No checkout data found</h2>
        <Link to="/checkout" className="btn-primary inline-block mt-4">Go to Checkout</Link>
      </div>
    );
  }

  // Send Invoice via EmailJS
  const sendInvoiceEmail = async (orderIdValue, paymentId) => {
    try {
      console.log('📧 Preparing to send invoice email...');
      console.log('Order ID:', orderIdValue);
      console.log('Payment ID:', paymentId);
      console.log('Customer Email:', checkoutData.customer.email);

      const itemsText = checkoutData.items
        .map((item) => `${item.name} x${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}`)
        .join('\n');

      const templateParams = {
        to_email: checkoutData.customer.email,
        customer_name: checkoutData.customer.name,
        customer_phone: checkoutData.customer.phone,
        customer_address: checkoutData.customer.address,
        order_id: orderIdValue,
        payment_id: paymentId,
        order_date: new Date().toLocaleString('en-IN'),
        items_list: itemsText,
        total_amount: checkoutData.totalAmount.toFixed(2),
        items_html: checkoutData.items
          .map(
            (item) => `
          <tr>
            <td style="padding:10px;border-bottom:1px solid #e8f5e9;">${item.name}</td>
            <td style="padding:10px;border-bottom:1px solid #e8f5e9;text-align:center;">${item.quantity}</td>
            <td style="padding:10px;border-bottom:1px solid #e8f5e9;text-align:right;">₹${item.price}</td>
            <td style="padding:10px;border-bottom:1px solid #e8f5e9;text-align:right;">₹${(item.price * item.quantity).toFixed(2)}</td>
          </tr>`
          )
          .join(''),
      };

      console.log('📤 Sending email with params:', templateParams);

      const response = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_s9u9chn',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_8totse4',
        templateParams
      );

      console.log('✅ Invoice email sent successfully!', response);
      return true;
    } catch (err) {
      console.error('❌ Email sending failed:', err);
      console.error('Error message:', err.message);
      return false;
    }
  };

  const handleRazorpayPayment = async () => {
    setLoading(true);
    setError('');

    try {
      console.log('🔥 Starting Razorpay payment flow...');

      // Step 1: Create order on backend
      const orderResponse = await axios.post(
        'http://localhost:8000/api/payment/create-order',
        { amount: checkoutData.totalAmount }
      );

      if (!orderResponse.data.success) {
        throw new Error('Failed to create payment order');
      }

      const razorpayOrder = orderResponse.data.order;
      console.log('✅ Razorpay order created:', razorpayOrder.id);

      // Step 2: Open Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_SWduLofwPvOs0i',
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Desikadai 🌿',
        description: 'Desikadai Order Payment',
        order_id: razorpayOrder.id,

        handler: async function (response) {
          console.log('✅ Payment successful!');
          console.log('Razorpay Payment ID:', response.razorpay_payment_id);

          try {
            // Step 3: Verify payment on backend and create order
            console.log('🔄 Verifying payment on server...');
            const verifyResponse = await axios.post(
              'http://localhost:8000/api/payment/verify-payment',
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                customer: checkoutData.customer,
                items: checkoutData.items.map((item) => ({
                  productId: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  image: item.image,
                })),
                totalAmount: checkoutData.totalAmount,
              }
            );

            if (verifyResponse.data.success) {
              console.log('✅ Payment verified successfully');
              const newOrderId = verifyResponse.data.data.orderId;
              console.log('Order ID from server:', newOrderId);
              setOrderId(newOrderId);

              // Step 4: Send invoice email AFTER payment verification
              console.log('📧 Sending invoice email...');
              const emailSent = await sendInvoiceEmail(newOrderId, response.razorpay_payment_id);
              
              if (emailSent) {
                console.log('📧 Email sent successfully');
              } else {
                console.warn('⚠️ Email sending failed, but order was successful');
              }

              setSuccess(true);
              clearCart();
            } else {
              throw new Error(verifyResponse.data.message || 'Payment verification failed');
            }
          } catch (verifyErr) {
            console.error('❌ Verification error:', verifyErr.message);
            setError(
              'Payment verified but order creation failed. Please contact support with Payment ID: ' +
                response.razorpay_payment_id
            );
          }
        },

        prefill: {
          name: checkoutData.customer.name,
          email: checkoutData.customer.email,
          contact: checkoutData.customer.phone,
        },

        theme: {
          color: '#16a34a',
        },

        modal: {
          ondismiss: function () {
            console.log('❌ User closed payment modal');
            setError('Payment cancelled. Please try again.');
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error('❌ Payment error:', err);
      setError(err.response?.data?.message || err.message || 'Payment initiation failed');
    } finally {
      setLoading(false);
    }
  };

  // ✅ SUCCESS PAGE
  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="p-10 border rounded-xl shadow bg-green-50">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-3xl font-bold mb-3 text-green-600">Order Placed! 🌿</h2>
          <p className="mb-2">Thank you, <strong>{checkoutData.customer.name}</strong></p>
          <p className="text-sm mb-4 text-gray-600">
            Order ID: <span className="font-semibold text-gray-800">{orderId}</span>
          </p>
          <p className="text-sm mb-6 text-gray-600">
            📧 Invoice has been sent to <strong>{checkoutData.customer.email}</strong>
          </p>
          <Link to="/" className="btn-primary inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Complete Payment</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* RIGHT - RAZORPAY */}
        <div className="p-6 border rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">🔐 Pay via Razorpay</h2>

          {/* ERROR */}
          {error && (
            <div className="p-3 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Amount Summary */}
          <div className="bg-gray-50 p-4 rounded mb-4">
            <p className="text-sm text-gray-600 mb-2">Payment Amount</p>
            <p className="text-2xl font-bold text-green-600">₹{checkoutData.totalAmount}</p>
          </div>

          {/* Info */}
          <p className="text-sm text-gray-600 mb-4">
            ✅ Secure payment powered by Razorpay
            <br />
            🔒 Your payment data is encrypted
            <br />
            📱 Supports Google Pay, PhonePe, Paytm
          </p>

          {/* BUTTON */}
          <button
            onClick={handleRazorpayPayment}
            disabled={loading}
            className={`w-full py-3 rounded font-semibold transition ${
              loading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {loading ? '⏳ Processing...' : '💳 Pay with Razorpay'}
          </button>

          <p className="text-xs text-gray-500 mt-4 text-center">
            ✅ Invoice will be sent to your email after payment
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;