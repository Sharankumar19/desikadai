import axios from "axios";

/**
 * Middleware to verify Google reCAPTCHA
 */
const verifyRecaptcha = async (req, res, next) => {
  try {
    const { captcha } = req.body;

    // 1. Check if token exists
    if (!captcha) {
      return res.status(400).json({
        success: false,
        message: "Captcha token missing",
      });
    }

    // 2. Verify with Google
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET,
          response: captcha,
        },
      }
    );

    const { success, score, action } = response.data;

    // 3. Handle response
    if (!success) {
      return res.status(400).json({
        success: false,
        message: "Captcha verification failed",
      });
    }

    // Optional (for reCAPTCHA v3)
    // if (score && score < 0.5) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Low captcha score (bot suspected)",
    //   });
    // }

    // ✅ Passed captcha
    next();

  } catch (error) {
    console.error("reCAPTCHA error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Captcha verification error",
    });
  }
};

export default verifyRecaptcha;