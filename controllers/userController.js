const User = require('../models/user');

const updateUser = (req, res) => {
    const userId = req.params.id;
    const { name, username } = req.body;

    const query = 'UPDATE Users SET name = ?, username = ? WHERE id = ?';
    db.query(query, [name, username, userId], (err, result) => {
        if (err) return res.status(500).send('Error updating user');
        res.status(200).send('User updated successfully');
    });
};

module.exports = { updateUser };