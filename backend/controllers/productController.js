// const Product = require("../models/productModel");

// const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 });
//     res.status(200).json({ count: products.length, products });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.status(200).json(product);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// const createProduct = async (req, res) => {
//   try {
//     const { name, description, price, category, brand, stock } = req.body;
//     if (!name || !description || !price || !category) {
//       return res.status(400).json({ message: "Please fill all required fields" });
//     }

//     const images = req.files ? req.files.map((f) => `/uploads/products/${f.filename}`) : [];

//     const product = await Product.create({
//       name, description, price, category, brand, stock, images,
//       createdBy: req.user._id,
//     });

//     res.status(201).json({ message: "Product created", product });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });

//     const updates = { ...req.body };
//     if (req.files && req.files.length > 0) {
//       updates.images = req.files.map((f) => `/uploads/products/${f.filename}`);
//     }

//     const updated = await Product.findByIdAndUpdate(req.params.id, updates, {
//       new: true,
//       runValidators: true,
//     });

//     res.status(200).json({ message: "Product updated", product: updated });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     await product.deleteOne();
//     res.status(200).json({ message: "Product deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
// const Product = require("../models/productModel");

// const getProducts = async (req, res) => {
//   try {
//     const products = await Product.find().sort({ createdAt: -1 });
//     res.status(200).json({ count: products.length, products });
//   } catch (err) { res.status(500).json({ message: err.message }); }
// };

// const getProductById = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     res.status(200).json(product);
//   } catch (err) { res.status(500).json({ message: err.message }); }
// };

// const createProduct = async (req, res) => {
//   try {
//     const { name, description, price, category, gender, brand, stock } = req.body;
//     if (!name || !description || !price || !category || !gender) {
//       return res.status(400).json({ message: "Please fill all required fields" });
//     }
//     const images = req.files ? req.files.map((f) => `/uploads/products/${f.filename}`) : [];
//     const product = await Product.create({ name, description, price, category, gender, brand, stock, images, createdBy: req.user._id });
//     res.status(201).json({ message: "Product created", product });
//   } catch (err) { res.status(500).json({ message: err.message }); }
// };

// const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     const updates = { ...req.body };
//     if (req.files && req.files.length > 0) updates.images = req.files.map((f) => `/uploads/products/${f.filename}`);
//     const updated = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
//     res.status(200).json({ message: "Product updated", product: updated });
//   } catch (err) { res.status(500).json({ message: err.message }); }
// };

// const deleteProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     await product.deleteOne();
//     res.status(200).json({ message: "Product deleted" });
//   } catch (err) { res.status(500).json({ message: err.message }); }
// };

// module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
//------------------------------------------------------
// const Product = require("../models/productModel");

// const getProducts = async (req, res) => {
//   try { const products = await Product.find().sort({ createdAt: -1 }); res.status(200).json({ count: products.length, products }); }
//   catch (err) { res.status(500).json({ message: err.message }); }
// };

// const getProductById = async (req, res) => {
//   try { const product = await Product.findById(req.params.id); if (!product) return res.status(404).json({ message: "Product not found" }); res.status(200).json(product); }
//   catch (err) { res.status(500).json({ message: err.message }); }
// };

// const createProduct = async (req, res) => {
//   try {
//     const { name, description, price, category, gender, brand, stock } = req.body;
//     if (!name || !description || !price || !category || !gender) return res.status(400).json({ message: "Please fill all required fields" });
//     const images = req.files ? req.files.map((f) => `/uploads/products/${f.filename}`) : [];
//     const product = await Product.create({ name, description, price, category, gender, brand, stock, images, createdBy: req.user._id });
//     res.status(201).json({ message: "Product created", product });
//   } catch (err) { res.status(500).json({ message: err.message }); }
// };

// const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     const updates = { ...req.body };
//     if (req.files && req.files.length > 0) updates.images = req.files.map((f) => `/uploads/products/${f.filename}`);
//     const updated = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
//     res.status(200).json({ message: "Product updated", product: updated });
//   } catch (err) { res.status(500).json({ message: err.message }); }
// };

// const deleteProduct = async (req, res) => {
//   try { const product = await Product.findById(req.params.id); if (!product) return res.status(404).json({ message: "Product not found" }); await product.deleteOne(); res.status(200).json({ message: "Product deleted" }); }
//   catch (err) { res.status(500).json({ message: err.message }); }
// };

