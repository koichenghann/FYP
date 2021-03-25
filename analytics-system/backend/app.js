const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { reduce } = require('highcharts');

var cors = require('cors');

const userBehaviorRoutes = require('./routes/user-behavior.js');
const userActivityRoutes = require('./routes/user-activity.js');


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require("./middleware/check-auth");


const app = express();

mongoose.connect("mongodb+srv://martin:Password123@cluster0.jfx6h.mongodb.net/analytic?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database')
  })
  .catch(() => {
    console.log('Connection failed')
  });

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false}));

app.use(cors());

/*
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
});
*/

//routes
app.use("/api/user-behavior", userBehaviorRoutes);
app.use("/api/user-activity", userActivityRoutes);


app.get("/test", (req, res, next) => {
  console.log('Middleware test ran');
  res.status(201).json({message: 'Middleware test ran'});
});

module.exports = app;
