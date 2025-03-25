const Product = require('../models/product');

const createProduct = (req, res) => {
    const { name, description, price, quantity } = req.body;
    Product.create({ name, description, price, quantity }, (err, result) => {
        if (err) {
            console.error('Error creating product:', err);
            return res.status(500).send('Error creating product');
        }
        res.status(201).send('Product created successfully');
    });
};

const getProducts = (req, res) => {
    Product.findAll((err, results) => {
        if (err) return res.status(500).send('Error fetching products');
        res.status(200).send(results);
    });
};

const getProductById = (req, res) => {
    const id = req.params.id;
    Product.findById(id, (err, results) => {
        if (err || results.length === 0) return res.status(404).send('Product not found');
        res.status(200).send(results[0]);
    });
};

const updateProduct = (req, res) => {
    const id = req.params.id;
    const { name, description, price, quantity } = req.body;
    Product.update(id, { name, description, price, quantity }, (err, result) => {
        if (err) return res.status(500).send('Error updating product');
        res.status(200).send('Product updated successfully');
    });
};

const deleteProduct = (req, res) => {
    const id = req.params.id;
    Product.delete(id, (err, result) => {
        if (err) return res.status(500).send('Error deleting product');
        res.status(200).send('Product deleted successfully');
    });
};

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };