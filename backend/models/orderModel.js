// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     items: [
//       {
//         product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
//         name: String,
//         price: Number,
//         quantity: { type: Number, default: 1 },
//       },
//     ],
//     totalAmount: { type: Number, required: true },
//     shippingAddress: {
//       fullName: String,
//       phone: String,
//       address: String,
//     },
//     paymentStatus: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
//     orderStatus: { type: String, enum: ["Placed", "Shipped", "Delivered", "Cancelled"], default: "Placed" },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Order", orderSchema);
// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//   {
//     user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//     items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, name: String, price: Number, quantity: { type: Number, default: 1 } }],
//     totalAmount: { type: Number, required: true },
//     shippingAddress: { fullName: String, phone: String, address: String },
//     paymentStatus: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
//     orderStatus: { type: String, enum: ["Placed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"], default: "Placed" },
//     estimatedDelivery: { type: Date },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Order", orderSchema);
const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, name: String, price: Number, quantity: { type: Number, default: 1 } }],
  totalAmount: { type: Number, required: true },
  shippingAddress: { fullName: String, phone: String, address: String },
  paymentStatus: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
  paymentId: String,
  orderStatus: { type: String, enum: ["Placed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"], default: "Placed" },
  estimatedDelivery: { type: Date },
}, { timestamps: true });
module.exports = mongoose.model("Order", orderSchema);