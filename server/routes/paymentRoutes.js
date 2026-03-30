const express = require("express");
const router = express.Router();
const {
  createOrder,
  verifyPayment,
} = require("../controllers/paymentController");

// 🔥 Debug logs
router.post("/create-order", (req, res, next) => {
  console.log("✅ /create-order route hit");
  next();
}, createOrder);

router.post("/verify-payment", verifyPayment);

module.exports = router;