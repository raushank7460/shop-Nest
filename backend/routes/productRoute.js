// const express = require("express");
// const router = express.Router();
// const {
//   getProducts,
//   getProductById,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } = require("../controllers/productController");
// const { protect, isAdmin } = require("../middleware/authMiddleware");

// // Public routes - koi bhi user dekh sakta hai
// router.get("/", getProducts);
// router.get("/:id", getProductById);

// // Admin-only routes
// router.post("/", protect, isAdmin, createProduct);
// router.put("/:id", protect, isAdmin, updateProduct);
// router.delete("/:id", protect, isAdmin, deleteProduct);

// module.exports = router;
const express = require("express");
const router = express.Router();
const {
  getProducts, getProductById, createProduct, updateProduct, deleteProduct,
} = require("../controllers/productController");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Public routes
router.get("/", getProducts);
router.get("/:id", getProductById);

// Admin-only routes (protect+isAdmin pehle chalta hai, phir hi file upload allow hota hai)
router.post("/", protect, isAdmin, upload.array("images", 5), createProduct);
router.put("/:id", protect, isAdmin, upload.array("images", 5), updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);

module.exports = router;