const Cart = require("../models/cartModel");

const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });
    res.status(200).json(cart);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const addToCart = async (req, res) => {
  try {
    const { productId, name, price, image, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });
    const existing = cart.items.find((i) => i.product.toString() === productId);
    if (existing) existing.quantity += quantity || 1;
    else cart.items.push({ product: productId, name, price, image, quantity: quantity || 1 });
    await cart.save();
    res.status(200).json(cart);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    if (quantity <= 0) cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);
    else { const item = cart.items.find((i) => i.product.toString() === req.params.productId); if (item) item.quantity = quantity; }
    await cart.save();
    res.status(200).json(cart);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    cart.items = cart.items.filter((i) => i.product.toString() !== req.params.productId);
    await cart.save();
    res.status(200).json(cart);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const clearCart = async (req, res) => {
  try { await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] }); res.status(200).json({ message: "Cart cleared" }); }
  catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
