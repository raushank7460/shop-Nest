const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/orderModel");
const { deductStock } = require("./orderController");

const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });

const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    const order = await razorpay.orders.create({ amount: Math.round(amount * 100), currency: "INR", receipt: `receipt_${Date.now()}` });
    res.status(200).json({ order, key: process.env.RAZORPAY_KEY_ID });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, items, shippingAddress } = req.body;
    const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");
    if (expected !== razorpay_signature) return res.status(400).json({ message: "Payment verification failed" });

    await deductStock(items);

    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
    const order = await Order.create({ user: req.user._id, items, totalAmount, shippingAddress, paymentStatus: "Paid", paymentId: razorpay_payment_id, orderStatus: "Placed", estimatedDelivery });
    res.status(201).json({ message: "Payment verified, order placed", order });
  } catch (err) { res.status(400).json({ message: err.message }); }
};

module.exports = { createRazorpayOrder, verifyPayment };
