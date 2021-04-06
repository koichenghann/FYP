const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { User, Seller, Buyer } = require('../model/user');
const { Bank } = require('../model/bank')

const config = require('../config');
const checkJWT = require('../middlewares/checkjwt')

router.post('/signup', async (req, res, next) => {
  console.log('req:', req.body)
  try {
    let user = new User();
    user.userName = req.body.userName;
    user.password = req.body.password;
    user.userType = req.body.userType;
    const existingUser = await User.findOne({ userName: req.body.userName })
    if (existingUser)
      return res.status(404).json({ success: false, message: 'Account with that userName already exist' })
    await user.save();
    if (req.body.userType == "Seller") {
      let seller = new Seller();
      seller.userName = user.userName;
      seller.firstName = req.body.firstName;
      seller.lastName = req.body.lastName;
      seller.email = req.body.email;
      seller.phoneNo = req.body.phoneNo;
      seller.address = req.body.address;
      seller.postalCode = req.body.postalCode;
      seller.city = req.body.city;
      seller.state = req.body.state;
      seller.lastLogin = new Date();
      seller.picture = seller.gravatar();
      await seller.save()
      var token = jwt.sign({
        user: { userName: user.userName, userType: user.userType }
      }, config.secret, {
        expiresIn: '7d'
      });
      res.json({ success: true, message: 'Enjoy your token', token: token });
    }
    else if (req.body.userType == "Buyer") {
      let buyer = new Buyer();
      buyer.userName = user.userName
      buyer.email = req.body.email;
      buyer.firstName = req.body.firstName;
      buyer.lastName = req.body.lastName;
      buyer.phoneNo = req.body.phoneNo;
      buyer.address = req.body.address;
      buyer.postalCode = req.body.postalCode;
      buyer.city = req.body.city;
      buyer.state = req.body.state;
      buyer.lastLogin = new Date();
      buyer.picture = buyer.gravatar();
      await buyer.save()
      var token = jwt.sign({
        user: { userName: user.userName, userType: user.userType }
      }, config.secret, {
        expiresIn: '7d'
      });

      res.json({ success: true, message: 'Enjoy your token', token: token });
    }
    else
      return res.status(404).json({ success: false, message: 'Invalid user type!' })

  } catch (err) {
    console.log('err:', err)
    next(err)
  }

});

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ userName: req.body.userName })
    if (!user)
      return res.status(404).json({ success: false, message: 'Authenticated failed, User not found' });
    if (user.status != "Active")
      return res.status(404).json({ success: false, message: 'User account deactivated contact admin!' });
    if(req.body.userType !== user.userType)
      return res.status(404).json({ success: false, message: 'Username does not exist.' });
    const validPassword = await user.comparePassword(req.body.password);
    if (!validPassword)
      return res.status(404).json({ success: false, message: 'Authentication failed. Wrong password' });
    if (user.userType == "Seller")
      await Seller.updateOne({ userName: req.body.userName }, { $set: { lastLogin: new Date() } })
    else if (user.userType == "Buyer") 
      await Buyer.updateOne({ userName: req.body.userName }, { $set: { lastLogin: new Date() } })
    
    var token = jwt.sign({
      user: { userName: user.userName, userType: user.userType }
    }, config.secret, {
      expiresIn: '7d'
    });
    res.json({ success: true, mesage: "Enjoy your token", token: token });
  } catch (error) {
    next(error)
  }
  
});

router.route('/profile')
  .get(checkJWT, async (req, res, next) => {
    try {
      let doc
      if (req.decoded.user.userType == "Seller") {
        doc = await Seller.findOne({ userName: req.decoded.user.userName })
        if (!doc)
          throw new Error("User not found!")
      }
      else {
        doc = await Buyer.findOne({ userName: req.decoded.user.userName })
        if (!doc)
          throw new Error("User not found!")

      }
      res.json({
        success: true,
        user: doc,
        message: "Successful"
      })
    } catch (error) {
      next(error)
    }

  })
  .post(checkJWT, async (req, res, next) => {
    try {
      let updateObject = {}
      const doc = await User.findOne({ userName: req.decoded.user.userName })
      if (!doc)
        throw new Error("User not found!")
      //change the values according to the profile update
      if (req.body.phoneNo) updateObject.phoneNo = req.body.phoneNo
      if (req.body.email) updateObject.email = req.body.email;
      if (req.body.postalCode) updateObject.postalCode = req.body.postalCode;
      if (req.body.address) updateObject.address = req.body.address;
      if (req.body.city) updateObject.city = req.body.city;
      if (req.body.state) updateObject.state = req.body.state;
      if (req.decoded.user.userType == "Seller") {
        const update = await Seller.update({ userName: req.decoded.user.userName }, { $set: updateObject })
        if (!update)
          throw new Error("Cannot do the upate!")
      }
      else {
        const update = await Buyer.update({ userName: req.decoded.user.userName }, { $set: updateObject })
        if (!update)
          throw new Error("Cannot do the upate!")

      }
      res.json({
        success: true,
        user: req.decoded.user.userName,
        message: "Successfully edited your profile"
      })
    } catch (error) {
      next(error)
    }
  })

router.route('/bankdetails/:id?')
  .get(checkJWT, async (req, res) => {
    const bankDetails = await Bank.find({}, { _id: false, __v: false })
    res.json({ success: true, message: "Success", bankDetails: bankDetails })
  })
  .post(checkJWT, async (req, res, next) => {
    console.log('req:', req.body)
    try {
      let bank = new Bank();
      bank.userName = req.decoded.user.userName
      bank.name = req.body.name
      bank.bank = req.body.bank
      bank.accountNo = req.body.accountNo
      bank.status = req.body.status
      await bank.save()
      res.status(200).json({ success: true, message: 'Bank added successfully' });
    } catch (err) {
      next(err)
    }
  })
  .patch(checkJWT, async (req, res, next) => {
    try {
      if (req.decoded.user.userType == "Seller") {
        let condition = { accountNo: req.body.accountNo }
        await Bank.updateMany({ userName: req.decoded.user.userName}, { $set: { status: false } })
        await Bank.updateOne(condition, { $set: { status : true } })
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
      const update = await Bank.deleteOne({ accountNo: req.params.id })
      if (!update)
        throw new Error("Cannot remove the bank account!")
      res.json({
        success: true,
        accountNo: req.query.name,
        message: `Successfully removed the bank account ${req.params.id}`
      })
    }
    catch (error) {
      next(error)
    }
  })

module.exports = router;
