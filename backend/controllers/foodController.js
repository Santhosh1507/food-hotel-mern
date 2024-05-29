const foodModel = require("../models/foodModel");
const fs = require("fs");

const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });
    try {
        await food.save();
        res.json({success: true, message: "Food added"});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error adding food"});
    }
};

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success: true, data: foods});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error retrieving food list"});
    }
};

const listFoodId = async (req, res) => {
    try {
        const food = await foodModel.findById(req.params.id);
        if (food) {
            res.json({success: true, data: food});
        } else {
            res.status(404).json({success: false, message: "Food not found"});
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error retrieving food"});
    }
};

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (food) {
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) console.error(err);
            });
            await foodModel.findByIdAndDelete(req.body.id);
            res.json({success: true, message: "Food removed"});
        } else {
            res.status(404).json({success: false, message: "Food not found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Error removing food"});
    }
};

const updateFood = async (req, res) => {
    try {
        const foodId = req.params.id;
        let updateData = req.body;
        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        if (req.file) {
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) console.error(err);
            });
            updateData.image = req.file.filename;
        }

        const updatedFood = await foodModel.findByIdAndUpdate(foodId, updateData, { new: true });
        res.json({ success: true, message: "Food updated", data: updatedFood });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error updating food" });
    }
};

module.exports = { addFood, listFood, removeFood, updateFood, listFoodId };
