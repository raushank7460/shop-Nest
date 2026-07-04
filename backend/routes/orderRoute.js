// const express = require("express");
// const router = express.Router();
// const { createOrder, getMyOrders } = require("../controllers/orderController");
// const { protect } = require("../middleware/authMiddleware");

// router.post("/", protect, createOrder);
// router.get("/my", protect, getMyOrders);

// module.exports = router;
const express = require("express");
const router = express.Router();
const { createOrder, getMyOrders, getAllOrders, updateOrderStatus } = require("../controllers/orderController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);
router.get("/", protect, isAdmin, getAllOrders);
router.put("/:id/status", protect, isAdmin, updateOrderStatus);

module.exports = router;