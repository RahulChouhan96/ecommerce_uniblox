const express = require("express");
const mongoose = require("mongoose");
const models = require("./models");


const Cart = models.Cart;
const Order = models.Order;
const app = express();
const port = 3000;
const applyCouponOrderNo = 10;


app.use(express.json());


app.put("/ecommerce/cart", async (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;

    await Cart.findOneAndUpdate({ userId }, { "$push": { productIds: productId } }, { upsert: true, new: true });
    res.status(200).json({ message: "Product added in cart successfully!" });
});


app.post("/ecommerce/checkout", async (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const couponCode = req.body.couponCode;
    const price = req.body.price;

    // Coupon Code Validation
    const orders = await Order.find({ userId }, { orderNo: 1 });
    const latestOrderNo = Math.max(...orders.map(o => o.orderNo));
    if (couponCode && ((latestOrderNo + 1) % applyCouponOrderNo) != 0)
        res.status(404).json({ message: "Coupon Code caanot be applied!" });

    // Create new order
    const newOrderObj = new Order({ userId, productId, couponCode, price, orderNo: latestOrderNo + 1 });
    await newOrderObj.save();
    res.status(200).json({ message: "Order placed successfully!" })
});


mongoose.connect("mongodb://localhost:27017/uniblox", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB!");
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});