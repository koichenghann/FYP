const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate')(mongoose)
const { Counter } = require('./counter');

const productSchema = new Schema({
    productId: { type: String, unique: true },
    sellerName: { type: String, required: true },
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    weight: { type: Number, required: true },
    image: { type: String },
    parcelLength: { type: Number, required: true },
    parcelWidth: { type: Number, required: true },
    parcelHeight: { type: Number, required: true },
    category: { type: String, required: true, lowercase: true } //check
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })

productSchema.virtual('categoryDetails', {
    ref: 'Category',
    localField: 'category',
    foreignField: 'name',
    justOne: true,
    match: { isActive: true }
})

productSchema.virtual('sellerDetails', {
    ref: 'Seller',
    localField: 'sellerName',
    foreignField: 'userName',
    justOne: true
})
// productSchema.pre('find',function(next){
//     this.populate({
//         path: 'categoryDetails',
//         match: {
//           status: 'A'
//         }
//       })
//     next()
// })
productSchema.pre('save', function (next) {
    var doc = this;
    Counter.findByIdAndUpdate({ _id: 'productId' }, { $inc: { seq: 1 } }, function (error, counter) {
        if (error)
            return next(error);
        doc.productId = counter.seq;
        next();
    });
});

const categorySchema = new Schema({
    name: { type: String, required: true, unique: true, lowercase: true },
    image: { type: String, required: true },
    status: { type: String, enum: ['A', 'I'], default: 'A' }
})

const Product = mongoose.model('Product', productSchema);
const Category = mongoose.model('Category', categorySchema);

// ProductSchema
//   .virtual('averageRating')
//   .get(function() {
//     var rating = 0;
//     if (this.reviews.length == 0) {
//       rating = 0;
//     } else {
//       this.reviews.map((review) => {
//         rating += review.rating;
//       });
//       rating = rating / this.reviews.length;
//     }

//     return rating;
//   });

productSchema.plugin(deepPopulate)

module.exports = { Product, Category }


