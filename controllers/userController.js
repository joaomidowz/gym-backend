const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');
const secret = process.env.JWT_SECRET || 'segredo_segurao';

//create user
const createUser = async (req, res) => {
    const { name, email, password, height_cm, weight_kg } = req.body;

    try {
        const hash = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hash,
            height_cm,
            weight_kg
        })

        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            height_cm: user.height_cm,
            weight_kg: user.weight_kg,
            streak_count: user.streak_count
        });
    } catch (error) {
        console.error('Create user error:', error);
        return res.status(500).json({ error: error.message });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } })
        if (!user) return res.status(404).json({ error: 'User not find' })

        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(401).json({ error: 'Incorrect password' })

        const token = jwt.sign({ id: user.id, email: user.email, }, secret, { expiresIn: '1d' })

        res.json({ token })
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: error.message });
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ['id', 'name', 'email', 'height_cm', 'weight_kg', 'streak_count'] })
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createUser,
    login,
    getAllUsers
};