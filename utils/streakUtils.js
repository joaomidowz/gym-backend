const { UserStreak } = require('../models')
const { Op } = require('sequelize')
const dayjs = require('dayjs')

async function updateUserStreak(userId, workoutDate) {
    const today = dayjs(workoutDate || new Date()).startOf('day')

    let streak = await UserStreak.findOne({ where: { user_id: userId } })

    if (!streak) {
        return await UserStreak.create({
            user_id: userId,
            current_streak: 1,
            longest_streak: 1,
            last_workout_date: today.toDate()
        })
    }

    const lastDate = dayjs(streak.last_workout_date)

    if (today.isSame(lastDate, 'day')) {
        return streak;
    }

    const diff = today.diff(lastDate, 'day')

    if (diff === 1 || diff === 2) {
        streak.current_streak += 1;
    } else {
        streak.current_streak = 1;
        streak.can_use_save = true
        streak.save_expires_at = dayjs().add(1, 'day').toDate()
    }

    if (streak.current_streak > streak.longest_streak) {
        streak.longest_streak = streak.current_streak
    }

    streak.last_workout_date = today.toDate()
    await streak.save()

    return streak

}

module.exports = { updateUserStreak }