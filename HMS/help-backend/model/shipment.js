const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShipmentSchema = new Schema({
  userName: { type: String },
  id: { type: String, unique: true },
  name: { type: String },
  price: { type: String, required: true },
  image: { type: String, required: true },
  status: { type: Boolean, default: false },
});

ShipmentSchema.pre("save", async function (next) {
  try {
    if(this.status)
    await Shipment.updateMany({ userName: this.userName}, { $set: { status: false } })
    next()
  } catch (err) {
    throw err;
  }
});

const Shipment = mongoose.model('Shipment', ShipmentSchema);

module.exports = { Shipment }