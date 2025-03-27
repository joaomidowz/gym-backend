const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

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

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                height_cm: user.height_cm,
                weight_kg: user.weight_kg,
                streak_count: user.streak_count,
                is_admin: user.is_admin,
                is_public: user.is_public
            }
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

        const token = jwt.sign({ id: user.id, email: user.email, }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                is_admin: user.is_admin,
                is_public: user.is_public
            }
        });
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

// GET /USER:ID
const getUserById = async (req, res) => {
    try {
        return res.status(200).json(req.profile)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// PUT / user
const updateUser = async (req, res) => {
    const { id } = req.params
    const { height_cm, weight_kg } = req.body

    if (!height_cm && !weight_kg) return res.status(400).json({ error: 'At least one field (height our weight) must be provide' })

    try {
        const user = await User.findByPk(id)

        if (!user) return res.status(404).json({ error: 'User not Found' })

        if (height_cm !== undefined) user.height_cm = height_cm
        if (weight_kg !== undefined) user.weight_kg = weight_kg

        await user.save()

        res.json({
            message: 'User update successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                height_cm: user.height_cm,
                weight_kg: user.weight_kg,
                streak_count: user.streak_count
            }
        })

    } catch (error) {
        console.error('Update user error:', error)
        res.status(500).json({ error: error.message })
    }
}

// DELETE / user
const deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findByPk(id)

        if (!user) return res.status(400).json({ error: 'User not find' })

        await user.destroy()

        res.json({ message: 'User deleted successfully' })
    } catch (error) {
        console.error('Delete user error: ', error)
        res.status(500).json({ error: error.message })
    }
}


module.exports = {
    createUser,
    login,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};