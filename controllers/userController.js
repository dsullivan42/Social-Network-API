const User = require('../models/User');

module.exports = {

    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json (users);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // get one user by id
    async getSingleUser(req,res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends')
            .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // create a user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
   },

   // update a user by id
   async updateUser(req, res) {
    try {
        const user = await User.findOneAndUpdate(
        {_id: req.params.userId}, 
        {$set: req.body},
        {runValidators: true, new: true});
        if (!user) {
            return res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(user);
        } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
},

// delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({_id: req.params.userId});
                if (!user) {
                    return res.status(404).json({ message: 'No user found with this id!' });
                }
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // add a friend
    async addFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!friend) {
                return res.status(404).json({ message: 'No friend found with this id!' });
            }
            res.json(friend);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // remove a friend
    async removeFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!friend) {
                return res.status(404).json({ message: 'No friend found with this id!' });
            }
            res.json(friend);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};
