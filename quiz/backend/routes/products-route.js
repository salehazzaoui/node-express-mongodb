const express = require('express');
const Product = require('../models/products');

const route = express.Router();

route.get('/', (req, res) => {
    Product.find({}).then((products) => {
        res.status(200).json({products});
    }).catch((e) => console.error(e))
})

route.get('/:id', (req, res) => {
    Product.findById(req.params.id).then((product) => {
        res.status(200).json({ product });
    }).catch((e) => console.error(e))
})

route.post('/', (req, res) => {
    const {name, description, price, inStock} = req.body;
    const product = new Product({
        name,
        description,
        price,
        inStock
    });
    product.save().then((product) => {
        res.status(201).json({product});
    }).catch((e) => console.error(e))
})

route.put('/:id', (req, res) => {
    const {name, description, price, inStock} = req.body;
    const product = new Product({
        _id: req.params.id,
        name,
        description,
        price,
        inStock
    });
    Product.updateOne({ _id: req.params.id }, product).then(() => {
        res.status(200).json({ message: 'Modified!' });
    }).catch((e) => console.error(e))
})

route.delete('/:id', (req, res) => {
    Product.deleteOne({ _id: req.params.id }).then(() => {
        res.status(200).json({ message: 'Deleted!' });
    }).catch((e) => console.error(e))
})

module.exports = route;