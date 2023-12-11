const express = require("express");
const mongoose = require("mongoose");
const models = require("./models");


const Cart = models.Cart;
const app = express();
const port = 3000;


app.use(express.json());


app.put("/ecommerce/cart", async (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;

    await Cart.findOneAndUpdate({ userId }, { "$push": { productIds: productId } }, { upsert: true, new: true });
    res.status(200).json({ message: "Product added in cart successfully!" });
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