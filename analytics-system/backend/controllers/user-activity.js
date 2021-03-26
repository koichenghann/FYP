const UserActivity = require("../models/user-activity");


/*Testing Route and Connection */
exports.test = ( req, res, next ) => {
  // console.log('test - test centre controller');
  res.status(201).json({message: 'test ran - User activity controller'});
}


exports.getUserActivityByDate = (req, res, next) => {
  UserActivity.findOne({date: req.body.date}).populate('date').then(response =>{
    if ( !response ){
      res.status(401).json({
        message: 'no user activity found on this date ',
      })
    }
    return res.status(201).json({
      message: 'user activity retrieved on date ',
      userActivity: response
    })
  })
  .catch ( err => {
    res.status(500).json({
      message: 'error occured on getting user activity on this date',
      error: err
    })
  });
}


exports.getAllUserActivities = (req, res, next) => {
  UserActivity.find().then( allUserActivity =>{
    res.status(200).json({
      message: 'All user activities fetched!',
      userActivities: allUserActivity
    });
  });
}


exports.createUserActivity= (req, res, next) => {
console.log('createUserAcvitity method ran!')
 const userActivity = new UserActivity({
    date: req.body.date,
    visitors: req.body.visitors,
    users:req.body.users,
    pageViews: req.body.pageViews,
    uniquePageViews: req.body.uniquePageViews,
    newSignup: req.body.newSignup,
    actions: req.body.actions
  });
  userActivity.save().then( createdUserActivity =>{
    console.log('New User Activity: ', userActivity);
    res.status(201).json({
      message: 'New User Activity has added succesfully!'
    });

  /**/
  })
  .catch(error =>{
    res.status(401).json({message:'UserActivity creation failed.'})
  });

}

exports.updateUserActivity = (req, res, next) =>{
  const updatedUserActivity = {
    date: req.body.date,
    visitors: req.body.visitors,
    users: req.body.users,
    pageViews: req.body.pageViews,
    uniquePageViews: req.body.uniquePageViews,
    newSignup: req.body.newSignup,
    actions: req.body.actions
  }
  UserActivity.updateOne({date: req.params.date}, updatedUserActivity).then( response => {
      console.log("User Activity updated: " + response);
      res.status(200).json({message: " User Activity Updated successfully for date "+ date})
    })
    .catch( error => {
      res.status(500).json({
        message: 'Error occured at update user activity for date '+ date,
        error: error
      })
    });
  }
