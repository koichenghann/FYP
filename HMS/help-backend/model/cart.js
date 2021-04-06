const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const product = new Schema({
    productId:{ type: Number},
    quantity:{ type: Number},
    name:{ type: String},
    title:{type: String},
    price:{ type: Number}
},{
    _id:false,retainKeyOrder:true
})

const cartSchema = new Schema({
    userName: { type: String, required: true },
    products:  {type: [product],default:undefined},
    modifiedOn: { type: Date, default: Date.now }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
        timestamps: true
    }
);
const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Cart }