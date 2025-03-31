//setMiddleware.js
const { WorkoutSet, WorkoutSession } = require('../models')

const isSetOwnerOrAdmin = async (req, res, next) => {
    try {
        const setId = req.params.id
        const userId = req.user.id
        const userIsAdmin = req.user.is_admin

        const set = await WorkoutSet.findByPk(setId, {
            include: {
                model: WorkoutSession,
                as: 'session',
                attributes: ['user_id']
            }
        })

        if (!set) return res.status(404).json({ error: 'Set not found' })

        const sessionOwnerId = set.session.user_id

        if (userIsAdmin || userId === sessionOwnerId) return next()

        return res.status(403).json({ error: 'Access denied' })
    } catch (error) {
        return res.status(500).json({ error: 'Internal error' })
    }
}

module.exports = isSetOwnerOrAdmin