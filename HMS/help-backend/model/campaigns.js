const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const campaignSchema = new Schema({
    name: { type: String, required: true, unique: true, lowercase: true },
    image: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true }
})
campaignSchema.index({"endDate": 1 }, { expireAfterSeconds: 0 } );
const Campaign = mongoose.model('Campaign', campaignSchema);
module.exports = { Campaign }