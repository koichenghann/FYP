const userBehavior = require("../models/user-behavior.js");

exports.test = (req,res,next)=>{
  res.status(201).json({message: 'test ran - test centre controller'});
}

