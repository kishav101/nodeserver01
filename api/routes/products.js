const express = require('express');

const Product = require('../models/product');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', (req, res, next) => {
    Product.find()
    .select("name price _id")
    .exec()
    .then(docs => {
    const response = {
        count: docs.length,
        products: docs.map((item) => {
            return {
                _id: item._id,
                name: item.name,
                price: item.price,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3001/products/products/'+ item._id
                }
            }
        })
    }
        res.status(200).json(response)
    })
    .catch(err => console.log(err))
})

router.post('/', (req, res, next) => {
    const _product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    _product.save()
    .then((result) => {
        res.status(201).json({
            message: "added get all products",
            product: result
        })
    })
    .catch((err) => {
       
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
    const id = req.params.productId;
    const updateOperation = {};

    for(const ops of req.body) {
        updateOperation[ops.propName] = ops.value
    }
     Product.findOneAndUpdate({_id: id}, {$set: updateOperation})
     .exec()
     .then(result => {
        res.status(200).json({
            message: 'Product succesfully updated',
            result: result
        })
     })
     .catch(err => {
        console.log("This is the error",err)
     })

})

router.delete('/:productId', (req, res , next) => {
   const id = req.params.productId;
   Product.remove({_id: id})
   .exec()
   .then(result => {
    res.status(200).json(result);
   })
   .catch(err => {
    console.log("This is the error",err)
    res.status(500).json({
        error: {
            message: 'Error deleting ...'
        }
    })
   })
 })

module.exports = router;