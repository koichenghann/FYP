const express = require('express');
const bodyParser = require('body-parser');
const { reduce } = require('highcharts');


const mongoose = require('mongoose');

//const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');


const app = express();

mongoose.connect("mongodb+srv://admin:Password123@cluster0.1iwxm.mongodb.net/mydb?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to database')
  })
  .catch(() => {
    console.log('Connection failed')
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
});

app.use((req, res, next) => {
  console.log('First middleware');
  next();
});

app.use('/api/web',(req, res, next) => {
  const webs = [{
    id: "1",
    title: "webs",
    content: "This is coming from the server"
  }
];

  res.status(200).json({
    message: 'Webs fetched successfully!',
    webs: webs
  })
});

module.exports = app;
