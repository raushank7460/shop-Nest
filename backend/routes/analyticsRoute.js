const express = require("express");
const router = express.Router();
const { getStats } = require("../controllers/analyticsController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

router.get("/", protect, isAdmin, getStats);
module.exports = router;
