// const Order = require("../models/orderModel");

// const createOrder = async (req, res) => {
//   try {
//     const { items, shippingAddress } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({ message: "No items in order" });
//     }
//     if (!shippingAddress?.fullName || !shippingAddress?.phone || !shippingAddress?.address) {
//       return res.status(400).json({ message: "Shipping address is required" });
//     }

//     const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

//     const order = await Order.create({
//       user: req.user._id,
//       items,
//       totalAmount,
//       shippingAddress,
//       paymentStatus: "Paid", 
//       orderStatus: "Placed",
//     });

//     res.status(201).json({ message: "Order placed successfully", order });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// const getMyOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
//     res.status(200).json({ count: orders.length, orders });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { createOrder, getMyOrders };
// const Order = require("../models/orderModel");

// const createOrder = async (req, res) => {
//   try {
//     const { items, shippingAddress } = req.body;
//     if (!items || items.length === 0) return res.status(400).json({ message: "No items in order" });
//     if (!shippingAddress?.fullName || !shippingAddress?.phone || !shippingAddress?.address)
//       return res.status(400).json({ message: "Shipping address is required" });

//     const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
//     const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);

//     const order = await Order.create({ user: req.user._id, items, totalAmount, shippingAddress, paymentStatus: "Paid", orderStatus: "Placed", estimatedDelivery });
//     res.status(201).json({ message: "Order placed successfully", order });
//   } catch (err) { res.status(500).json({ message: err.message }); }
// };

// const getMyOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
//     res.status(200).json({ count: orders.length, orders });
//   } catch (err) { res.status(500).json({ message: err.message }); }
// };

// // @desc Admin - all orders, with customer info
// const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 });
//     res.status(200).json({ count: orders.length, orders });
//   } catch (err) { res.status(500).json({ message: err.message }); }
// };

// // @desc Admin - update order status
// const updateOrderStatus = async (req, res) => {
//   try {
//     const { orderStatus } = req.body;
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: "Order not found" });
//     order.orderStatus = orderStatus;
//     await order.save();
//     res.status(200).json({ message: "Order status updated", order });
//   } catch (err) { res.status(500).json({ message: err.message }); }
// };

// module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus };
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const deductStock = async (items) => {
  for (const i of items) {
    const product = await Product.findById(i.product);
    if (!product || product.stock < i.quantity) throw new Error(`${i.name} is out of stock`);
  }
  for (const i of items) await Product.findByIdAndUpdate(i.product, { $inc: { stock: -i.quantity } });
};

const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ message: "No items in order" });
    if (!shippingAddress?.fullName || !shippingAddress?.phone || !shippingAddress?.address) return res.status(400).json({ message: "Shipping address is required" });

    await deductStock(items);

    const totalAmount = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
    const order = await Order.create({ user: req.user._id, items, totalAmount, shippingAddress, paymentStatus: "Pending", orderStatus: "Placed", estimatedDelivery });
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) { res.status(400).json({ message: err.message }); }
};

const getMyOrders = async (req, res) => {
  try { const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }); res.status(200).json({ count: orders.length, orders }); }
  catch (err) { res.status(500).json({ message: err.message }); }
};

const getAllOrders = async (req, res) => {
  try { const orders = await Order.find().populate("user", "name email").sort({ createdAt: -1 }); res.status(200).json({ count: orders.length, orders }); }
  catch (err) { res.status(500).json({ message: err.message }); }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    order.orderStatus = orderStatus;
    await order.save();
    res.status(200).json({ message: "Order status updated", order });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus, deductStock };