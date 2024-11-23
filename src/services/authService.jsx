const jwt = require('jsonwebtoken');
const { findUserByUsername } = require('../models/userModel');
const bcrypt = require('bcryptjs');

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const validateCredentials = async (username, password) => {
    const user = await findUserByUsername(username);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Credenciales inválidas');
    }

    return user;
};

module.exports = { generateToken, validateCredentials };
