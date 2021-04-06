const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate')(mongoose)
const { Product } = require('./product');
const { Counter } = require('./counter');

const orderSchema = new Schema({
    orderId: { type: String, unique: true },
    quantity: { type: Number, required: true },
    amountPaid: { type: String, required: true },
    orderStatus: { type: String, default: "pending" },
    orderDate: { type: Date, default: new Date() },
    buyerUserName: { type: String, required: true },
    sellerUserName: { type: String, required: true },
    paymentId: { type: String, unique: true },
    paymentMethod: { type: String, required: true },
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    courier: { type: String, required: true }
})

orderSchema.pre('save', function (next) {
    var doc = this;
    Counter.findByIdAndUpdate({ _id: 'orderId' }, { $inc: { seq: 1 } }, function (error, counter) {
        if (error)
            return next(error);
        doc.orderId = counter.seq;
        Counter.findByIdAndUpdate({ _id: 'paymentId' }, { $inc: { seq: 1 } }, function (error, counter) {
            if (error)
                return next(error);
            doc.paymentId = counter.seq;
            Product.findOneAndUpdate({ productId: doc.productId }, { $inc: { stock: -doc.quantity } }, function (error, ttt) {
                if (error)
                    return next(error);
                next();
            });
        });
    });
})


const paymentSchema = new Schema({
    paymentId: { type: String, unique: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, required: true },
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })

paymentSchema.pre('save', function (next) {
    var doc = this;
    Counter.findByIdAndUpdate({ _id: 'paymentId' }, { $inc: { seq: 1 } }, function (error, counter) {
        if (error)
            return next(error);
        doc.paymentId = counter.seq;
        next();
    });
});

// not required
const shippingSchema = new Schema({
    shippingId: { type: String, unique: true },
    shippingMethod: { type: String, required: true },
    shippingStatus: { type: String, required: true },
    shippingMethodName: { type: String, required: true }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })

shippingSchema.pre('save', function (next) {
    var doc = this;
    Counter.findByIdAndUpdate({ _id: 'shippingId' }, { $inc: { seq: 1 } }, function (error, counter) {
        if (error)
            return next(error);
        doc.shippingId = counter.seq;
        next();
    });
});

const shippingMethodSchema = new Schema({
    methodName: { type: String, required: true },
    image: { type: String, required: true },
    pricePerKg: { type: Number, required: true },
    status: { type: String, required: true }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })

const Order = mongoose.model('Order', orderSchema);
const Payment = mongoose.model('Payment', paymentSchema);
const Shipping = mongoose.model('Shipping', shippingSchema);
const ShippingMethod = mongoose.model('ShippingMethod', shippingMethodSchema);

module.exports = {
    Order,
    Payment,
    Shipping,
    ShippingMethod
}