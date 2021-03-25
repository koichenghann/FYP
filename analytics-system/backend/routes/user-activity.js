const express = require("express");
const router = express.Router();

const UserActivityController = require("../controllers/user-activity");

router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );
});

router.get("/getAllUserActivities", UserActivityController.getAllUserActivities);
router.post("/getUserActivitiesByDate/:date", UserActivityController.getUserActivityByDate);
router.post("/createUserActivity", UserActivityController.createUserActivity);
router.put("/updateUserActivity/:date", UserActivityController.updateUserActivity);



module.exports = router;
