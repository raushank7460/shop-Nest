const Wishlist = require("../models/wishlistModel");

const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate("products");
    if (!wishlist) wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    res.status(200).json(wishlist);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    const exists = wishlist.products.some((p) => p.toString() === productId);
    wishlist.products = exists ? wishlist.products.filter((p) => p.toString() !== productId) : [...wishlist.products, productId];
    await wishlist.save();
    res.status(200).json({ message: exists ? "Removed from wishlist" : "Added to wishlist", wishlist });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getWishlist, toggleWishlist };
