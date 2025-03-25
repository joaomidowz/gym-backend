const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');

//create user
const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hash = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            email,
            password: hash,
        })

        res.status(201).json({ id: user.id, name: user.name, email: user.email });
    } catch (error) {
        res.status(500).json({ error: 'Error to create user' });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOnde({ where: { email } })
        if (!user) return res.status(404).json({ error: 'User not find' })

        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(401).json({ error: 'Incorrect password' })

        const token = jwt.sign({ id: user.id, email: email.user, }, secret, { expiresIn: '1d' })

        res.json({ token })
    } catch (error) {
        res.status(500).json({ error: 'Error in login'})
    }
}