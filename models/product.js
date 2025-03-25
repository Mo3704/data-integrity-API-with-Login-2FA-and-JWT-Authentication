const db = require('../db/config');

class Product {
    static create(product, callback) {
        const query = 'INSERT INTO Products (name, description, price, quantity) VALUES (?, ?, ?, ?)';
        db.query(query, [
            product.name, 
            product.description, 
            product.price, 
            product.quantity
        ], callback);
    }

    static findAll(callback) {
        const query = 'SELECT * FROM Products';
        db.query(query, callback);
    }

    static findById(id, callback) {
        const query = 'SELECT * FROM Products WHERE id = ?';
        db.query(query, [id], callback);
    }

    static update(id, product, callback) {
        const query = 'UPDATE Products SET name = ?, description = ?, price = ?, quantity = ? WHERE id = ?';
        db.query(query, [
            product.name, 
            product.description, 
            product.price, 
            product.quantity, 
            id
        ], callback);
    }

    static delete(id, callback) {
        const query = 'DELETE FROM Products WHERE id = ?';
        db.query(query, [id], callback);
    }
}

module.exports = Product;