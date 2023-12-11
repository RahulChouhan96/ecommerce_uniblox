const express = require("express");
const mongoose = require("mongoose");
const models = require("./models");


const Cart = models.Cart;
const Order = models.Order;
const Coupon = models.Coupon;
const app = express();
const port = 3000;
const applyCouponOrderNo = 1;


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
    const priceWithoutDiscount = req.body.price;
    let priceWithDiscount = priceWithoutDiscount;

    // Coupon Code Validation
    const orders = await Order.find({ userId }, { orderNo: 1 });
    const latestOrderNo = orders.length ? Math.max(...orders.map(o => o.orderNo)) : 0;
    if (couponCode) {
        const couponObj = await Coupon.findOne({ couponCode });
        if (couponObj && ((latestOrderNo + 1) % applyCouponOrderNo) != 0) {
            res.status(404).json({ message: "Coupon Code caanot be applied!" });
            return
        }

        const discountPercent = couponObj.discountPercent;
        priceWithDiscount = priceWithoutDiscount - (priceWithoutDiscount * discountPercent/100);
    }

    // Create new order
    const newOrderObj = new Order({ 
        userId, productId, couponCode, priceWithDiscount, priceWithoutDiscount, orderNo: latestOrderNo + 1 
    });
    await newOrderObj.save();
    res.status(200).json({ message: "Order placed successfully!" })
});


app.get("/ecommerce/admin/purchases", (req, res) => {

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