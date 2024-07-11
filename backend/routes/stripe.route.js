const express = require("express");
const router = express.Router();
const stripe = require("stripe")(
  "sk_test_51Pauny2MJLkHoWTVqUdpFJsswIGLybp3hsjItsKvqmSyeJTq6vpvhmebvxqOKdWKGITgEQSMIGUefCbz3JwwYcm500ySO2eCqd"
);

router.post("/intents", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

module.exports = router;
