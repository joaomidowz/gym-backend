const { ValidationErrorItemType } = require("sequelize")
const { Exercises } = require("../models")

// GET /exercises
const getAllExercise = async (req, res) => {
    try {
        const exercises = await Exercises.findAll()
        res.json(exercises)
    } catch (error) {
        console.error('Get exercises error: ', error)
        res.status(500).json({ error: error.message })
    }
}

// POST /exercises
const createExercise = async (req, res) => {
    const { name, category, thumbUrl } = req.body

    if (!name || !category) return res.status(400).json({ error: 'Mandatory filters is missing.' })

    try {
        const exercises = await Exercises.create({ name, category, thumbUrl })
        res.status(201).json(exercises)
    } catch (error) {
        console.error('Create exercises error: ', error)
        res.status(500).json({ error: error.message })
    }
}

// PUT /exercises
const alterExercise = async (req, res) => {
    const { id } = req.params
    const { name, category, thumbUrl } = req.body

    if (!name || !category) return res.status(400).json({ error: 'Mandatory filters is missing.' })

    try {
        const exercises = await Exercises.findByPk(id)

        if (!exercises) return res.status(400).json({ error: 'Exercise not find' })

        exercises.name = name
        exercises.category = category
        exercises.thumbUrl = thumbUrl

        await exercises.save()

        res.json(exercises)
    } catch (error) {
        console.error('Update exercises error: ', error)
        res.status(500).json({ error: error.message })
    }
}

// DELETE /exercises
const deleteExercise = async (req, res) => {
    const { id } = req.params

    try {
        const exercises = await Exercises.findByPk(id)

        if (!exercises) return res.status(400).json({ error: 'Exercise not find' })

        await exercises.destroy()

        res.json({ message: 'Exercise deleted successfully'})
    } catch (error) {
        console.error('Delete exercises error: ', error)
        res.status(500).json({ error: error.message })
    }
}


module.exports = {
    getAllExercise,
    createExercise,
    alterExercise,
    deleteExercise
}