// const addReview = async (req, res) => {
//   try {
//     const { rating, comment } = req.body;
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     const already = product.reviews.find((r) => r.user.toString() === req.user._id.toString());
//     if (already) return res.status(400).json({ message: "You already reviewed this product" });
//     product.reviews.push({ user: req.user._id, name: req.user.name, rating: Number(rating), comment });
//     product.numReviews = product.reviews.length;
//     product.avgRating = product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length;
//     await product.save();
//     res.status(201).json({ message: "Review added", product });
//   } catch (err) { res.status(500).json({ message: err.message }); }
// };

// module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct, addReview };
// const Product = require("../models/productModel");
// const { parse } = require("csv-parse/sync");

// const getProducts = async (req, res) => {
//   try { const products = await Product.find().sort({ createdAt: -1 }); res.status(200).json({ count: products.length, products }); }
//   catch (err) { res.status(500).json({ message: err.message }); }
// };
// const getProductById = async (req, res) => {
//   try { const product = await Product.findById(req.params.id); if (!product) return res.status(404).json({ message: "Product not found" }); res.status(200).json(product); }
//   catch (err) { res.status(500).json({ message: err.message }); }
// };
// const createProduct = async (req, res) => {
//   try {
//     const { name, description, price, category, gender, brand, stock } = req.body;
//     if (!name || !description || !price || !category || !gender) return res.status(400).json({ message: "Please fill all required fields" });
//     const images = req.files ? req.files.map((f) => `/uploads/products/${f.filename}`) : [];
//     const product = await Product.create({ name, description, price, category, gender, brand, stock, images, createdBy: req.user._id });
//     res.status(201).json({ message: "Product created", product });
//   } catch (err) { res.status(500).json({ message: err.message }); }
// };
// const updateProduct = async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     const updates = { ...req.body };
//     if (req.files && req.files.length > 0) updates.images = req.files.map((f) => `/uploads/products/${f.filename}`);
//     const updated = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
//     res.status(200).json({ message: "Product updated", product: updated });
//   } catch (err) { res.status(500).json({ message: err.message }); }
// };
// const deleteProduct = async (req, res) => {
//   try { const product = await Product.findById(req.params.id); if (!product) return res.status(404).json({ message: "Product not found" }); await product.deleteOne(); res.status(200).json({ message: "Product deleted" }); }
//   catch (err) { res.status(500).json({ message: err.message }); }
// };
// const addReview = async (req, res) => {
//   try {
//     const { rating, comment } = req.body;
//     const product = await Product.findById(req.params.id);
//     if (!product) return res.status(404).json({ message: "Product not found" });
//     const already = product.reviews.find((r) => r.user.toString() === req.user._id.toString());
//     if (already) return res.status(400).json({ message: "You already reviewed this product" });
//     product.reviews.push({ user: req.user._id, name: req.user.name, rating: Number(rating), comment });
//     product.numReviews = product.reviews.length;
//     product.avgRating = product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length;
//     await product.save();
//     res.status(201).json({ message: "Review added", product });
//   } catch (err) { res.status(500).json({ message: err.message }); }
// };

// // @desc  Bulk upload products via CSV (admin only)
// // CSV columns required: name,description,price,category,gender,brand,stock
// const bulkUploadProducts = async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: "CSV file is required" });
//     const records = parse(req.file.buffer.toString(), { columns: true, skip_empty_lines: true, trim: true });

//     const products = records.map((r) => ({
//       name: r.name, description: r.description, price: Number(r.price),
//       category: r.category, gender: r.gender, brand: r.brand || "generic",
//       stock: Number(r.stock) || 0, images: [], createdBy: req.user._id,
//     }));

//     const inserted = await Product.insertMany(products, { ordered: false });
//     res.status(201).json({ message: `${inserted.length} products uploaded successfully`, products: inserted });
//   } catch (err) { res.status(500).json({ message: err.message }); }
// };

// module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct, addReview, bulkUploadProducts };
const Product = require("../models/productModel");
const { parse } = require("csv-parse/sync");
const https = require("https");
const fs = require("fs");
const path = require("path");

