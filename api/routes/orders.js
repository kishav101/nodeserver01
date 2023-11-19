const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Order = require('../models/order');

router.get('/', (req, res, next) => {
   Order.find()
   .select("product quantity _id")
   .exec()
   .then(docs => {
    res.status(200).json({
        count: docs.length,
        orders: docs
    })
   })
   .catch()
})

router.post('/', (req, res, next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    })
    order
    .save()
    .then(res => {
        res.send(201).json({
            message: 'posted on orders',
            result: res
        })
    })
    .catch(err => console.log(err))
})

router.get('/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId)
    .exec()
    .then(result => {
        res.status(201).json({
            message: 'this is the order id',
            orderId: result
        })
    })
    .catch(err => console.log(err))
})

router.delete('/:orderId', (req, res, next) => {
  Order.findOneAndRemove({_id: req.params.orderId}).
  exec()
  .then(res => {
    res.status(200).json({
        message: 'this is the deleted order',
    })
  })
  .catch(err)
})



module.exports = router;