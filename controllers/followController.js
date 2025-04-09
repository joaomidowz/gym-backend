const { Follow, User } = require('../models')

// POST
const followUser = async (req, res) => {
    const followerId = req.user.id
    const followingId = parseInt(req.params.userId)

    if (followerId === followingId) return res.status(400).json({ error: "You cant follow yourself" })

    try {
        const [follow, created] = await Follow.findOrCreate({
            where: { follower_id: followerId, following_id: followingId }
        })

        if (!created) return res.status(400).json({ message: 'You already follow this user' })

        return res.status(201).json({ message: 'User followed!' })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// DELETE
const unfollowUser = async (req, res) => {
    const followerId = req.user.id
    const followingId = parseInt(req.params.userId)

    try {
        const follow = await Follow.findOne({
            where: { follower_id: followerId, following_id: followingId }
        })

        if (!follow) return res.status(400).json({ message: 'You dont follow this user' })

        await follow.destroy()
        return res.status(201).json({ message: 'User followed!' })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//GET
const getFollowers = async (req, res) => {
    const { userId } = req.params

    try {
        const followers = await Follow.findAll({
            where: { following_id: userId },
            include: {
                model: User,
                as: 'follower',
                attributes: ['id', 'name']
            }
        })

        res.json({ count: followers.length, followers })
    } catch (error) {
        console.error('Get followers error: ', error)
        return res.status(500).json({ error: error.message })
    }
}

//GET / Following
const getFollowing = async (req, res) => {
    const { userId } = req.params

    try {
        const following = await Follow.findAll({
            where: { follower_id: userId },
            include: {
                model: User,
                as: 'following',
                attributes: ['id', 'name']
            }
        })
        res.json({ count: following.length, following })
    } catch (error) {
        console.error('Get following error: ', error)
        return res.status(500).json({ error: error.message })
    }
}

const checkIfFollowing = async (req, res) => {
    const followerId = req.user.id;
    const followingId = parseInt(req.params.userId);
  
    if (followerId === followingId) {
      return res.json({ is_following: false });
    }
  
    try {
      const follow = await Follow.findOne({
        where: {
          follower_id: followerId,
          following_id: followingId,
        },
      });
  
      return res.json({ is_following: !!follow });
    } catch (error) {
      console.error("Erro ao verificar follow:", error);
      return res.status(500).json({ error: "Erro ao verificar follow" });
    }
  };  

module.exports = {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
    checkIfFollowing 
}