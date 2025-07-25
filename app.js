const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

mongoose.connect(
    'mongodb+srv://root:6737@cluster0.zdp6oo7.mongodb.net/?retryWrites=true&w=majority',
    {
    
    }
)
  
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders');

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow_Origin', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({
        })
    }

    next();
})

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error:{
            message: 'this is an error'
        }
    })
})

module.exports = app;