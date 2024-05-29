const express = require("express");
const authMiddleware = require("../middleware/auth");
const { placeOrder, UserOrders, listOrders, updateStatus  } = require("../controllers/orderController");

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/userorders", authMiddleware, UserOrders);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);

module.exports = orderRouter;