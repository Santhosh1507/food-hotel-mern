const express = require("express");
const { addFood, listFood, removeFood, updateFood, listFoodId } = require("../controllers/foodController");
const multer = require("multer");

const foodRouter = express.Router();

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`);
    }
});

const upload = multer({storage:storage});

foodRouter.post("/add",upload.single("image"),addFood);
foodRouter.get("/list",listFood);
foodRouter.post("/remove",removeFood)
foodRouter.put("/update/:id", upload.single("image"), updateFood);
foodRouter.get("/list/:id", listFoodId);
module.exports = foodRouter;