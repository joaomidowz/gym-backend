const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const { Op, where } = require("sequelize")

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

const getLoggedUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        })

        res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching logged user.' });
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
    const { id } = req.params;
    const {
      height_cm,
      weight_kg,
      email,
      current_password,
      new_password,
      is_public,
    } = req.body;
  
    if (
      height_cm === undefined &&
      weight_kg === undefined &&
      email === undefined &&
      is_public === undefined &&
      (current_password === undefined || new_password === undefined)
    ) {
      return res.status(400).json({
        error: "Need fill any field, heigh, weight, email, password or visibility.",
      });
    }
  
    try {
      const user = await User.findByPk(id);
  
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }
  
      if (height_cm !== undefined) user.height_cm = height_cm;
      if (weight_kg !== undefined) user.weight_kg = weight_kg;
      if (email !== undefined && email !== user.email) {
        user.email = email;
      }
      if (is_public !== undefined) user.is_public = is_public;
  
      if (current_password && new_password) {
        const match = await bcrypt.compare(current_password, user.password);
  
        if (!match) {
          return res.status(401).json({ error: "Actual password incorrect." });
        }
  
        const hashedPassword = await bcrypt.hash(new_password, 10);
        user.password = hashedPassword;
      }
  
      await user.save();
  
      return res.json({
        message: "User updated with success.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          height_cm: user.height_cm,
          weight_kg: user.weight_kg,
          is_public: user.is_public,
        },
      });
    } catch (error) {
      console.error("Error to update user:", error);
      return res.status(500).json({ error: "Internal error to user." });
    }
  };
  


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


// GET //exercise=query
const searchUser = async (req, res) => {
    const query = req.query.query

    if (!query) return res.status(400).json({ message: "Any Query informed" })

    try {
        const user = await User.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${query}%`
                },
                is_public: true
            },
            attributes: ['id', 'name', 'is_public']
        })


        res.json(user)
    } catch (error) {
        console.error("Error in search user", error)
        res.status(500).json({ message: "Internal error on search user" })
    }
}



module.exports = {
    createUser,
    login,
    getLoggedUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    searchUser
};