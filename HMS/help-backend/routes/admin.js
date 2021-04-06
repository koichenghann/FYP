const router = require('express').Router();
const multer = require('multer');
const checkJWT = require('../middlewares/checkjwt')
const config = require('../config')
const crypto = require("crypto");
const GridFsStorage = require("multer-gridfs-storage");
const {Order} = require('../model/order')

const path = require("path");
const { Campaign } = require('../model/campaigns')
const { User, Seller, Buyer } = require('../model/user');
const { Category, Product } = require('../model/product');

// file storage
//  var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1])
//   }
// });
// var upload = multer({ storage: storage }) 
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

router.route('/allusers')
  .get(checkJWT, async (req, res) => {
    const users = await Promise.all([
      Seller.find({}, { _id: false, __v: false }).lean(),
      Buyer.find({}, { _id: false, __v: false }).lean()
    ])
    function timeSince(date) {
      var seconds = Math.floor((Date.parse(new Date().toISOString()) - date) / 1000);
      var interval = seconds / 31536000;

      if (interval > 1) {
        return Math.floor(interval) + " year ago";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " month ago";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " day ago";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hour ago";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
      }
      return Math.floor(seconds) + " seconds ago";
    }
    for (const e of users[0]) {
      const lastLogin = timeSince(e.lastLogin)
      e.lastLogin = lastLogin
      e.role = 'Seller'
    }
    for (const e of users[1]) {
      const lastLogin = timeSince(e.lastLogin)
      e.lastLogin = lastLogin
      e.role = 'Buyer'
    }
    res.json({
      success: true,
      users: users[0].concat(users[1]),
      message: "Successful"
    })
  })
  .post(checkJWT, async (req, res, next) => {
    console.log('req:', req.body)
    try {
      const doc = await User.findOne({ userName: req.body.userName })
      console.log('doc:', doc.userType)
      if (!doc)
        throw new Error("User not found!")
      if (doc.userType == "Seller") {
        delete req.body.lastLogin
        delete req.body.userName
        const update = await Seller.findOneAndUpdate({ userName: doc.userName }, { $set: req.body })
        console.log('update:', update)
        if (!update)
          throw new Error("Cannot do the upate!")
        const updateUser = await User.findOneAndUpdate({ userName: doc.userName },
            { $set: { 'status': req.body.status } })
          if (!updateUser)
            throw new Error("Cannot do the upate!")
      }
      else {
        delete req.body.lastLogin
        delete req.body.userName
        const update = await Buyer.update({ userName: doc.userName }, { $set: req.body })
        if (!update)
          throw new Error("Cannot do the upate!")
           const updateUser = await User.findOneAndUpdate({ userName: doc.userName },
            { $set: { 'status': req.body.status } })
          if (!updateUser)
            throw new Error("Cannot do the upate!")

      }
      res.json({
        success: true,
        user: req.body.userName,
        message: "Successfully edited profile"
      })
    } catch (error) {
      next(error)
    }
  })

