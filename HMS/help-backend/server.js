const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const GridFsStorage = require("multer-gridfs-storage");
const cors = require('cors')
const Counter = require('./model/counter').Counter
const config = require('./config')
const app = express()
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({ extended: true,limit: '50mb' }))
app.use(express.static(__dirname));
app.use(morgan('dev'))
app.use(cors())

//remove mongo deprication warnings
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set( 'useUnifiedTopology', true )

mongoose.connect(config.database, err => {
    if (err)
        console.log("Error in database connection")
    else {
 
        mongoose.connection.db.listCollections({ name: 'counters' })
            .next(function (err, collinfo) {
                if (collinfo) {
                    console.log("database connection successful")
                } else {
                    let data = [
                        { _id: "productId", seq: 0 }, { _id: "orderId", seq: 0 }, { _id: "paymentId", seq: 0 }, { _id: "shippingId", seq: 0 }
                    ]
                    Counter.collection.insertMany(data)
                    console.log("database connection successful ")
                }
            });
    }
})


  

const userRoutes = require('./routes/account')
const adminRoutes = require('./routes/admin')
const sellerRoutes = require('./routes/seller')
const buyerRoutes = require('./routes/buyer')

app.use('/api/accounts', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/seller', sellerRoutes)
app.use('/api', buyerRoutes)

app.use((error, req, res, next) => {
    console.log('error:', error.message)
    if(error.code == "11000") res.status(400).send({status: 400, message : error.errmsg})
    else 
    res.status(error.code || 500).send({
        status: error.code || 500,
        message: error.message || 'Internal Server Error'
    });
})

app.listen(config.port, (err) => {
    console.log('listening on port' + config.port)
})

