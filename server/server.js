const express = require('express');
const sequelize = require('./db');
const bodyParser = require('body-parser'); 
const cors = require('cors');
require('dotenv').config();
const { seedProducts } = require('./controllers/productController');

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
const paymentRoutes = require("./routes/paymentRoutes");

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