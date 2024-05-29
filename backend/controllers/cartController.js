const userModel = require("../models/userModel");


const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Retrieve user data
        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Access user's cart data
        let cartData = userData.cardData;

        // Check if the item already exists in the cart
        if (!cartData[itemId]) {
            // If not, add the item to the cart with quantity 1
            cartData[itemId] = 1;
        } else {
            // If yes, increment the quantity of the item in the cart
            cartData[itemId] += 1;
        }

        // Update the user's cart data in the database
        await userModel.findByIdAndUpdate(userId, { cardData: cartData });

        // Send success response
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Retrieve user data
        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Access user's cart data
        let cartData = userData.cardData;

        // Check if the item exists in the cart
        if (cartData[itemId] > 0) {
            // If yes, decrement the quantity of the item in the cart
            cartData[itemId] -= 1;

            // Update the user's cart data in the database
            await userModel.findByIdAndUpdate(userId, { cardData: cartData });

            // Send success response
            return res.json({ success: true, message: "Removed from cart" });
        } else {
            // If the item doesn't exist in the cart, send a message
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}



const allremoveFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Retrieve user data
        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Access user's cart data
        let cartData = userData.cardData;

        // Check if the item exists in the cart
        if (cartData[itemId] === undefined || cartData[itemId] === 0) {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        // Remove the item from the cart
        delete cartData[itemId];

        // Update the user's cart data in the database
        await userModel.findByIdAndUpdate(userId, { cardData: cartData });

        // Send success response
        res.json({ success: true, message: "Item removed from cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


// Controller method to remove all items from the user's card
const removeAllItemsFromCard = async (req, res) => {
    const userId = req.body.userId; // Assuming userId is sent in the request body

    try {
        // Update the user's cardData to an empty object
        await userModel.findByIdAndUpdate(userId, { cardData: {} });
        res.json({ success: true, message: 'All items removed from the card' });
    } catch (error) {
        console.error('Error removing items from card:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};



const getCart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Retrieve user data
        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Access user's cart data
        let cartData = userData.cardData;

        // Send cart data as response
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


module.exports = { addToCart, removeFromCart, getCart, allremoveFromCart,removeAllItemsFromCard };