const getProducts = async (req, res) => {
  try { const products = await Product.find().sort({ createdAt: -1 }); res.status(200).json({ count: products.length, products }); }
  catch (err) { res.status(500).json({ message: err.message }); }
};
const getProductById = async (req, res) => {
  try { const product = await Product.findById(req.params.id); if (!product) return res.status(404).json({ message: "Product not found" }); res.status(200).json(product); }
  catch (err) { res.status(500).json({ message: err.message }); }
};
const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, gender, brand, stock } = req.body;
    if (!name || !description || !price || !category || !gender) return res.status(400).json({ message: "Please fill all required fields" });
    const images = req.files ? req.files.map((f) => `/uploads/products/${f.filename}`) : [];
    const product = await Product.create({ name, description, price, category, gender, brand, stock, images, createdBy: req.user._id });
    res.status(201).json({ message: "Product created", product });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    const updates = { ...req.body };
    if (req.files && req.files.length > 0) updates.images = req.files.map((f) => `/uploads/products/${f.filename}`);
    const updated = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    res.status(200).json({ message: "Product updated", product: updated });
  } catch (err) { res.status(500).json({ message: err.message }); }
};
const deleteProduct = async (req, res) => {
  try { const product = await Product.findById(req.params.id); if (!product) return res.status(404).json({ message: "Product not found" }); await product.deleteOne(); res.status(200).json({ message: "Product deleted" }); }
  catch (err) { res.status(500).json({ message: err.message }); }
};
const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    const already = product.reviews.find((r) => r.user.toString() === req.user._id.toString());
    if (already) return res.status(400).json({ message: "You already reviewed this product" });
    product.reviews.push({ user: req.user._id, name: req.user.name, rating: Number(rating), comment });
    product.numReviews = product.reviews.length;
    product.avgRating = product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review added", product });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// downloads a single image URL and saves it into uploads/products, same folder normal uploads use
// const downloadImage = (url) =>
//   new Promise((resolve, reject) => {
//     const filename = `bulk_${Date.now()}_${Math.round(Math.random() * 1e6)}.png`;
//     const filepath = path.join(__dirname, "..", "uploads", "products", filename);
//     https.get(url, (res) => {
//       if (res.statusCode !== 200) return reject(new Error(`Failed to fetch image: ${res.statusCode}`));
//       const fileStream = fs.createWriteStream(filepath);
//       res.pipe(fileStream);
//       fileStream.on("finish", () => resolve(`/uploads/products/${filename}`));
//       fileStream.on("error", reject);
//     }).on("error", reject);
//   });
const downloadImage = (url) => {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;

    client
      .get(url, (res) => {
        // Redirect handle
        if (
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          return resolve(downloadImage(res.headers.location));
        }

        if (res.statusCode !== 200) {
          return reject(
            new Error(`Image download failed. Status: ${res.statusCode}`)
          );
        }

        // Content-Type check
        const contentType = res.headers["content-type"];

        if (!contentType || !contentType.startsWith("image/")) {
          return reject(
            new Error(`Invalid image. Content-Type: ${contentType}`)
          );
        }

        let ext = ".jpg";

        if (contentType.includes("png")) ext = ".png";
        else if (contentType.includes("jpeg")) ext = ".jpg";
        else if (contentType.includes("jpg")) ext = ".jpg";
        else if (contentType.includes("webp")) ext = ".webp";
        else if (contentType.includes("gif")) ext = ".gif";

        const filename = `bulk_${Date.now()}_${Math.round(
          Math.random() * 1000000
        )}${ext}`;

        const filepath = path.join(
          __dirname,
          "..",
          "uploads",
          "products",
          filename
        );

        const file = fs.createWriteStream(filepath);

        res.pipe(file);

        file.on("finish", () => {
          file.close(() => {
            resolve(`/uploads/products/${filename}`);
          });
        });

        file.on("error", (err) => {
          fs.unlink(filepath, () => {});
          reject(err);
        });
      })
      .on("error", reject);
  });
};

// @desc  Bulk upload products via CSV (admin only)
// CSV columns required: name,description,price,category,gender,brand,stock
// Optional column: imageUrl (a direct image link) — it will be downloaded and saved like a normal upload
const bulkUploadProducts = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "CSV file is required" });
    const records = parse(req.file.buffer.toString(), { columns: true, skip_empty_lines: true, trim: true });

    const products = [];
    for (const r of records) {
      let images = [];
      if (r.imageUrl) {
        try { images = [await downloadImage(r.imageUrl)]; }
        catch { images = []; } // skip image silently if a single URL fails, product still gets created
      }
      products.push({
        name: r.name, description: r.description, price: Number(r.price),
        category: r.category, gender: r.gender, brand: r.brand || "generic",
        stock: Number(r.stock) || 0, images, createdBy: req.user._id,
      });
    }

    const inserted = await Product.insertMany(products, { ordered: false });
    res.status(201).json({ message: `${inserted.length} products uploaded successfully`, products: inserted });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct, addReview, bulkUploadProducts };