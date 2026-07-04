// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true, min: 0 },
//     category: { type: String, required: true },
//     brand: { type: String, default: "generic" },
//     stock: { type: Number, required: true, default: 0, min: 0 },
//     images: [{ type: String }],
//     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Product", productSchema);
// -----------------------------------------------
// const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, trim: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true, min: 0 },
//     category: { type: String, required: true },
//     gender: { type: String, enum: ["Men", "Women", "Kids", "Unisex"], required: true },
//     brand: { type: String, default: "generic" },
//     stock: { type: Number, required: true, default: 0, min: 0 },
//     images: [{ type: String }],
//     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Product", productSchema);
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: String,
}, { timestamps: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  gender: { type: String, enum: ["Men", "Women", "Kids", "Unisex"], required: true },
  brand: { type: String, default: "generic" },
  stock: { type: Number, required: true, default: 0, min: 0 },
  images: [{ type: String }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  reviews: [reviewSchema],
  avgRating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
