const express = require('express');
const sequelize = require('./db');
const bodyParser = require('body-parser'); 
const cors = require('cors');
require('dotenv').config();
const { seedProducts } = require('./controllers/productController');
const helmet = require('helmet');

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(helmet());

// Middleware csp security fixed
// HTTPS
app.use(cors());
// app.use(cors({
//   origin: [
//     'http://localhost:5173',
//     'https://desikadai.in'
//   ],
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
const paymentRoutes = require("./routes/paymentRoutes");
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: [
//         "'self'",
//         "https://checkout.razorpay.com"
//       ],
//       connectSrc: [
//         "'self'",
//         "https://desikadai-backend.onrender.com" // 🔁 change to your backend URL in production
//       ],
//      imgSrc: [
//   "'self'",
//   "data:",
//   "blob:",
//   "https://desikadai-backend.onrender.com"
// ],
//       styleSrc: ["'self'", "'unsafe-inline'"] // needed for React
//     }
//   })
// );
// clickjacking
// app.use(helmet.frameguard({ action: 'deny' }));
// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use("/api/payment", paymentRoutes);


// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Plant Shop API is running 🌿' });
});

// Connect to PostgreSQL
const PORT = process.env.PORT;

sequelize.authenticate()
  .then(() => {
    console.log('✅ MySQL connected');
    return sequelize.sync(); // Sync models
  })
  .then(async() => {
    await seedProducts();
    app.listen(PORT, () => {
      console.log(`🌿 Server running on port ${PORT}`);
      // console.log(`🌿 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  });