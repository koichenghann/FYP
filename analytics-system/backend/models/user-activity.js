const mongoose = require('mongoose');

const userActivitySchema = mongoose.Schema({
  date: { type: String, required: true},
  visitors: { type: String, required: true},
  users: { type: String, required: true},
  pageViews: {type: String, required: true},
  uniquePageViews: {type: String, required: true},
  newSignup: {type: String, required: true},
  actions: {type: String, required: true}
});

module.exports = mongoose.model('userActivity', userActivitySchema);

/*export interface UserActivity {
  visitors: string,
  pageViews: string,
  uniquePageViews: string,
  newSignup: string,
  actions: string
}
 */
