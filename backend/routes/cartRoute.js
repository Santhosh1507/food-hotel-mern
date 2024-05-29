const express = require("express");
const { addToCart, removeFromCart, getCart, allremoveFromCart, removeAllItemsFromCard } = require("../controllers/cartController");
const authMiddleware = require("../middleware/auth.js")

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart)
cartRouter.post("/remove", authMiddleware, removeFromCart)
cartRouter.post("/get", authMiddleware, getCart)
cartRouter.post("/allremove", authMiddleware, allremoveFromCart)
cartRouter.post("/removeAllItems", authMiddleware, removeAllItemsFromCard)

module.exports = cartRouter;