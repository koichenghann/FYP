const mongoose = require('mongoose');

const userBehaviorSchema = mongoose.Schema({
  url: { type: String, required: true},
  bounce_rate: {type: String, required: true},
  exit_rate: {type: String, required: true},
  avg_time_on_page: {type: String, required: true},
  avg_page_load_time: {type: String, required: true}
});

module.exports = mongoose.model('userBehavior', userBehaviorSchema);
