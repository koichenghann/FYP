const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BankSchema = new Schema({
  userName: { type: String },
  name: String,
  bank: { type: String, required: true },
  accountNo: { type: String, unique: true, required: true },
  status: { type: Boolean, default: false },
  created: { type: Date, default: Date.now }
});

BankSchema.pre("save", async function (next) {
  try {
    if(this.status)
    await Bank.updateMany({ userName: this.userName}, { $set: { status: "false" } })
    next()
  } catch (err) {
    throw err;
  }
});



const Bank = mongoose.model('Bank', BankSchema);

module.exports = { Bank }
