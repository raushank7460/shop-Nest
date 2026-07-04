
// const express = require("express");
// const router = express.Router();
// const {
//   getProducts, getProductById, createProduct, updateProduct, deleteProduct,
// } = require("../controllers/productController");
// const { protect, isAdmin } = require("../middleware/authMiddleware");
// const upload = require("../middleware/uploadMiddleware");

// // Public routes
// router.get("/", getProducts);
// router.get("/:id", getProductById);

// // Admin-only routes 
// router.post("/", protect, isAdmin, upload.array("images", 5), createProduct);
// router.put("/:id", protect, isAdmin, upload.array("images", 5), updateProduct);
// router.delete("/:id", protect, isAdmin, deleteProduct);

// module.exports = router;
const express = require("express");
const router = express.Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct, addReview } = require("../controllers/productController");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, isAdmin, upload.array("images", 5), createProduct);
router.put("/:id", protect, isAdmin, upload.array("images", 5), updateProduct);
router.delete("/:id", protect, isAdmin, deleteProduct);
router.post("/:id/reviews", protect, addReview);

module.exports = router;