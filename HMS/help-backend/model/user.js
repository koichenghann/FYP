const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

const userSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['Buyer', 'Seller', 'Admin'], required: true },
  status : { type: String, default: "Active" }
})

userSchema.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')) return next();

  bcrypt.hash(user.password, null, null, function (err, hash) {
    if (err) return next(err);

    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};




const sellerSchema = new Schema({
  userName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNo: { type: String, default: "no-data" },
  address: { type: String, default: "no-data" },
  picture: String,
  postalCode: { type: String, default: "no-data" },
  city: { type: String, default: "no-data"},
  state: { type: String, default: "no-data" },
  status : { type: String,default: "Active"},
  credit: { type: Number, default: 0 },
  lastLogin: { type: Date, default: new Date() },
  
},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  })


  sellerSchema.virtual('member', {
    ref: 'User', // The model to use
    localField: 'userName', // Find people where `localField`
    foreignField: 'userName', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: true,
  });

sellerSchema.methods.gravatar = function (size) {
  if (!this.size) size = 100;
  if (!this.email) {
    return 'https://gravatar.com/avatar/?s' + size + '&d=retro';
  } else {
    var md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return 'https://gravatar.com/avatar/' + md5 + '?s' + size + '&d=retro';
  }

}
//remove entry in users collection
// sellerSchema.post('remove', { query: true, document: false }, async function() {
//   await User.remove(this.getQuery());
// });

const buyerSchema = new Schema({
  userName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true },
  phoneNo: { type: String,  default: "no-data" },
  address: { type: String,  default: "no-data"},
  postalCode: { type: String,  default: "no-data" },
  picture: String,
  city: { type: String, default: "no-data" },
  state: { type: String, default: "no-data" },
  status : { type: String, default: "Active" },
  lastLogin: { type: Date, default: new Date() },

},
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  })

  buyerSchema.virtual('member', {
    ref: 'User', // The model to use
    localField: 'userName', // Find people where `localField`
    foreignField: 'userName', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: true,
  });

buyerSchema.methods.gravatar = function (size) {
  if (!this.size) size = 100
  if (!this.email) {
    return 'https://gravatar.com/avatar/?s' + size + '&d=retro';
  } else {
    var md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return 'https://gravatar.com/avatar/' + md5 + '?s' + size + '&d=retro';
  }

}

//remove entry in users collections 
buyerSchema.post('remove', { query: true, document: false }, async function() {
  await User.remove(this.getQuery());
});

const accountSchema = new Schema({
  fullName: { type: String, required: true },
  bank: { type: String, required: true },
  accountNo: { type: String, required: true, unique: true }
})

const User = mongoose.model('User', userSchema);
const Seller = mongoose.model('Seller', sellerSchema);
const Buyer = mongoose.model('Buyer', buyerSchema);
const Account = mongoose.model('Account', accountSchema);



module.exports = {
  User,
  Seller,
  Buyer,
  Account
}