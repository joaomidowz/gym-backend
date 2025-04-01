const dayjs = require('dayjs');
const { UserStreak } = require('../models');

const getStreak = async (req, res) => {
    try {
        const streak = await UserStreak.findOne({
            where: { user_id: req.user.id },
            attributes: ['current_streak', 'longest_streak', 'last_workout_date']
        });

        if (!streak) {
            return res.status(200).json({
                current_streak: 0,
                longest_streak: 0,
                last_workout_date: null,
                can_use_save: false,
                save_expires_at: null
            });
        }

        return res.status(200).json(streak);

    } catch (error) {
        console.error('Error to search streak', error);
        return res.status(500).json({ error: 'Error to search streak' });
    }
};

const useStreakSave = async (req, res) => {
    try {
        const streak = await UserStreak.findOne({ where: { user_id: req.user.id } });

        if (!streak || !streak.can_use_save) return res.status(400).json({ error: 'You cant use this save now' })

        const now = dayjs()
        if (dayjs(streak.save_expires_at).isBefore(now)) {
            return res.status(400).json({ error: 'Save expire' })
        }

        streak.current_streak += 1
        if (streak.current_streak > streak.longest_streak) {
            streak.longest_streak = streak.current_streak
        }

        streak.can_use_save = false
        streak.save_expires_at = null

        await streak.save()

        return res.status(200).json({
            current_streak: streak.current_streak,
            longest_streak: streak.longest_streak,
            last_workout_date: streak.last_workout_date
        });

    } catch (error) {
        return res.status(500).json({ error: 'Error to save streak' });
    }
}

module.exports = { getStreak, useStreakSave };
