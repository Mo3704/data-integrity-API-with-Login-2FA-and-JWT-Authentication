const db = require('../db/config');

class User {
    static create(user) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO Users (username, password, two_factor_secret) VALUES (?, ?, ?)';
            db.query(query, [user.username, user.password, user.two_factor_secret], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }

    static findByUsername(username) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Users WHERE username = ?';
            db.query(query, [username], (err, results) => {
                if (err) reject(err);
                else resolve(results[0]);
            });
        });
    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Users WHERE id = ?';
            db.query(query, [id], (err, results) => {
                if (err) reject(err);
                else resolve(results[0]);
            });
        });
    }

    static update2FASecret(id, secret) {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE Users SET two_factor_secret = ? WHERE id = ?';
            db.query(query, [secret, id], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }
}

module.exports = User;