router.route('/removeUser')
  .post(checkJWT, async (req, res, next) => {
    console.log('req:', req.body.userName)
    try {
      const doc = await User.findOne({ userName: req.body.userName })
      if (!doc)
        throw new Error("User not found!")
      if (doc.userType == "Seller") {
        const update = await Seller.findOneAndUpdate({ userName: doc.userName }, { $set: { status : "Inactive"} })
        if (!update)
          throw new Error("Cannot do the upate!")
        const updateUser = await User.findOneAndUpdate({ userName: doc.userName },
          { $set: { status: "Inactive" } })
        if (!updateUser)
          throw new Error("Cannot do the upate!")
      }
      else {
        const update = await Buyer.update({ userName: doc.userName }, { $set: { status: "Inactive" } })
        if (!update)
          throw new Error("Cannot do the upate!")
        const updateUser = await User.findOneAndUpdate({ userName: doc.userName },
          { $set: { status: "Inactive" } })
        if (!updateUser)
          throw new Error("Cannot do the upate!")

      }
      res.json({
        success: true,
        user: req.body.userName,
        message: "Successfully removed the user"
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
  .post([checkJWT, upload.single('image')], async (req, res, next) => {
    try {
      if (req.decoded.user.userType == "Admin") {
        let category = new Category();
        category.name = req.body.name;
        category.image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
        
        const existingCategory = await Category.findOne({ name: req.body.name })
        if (existingCategory)
          return res.status(404).json({ success: false, message: 'Category with the given name already exist' })
        category.save();
        res.status(200).json({ success: true, message: 'Category added successfully' });
      } else {
        console.log("Testing",req.decoded.user.userType)
        res.status(403).json({ success: false, message: 'Operation not allowed' });
      }
    } catch (err) {
      next(err)
    }
  })
  .patch([checkJWT, upload.single('image')], async (req, res, next) => {
    try {
      if (req.decoded.user.userType == "Admin") {
        let condition = { name: req.body.name }
        let update = {}
        if (req.file)
          update.image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
        if (req.body.status)
          update.status = req.body.status
        await Category.findOneAndUpdate(condition, { $set: update })
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
      if (req.decoded.user.userType == "Admin") {
        const update = await Category.remove({ name: req.query.name })
        if (!update)
          throw new Error("Cannot remove the category!")
        res.json({
          success: true,
          user: req.query.name,
          message: `Successfully removed the category ${req.query.name}`
        })
      } else {
        res.status(403).json({ success: false, message: 'Operation not allowed' });
      }
    }
    catch (error) {
      next(error)
    }
  })

router.route('/campaigns')
  .get(checkJWT, async (req, res, next) => {
    const campaigns = await Campaign.find({}, { _id: false, __v: false })
    res.json({
      success: true,
      message: "Success",
      campaigns: campaigns
    })
  })
  .post([checkJWT, upload.single('image')], async (req, res, next) => {
    try {
      console.log("req.body.startDate",req.body.startDate);
      let campaign = new Campaign();
      campaign.name = req.body.name;
      campaign.image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      campaign.startDate = JSON.parse(req.body.startDate)
      campaign.endDate = JSON.parse(req.body.endDate)
      // campaign.startDate = req.body.startDate
      // campaign.endDate = req.body.endDate
      const existingCategory = await Campaign.findOne({ name: req.body.name })
      if (existingCategory)
        return res.status(404).json({ success: false, message: 'Campaign with the given name already exist' })
      await campaign.save();
      res.status(200).json({ success: true, message: 'Campaign added successfully' });
    } catch (err) {
      next(err)
    }
  })
  .patch([checkJWT, upload.single('image')], async (req, res, next) => {
    try {
      let condition = { name: req.body.name }
      let update = {}
      if (req.file) update.image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
      if (req.body.startDate) update.startDate = req.body.startDate
      if (req.body.endDate) update.endDate = req.body.endDate
      await Campaign.findOneAndUpdate(condition, { $set: update })
      res.status(200).json({ success: true, message: 'update sucessfull' });
    } catch (err) {
      next(err)
    }
  })
  .delete(checkJWT, async (req, res, next) => {
    try {
      const update = await Campaign.remove({ name: req.query.name })
      if (!update)
        throw new Error(`Cannot remove the campaign!`)
      res.json({
        success: true,
        user: req.query.name,
        message: "Successfully removed the campaign"
      })
    }
    catch (error) {
      next(error)
    }
  })

router.get('/products', async (req, res, next) => {
  try {
    let products = await Product.find({})
      .populate({ path: 'categoryDetails', match: { status: 'A', status: 'I' } })
      .exec()
    res.json({
      success: true,
      message: "Success",
      products: products
    })
  } catch (error) {
    next(error)
  }
})

// post order
router.route('/orders')
    .get(checkJWT, async (req, res) => {
      const orderDetails = await Order.find({ }, { _id: false, __v: false })
      res.json({ success: true, message: "Success", orderDetails })
    })

module.exports = router;
