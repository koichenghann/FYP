const { response } = require("../app");
const UserActivity = require("../models/user-activity");


/*Testing Route and Connection */
exports.test = ( req, res, next ) => {
  // console.log('test - test centre controller');
  res.status(201).json({message: 'test ran - User activity controller'});
}


exports.getUserActivityByDate = (req, res, next) => {
  UserActivity.find({date: req.body.date}).then( response=>{
    console.log('Get User Acvitity by date: ', req.body.date, 'ran!');
    if ( !response ){
      res.status(401).json({
        message: 'user activity retrieved on date ',
        userActivities: []
      })
      console.log('User Acvitity by date: ', req.body.date ,'No record!');
    }

    return res.status(201).json({
      message: 'User activity retrieved from database',
      userActivities: response
    })
  })
  .catch ( err => {
    res.status(500).json({
      message: 'error occured on getting UserActivities',
      error: err
    })
  });



}


exports.getAllUserActivities = (req, res, next) => {
  UserActivity.find().then( allUserActivity =>{
    if(allUserActivity){
      res.status(200).json({
        message: 'All user activities fetched!',
        userActivities: allUserActivity
      });
      console.log('All user activities fetched!');
    }


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
  var updated = false;

  const updatedUserActivity = {
    date: req.body.date,
    visitors: req.body.visitors,
    users: req.body.users,
    pageViews: req.body.pageViews,
    uniquePageViews: req.body.uniquePageViews,
    newSignup: req.body.newSignup,
    actions: req.body.actions
  }
  UserActivity.updateOne({_id: req.params.id}, updatedUserActivity).then( response => {
      console.log("User Activity updated: " + JSON.stringify(response));
      res.status(200).json({message: " User Activity Updated successfully for date "+ req.body.date})
      updated = true;
    })
    .catch( error => {
      res.status(500).json({
        message: 'Error occured at update user activity for date '+ req.body.date,
        error: error
      })
    });

  if(updated){
    console.log(" User Activity Updated successfully for date "+ req.body.date);
  }

}
