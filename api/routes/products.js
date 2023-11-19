const express = require('express');

const Product = require('../models/product');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', (req, res, next) => {
    Product.find()
    .exec()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => console.log(err))
})

router.post('/', (req, res, next) => {
 
    const _product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })

    _product.save().then((res) => {
        console.log(res)
       
    }).catch((err) => {
       
    })
    
    res.status(201).json({
        message: "added get all products",
        product: _product
    })
   
})

router.get('/:productId', (req, res , next) => {
  const id = req.params.productId;
  Product.findById(id)
  .exec()
  .then(doc =>{
        if(doc) {
          res.status(200).json(doc)
        }
    })
  .catch(err => {
    console.log(err)
    if(err){
        res.status(500).json({
            error: {
                error: err
            }
        })
    }
  })
})

router.patch('/:productId', (req, res , next) => {
   res.status(200).json({
    message: 'you have updated'
   })
})

router.delete('/:productId', (req, res , next) => {
   const id = req.params.productId;
   Product.remove({_id: id})
   .exec()
   .then(result => {
    res.status(200).json(result);
   })
   .catch(err => console.log(err))
 })

module.exports = router;