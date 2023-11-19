const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "get all orders"
    })
})

router.post('/', (req, res, next) => {
    res.send(200).json({
        message: 'posted on orders'
    })
})

router.get('/:orderId', (req, res, next) => {
    res.status(201).json({
        message: 'this is the order id',
        orderId: req.params.orderId
    })
})

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'this is the oeleeted order',
    })
})



module.exports = router;