const router = require('express').Router();
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const User = require('../model/user');
const checkJWT = require('../middlewares/checkjwt')
const { Campaign } = require('../model/campaigns')
const {Category} = require('../model/product')
const {Product} = require('../model/product')
const {Cart} = require('../model/cart')
const {Shipment} = require('../model/shipment')
const {Order,Payment,Shipping,ShippingMethod} = require('../model/order')
const variants = [{
    "variant_id": 101,
    "id": 1,
    "sku": "sku1",
    "size": "s",
    "color": "navy blue",
    "image_id": 111
}
]
const tags = [
    "New",
    "S",
    "M",
    "3XL",
    "Navy Blue",
    "Red",
    "HELP Merchandise"
]
// function addTitle(o){
// this.title=o.productDescription
// }
// function addType(o){
// this.type=o.type
// }
function addSale() {
    this.sale = true
}
function addNew() {
    this.new = true
}
function addVariants() {
    this.variants = variants
}
function addTags() {
    this.tags = tags
}
// function addImages(){

// }
router.route('/products')
    .get(async (req, res, next) => {
        try {
            let products = await Product.find({})
                .populate({ path: 'categoryDetails', match: { status: 'A' } })
                .exec()
            let filtered_array = _.filter(
                products, function (o) {
                    if (o.categoryDetails != null)
                        return o;
                }
            );
            let result = JSON.parse(JSON.stringify(filtered_array))
            let newArr = _.each(result, function (element) {
                element.sale = true
                element.new = true
                element.variants = variants
                element.tags = tags
                element.type = element.category
                element.title = element.productName + " " + element.productDescription
                element.images = [{ src: element.image, alt: "Navy blue" }]
            });
            res.json(newArr)
        } catch (error) {
            next(error)
        }
    })

router.route('/cart')
    .post(checkJWT, async (req, res, next) => {
        try {
            let newArr = JSON.parse(JSON.stringify(req.body))
            let productArray = _.map(newArr, _.partialRight(_.pick, ['productId', 'quantity', 'title', 'price', 'productName']));
            let products = _.each(productArray, function (element) {
                element.name = element.productName
                delete element.productName
            });
            const existingUser = await Cart.findOne({ userName: req.decoded.user.userName })
            if (existingUser) {
                await Cart.findOneAndUpdate({ userName: req.decoded.user.userName }, { $set: { products: products } })
                res.status(200).json({ success: true, message: 'Item added to cart successfully' });
            } else {
                let cart = new Cart();
                cart.userName = req.decoded.user.userName
                cart.products = products
                cart.save();
                res.status(200).json({ success: true, message: 'Item added to cart successfully' });
            }
        } catch (error) {
            next(error)
        }
    })
    .get(checkJWT, async (req, res, next) => {
        try {
            const cart = await Cart.findOne({ userName: req.decoded.user.userName }, { _id: false, __v: false })
            res.json({
                success: true,
                message: "Success",
                cart: cart
            })
        } catch (error) {
            next(error)
        }
    })
    .patch(async (req, res, next) => {
        try {
            const cart = await Cart.findOneAndUpdate({ userName: req.body.userName }, { $set: { products: req.body.products } }, { returnOriginal: false })
            res.json({
                success: true,
                message: "Success",
                cart: cart
            })
        } catch (error) {
            next(error)
        }
    })

router.route('/categories')
    .get(checkJWT, async (req, res, next) => {
        const categories = await Category.find({}, { _id: false, __v: false })
        res.json({
            success: true,
            message: "Success",
            categories: categories
        })
    })

router.route('/campaigns')
    .get(checkJWT, async (req, res, next) => {
        var currentDate = new Date()
        currentDate.setUTCHours(0, 0, 0, 0)
        console.log('currentDate:', currentDate)
        const db = await Campaign.find({},{ _id: false, __v: false })
        const campaigns = db.filter(e=>{
            if(currentDate <= e.endDate && currentDate >= e.startDate) return e
        })
        res.json({
            success: true,
            message: "Success",
            campaigns: campaigns
        })
    })

// get shipment details
router.route('/shipment/:id?')
    .get(checkJWT, async (req, res) => {
        const shipmentDetails = await Shipment.find({}, { _id: false, __v: false })
        res.json({ success: true, message: "Success", shipmentDetails })
    })

// post order
router.route('/order/:id?')
    .get(checkJWT, async (req, res) => {
      const orderDetails = await Order.find({ buyerUserName : req.decoded.user.userName}, { _id: false, __v: false })
      res.json({ success: true, message: "Success", orderDetails })
    })
    .post(checkJWT, async (req, res, next) => {
      try {
        var order = new Order({
            quantity: req.body.quantity,
            amountPaid: req.body.amountPaid,
            buyerUserName: req.decoded.user.userName,
            sellerUserName: req.body.sellerUserName,
            paymentMethod: req.body.paymentMethod,
            productId: req.body.productId,
            productName: req.body.productName,
            courier: req.body.courier
        });
        await order.save()
        res.status(200).json({ success: true, message: 'product ordered successfully' });
      } catch (err) {
        next(err)
      }
    })

module.exports = router