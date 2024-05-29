const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const foodRouter = require("./routes/foodRoute.js");
const userRouter = require("./routes/userRoute.js");
const cartRouter = require("./routes/cartRoute.js");
const orderRouter = require("./routes/orderRoute.js");


app.use(bodyParser.json());
app.use(cors());
dotenv.config(); 
connectDB();

app.get("/",(req,res)=>{
    res.send("hello world")
});

app.use("/api/food",foodRouter);
app.use("/images",express.static("uploads"));
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

const port = process.env.PORT || 8082;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));