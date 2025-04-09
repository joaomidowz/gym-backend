const { Follow } = require('../models');

const isFollowOwner = async (req, res, next) => {
    const followerId = req.user.id;
    const followingId = parseInt(req.params.userId); 

    try {
        const follow = await Follow.findOne({ 
            where: { follower_id: followerId, following_id: followingId }
        });

        if (!follow) {
            return res.status(403).json({ message: 'You do not have permission to alter' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = isFollowOwner;
