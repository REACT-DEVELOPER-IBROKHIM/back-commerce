const { Product } = require('../models/product');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Get all products
router.get('/', async (req, res) => {
    try {
        const productList = await Product.find();
        res.send(productList);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get a product by ID
router.get('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product ID');
    }

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.send(product);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Create a new product
router.post('/', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    });

    try {
        const savedProduct = await product.save();
        res.send(savedProduct);
    } catch (error) {
        res.status(500).send('The product cannot be created');
    }
});

// Update an existing product
router.put('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product ID');
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                richDescription: req.body.richDescription,
                image: req.body.image,
                brand: req.body.brand,
                price: req.body.price,
                category: req.body.category,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                numReviews: req.body.numReviews,
                isFeatured: req.body.isFeatured,
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).send('Product not found');
        }

        res.send(updatedProduct);
    } catch (error) {
        res.status(500).send('The product cannot be updated');
    }
});

// Delete a product

module.exports = router;
