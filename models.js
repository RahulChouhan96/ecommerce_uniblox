const mongoose = require("mongoose");


const Schema = mongoose.Schema;


const UserSchema = new Schema({
    userName: String
});
const User = mongoose.model('User', UserSchema);


const ProductSchema = new Schema({
    productName: String
});
const Product = mongoose.model('Product', ProductSchema);


const CartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    productIds: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }]
});
module.exports.Cart = mongoose.model('Cart', CartSchema);