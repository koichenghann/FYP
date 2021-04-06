const router = require('express').Router();
const multer = require('multer');
const checkJWT = require('../middlewares/checkjwt')
const {Product} = require('../model/product')
const {Category} = require('../model/product')
const {Shipment} = require('../model/shipment')
const {Order} = require('../model/order')

const ship = require('../shipmentImages.json')


var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

router.route('/products/:id?')
  .get(checkJWT, async (req, res) => {
    if (req.params.id) {
      const product = await Product.find({ productId: String(req.params.id) }, { _id: false, __v: false })
      res.json({ success: true, message: "Success", product: product })
    }
    else {
      const products = await Product.find({sellerName : req.decoded.user.userName}, { _id: false, __v: false })
      res.json({ success: true, message: "Success", products: products })
    }
  })
  .post([checkJWT, upload.single('image')], async (req, res, next) => {
    try {
      if (req.decoded.user.userType == "Seller") {
        let product = new Product();
        product.sellerName = req.decoded.user.userName
        product.productName = req.body.productName
        product.productDescription = req.body.productDescription
        product.brand = req.body.brand
        product.price = req.body.price
        product.stock = req.body.stock
        product.weight = req.body.weight
        product.image = req.body.image
        product.parcelLength = req.body.parcelLength
        product.parcelWidth = req.body.parcelWidth
        product.parcelHeight = req.body.parcelHeight
        product.category = req.body.category
        const existingCategory = await Category.findOne({ name: req.body.category.toLowerCase(), status: 'A' })
        if (existingCategory) {
          product.save()
          res.status(200).json({ success: true, message: 'Product added successfully' });
        } else
          return res.status(404).json({ success: false, message: 'Category is not present' })
      } else {
        res.status(403).json({ success: false, message: 'Operation not allowed' });
      }
    } catch (err) {
      next(err)
    }
  })
  .patch(checkJWT, async (req, res, next) => {
    try {
      if (req.decoded.user.userType == "Seller") {
        let condition = { productId: req.body.productId }
        let update = {}
        if (req.body.productName) update.productName = req.body.productName
        if (req.body.category) {
          const existingCategory = await Category.findOne({ name: req.body.category.toLowerCase(), status: 'A' })
          if (!existingCategory)
            // throw ({code : 404, message: 'Category is not present'})
            return res.status(404).json({ success: false, message: 'Category is not present' })
          update.category = req.body.category
        }
        if (req.body.stock) update.stock = req.body.stock
        await Product.findOneAndUpdate(condition, { $set: update })
        res.status(200).json({ success: true, message: 'update sucessfull' });
      } else {
        res.status(403).json({ success: false, message: 'Operation not allowed' });
      }
    } catch (err) {
      next(err)
    }
  })
  .delete(checkJWT, async (req, res, next) => {
    try {
      if (req.decoded.user.userType == "Seller") {
        const update = await Product.deleteOne({ productId: req.params.id })
        if (!update)
          throw new Error("Cannot remove the product!")
        res.json({
          success: true,
          user: req.query.name,
          message: `Successfully removed the product ${req.params.id}`
        })
      } else {
        res.status(403).json({ success: false, message: 'Operation not allowed' });
      }
    }
    catch (error) {

      next(error)
    }
  })

  router.route('/shipment/:id?')
  .get(checkJWT, async (req, res) => {
    const shipmentDetails = await Shipment.find({ userName : req.decoded.user.userName}, { _id: false, __v: false })
    res.json({ success: true, message: "Success", shipmentDetails })
  })
  .post(checkJWT, async (req, res, next) => {
    try {
      let shipment = new Shipment();
      shipment.userName = req.decoded.user.userName
      shipment.id = req.body.id
      shipment.name = req.body.name
      shipment.price = req.body.price
      if(req.body.status) shipment.status = req.body.status
      switch (req.body.image) {
        case "0":
          shipment.image = ship.city
          break;
        case "1":
          shipment.image = ship.DHL
          break;
        case "2":
          shipment.image = ship['J&T']
          break;
        case "3":
          shipment.image = ship['ninja']
          break;
        case "4":
          shipment.image = ship.postalu
          break;
      }
      await shipment.save()
      res.status(200).json({ success: true, message: 'Shipment details added successfully' });
    } catch (err) {
      next(err)
    }
  })
  .patch(checkJWT, async (req, res, next) => {
    try {
      if (req.decoded.user.userType == "Seller") {
        let condition = { id: req.body.id }
        let update = {}
        if (req.body.price) update.price = req.body.price
        await Shipment.findOneAndUpdate(condition, { $set: update })
        res.status(200).json({ success: true, message: 'update sucessfull' });
      } else {
        res.status(403).json({ success: false, message: 'Operation not allowed' });
      }
    } catch (err) {
      next(err)
    }
  })
  .delete(checkJWT, async (req, res, next) => {
    try {
      const update = await Shipment.deleteOne({ id: req.params.id })
      if (!update)
        throw new Error("Cannot remove Shipment!")
      res.json({
        success: true,
        accountNo: req.query.name,
        message: `Successfully removed the bank Shipment details ${req.params.id}`
      })
    }
    catch (error) {
      next(error)
    }
  })

  router.route('/order')
  .get(checkJWT, async (req, res) => {
    console.log('req:', req.decoded.user.userName)
    const orderDetails = await Order.find({ sellerUserName : req.decoded.user.userName},{ _id: false, __v: false })
    res.json({ success: true, message: "Success", orderDetails })
  })
  .post(checkJWT, async (req, res, next) => {
    console.log('req:', req.body)
    try {
      let bg = Math.floor(Math.random()*16777215).toString(16);
      let shipment = new Order();
      shipment.userName = req.decoded.user.userName
      shipment.id = req.body.id
      shipment.name = req.body.name
      shipment.price = req.body.price
      if(req.body.status) shipment.status = req.body.status
      shipment.image = `https://ui-avatars.com/api/?background=${bg}&color=fff&name=${req.body.name.substring(0,3)}&length=2`
      await shipment.save()
      res.status(200).json({ success: true, message: 'Shipment details added successfully' });
    } catch (err) {
      next(err)
    }
  })
  .patch(checkJWT, async (req, res, next) => {
    try {
      if (req.decoded.user.userType == "Seller") {
        let condition = { orderId: req.body.orderId }
        await Order.findOneAndUpdate(condition, { $set: {orderStatus : "shipped"} })
        res.status(200).json({ success: true, message: 'update sucessfull' });
      } else {
        res.status(403).json({ success: false, message: 'Operation not allowed' });
      }
    } catch (err) {
      next(err)
    }
  })

  




module.exports = router;