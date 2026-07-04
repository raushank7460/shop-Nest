const Order = require("../models/orderModel");
const Product = require("../models/productModel");

const getStats = async (req, res) => {
  try {
    const orders = await Order.find();
    const totalOrders = orders.length;
    const totalSales = orders.filter((o) => o.paymentStatus === "Paid").reduce((s, o) => s + o.totalAmount, 0);
    const totalProducts = await Product.countDocuments();
    const lowStockProducts = await Product.find({ stock: { $lte: 5 } }).select("name stock");

    const statusCounts = {};
    orders.forEach((o) => { statusCounts[o.orderStatus] = (statusCounts[o.orderStatus] || 0) + 1; });
    const ordersByStatus = Object.entries(statusCounts).map(([status, count]) => ({ status, count }));

    const days = [...Array(7)].map((_, i) => { const d = new Date(); d.setDate(d.getDate() - (6 - i)); return d.toISOString().slice(0, 10); });
    const salesByDay = days.map((day) => ({
      day: day.slice(5),
      total: orders.filter((o) => o.createdAt.toISOString().slice(0, 10) === day && o.paymentStatus === "Paid").reduce((s, o) => s + o.totalAmount, 0),
    }));

    res.status(200).json({ totalOrders, totalSales, totalProducts, lowStockProducts, ordersByStatus, salesByDay });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getStats };