const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
//const { use } = require('../routes/root');



const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean();
    if (!users?.length) {
        return res.status(400).json({message:'No User found'})
    };
    res.json(users); 
});

const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body;
    // console.log(username, password, roles,!Array.isArray(roles),!roles.length,'test')

      if (!username || !password /*|| !Array.isArray(roles) it checks if roles is an array or not || !roles.length*/) {
          return res.status(400).json({message: 'All fields are required'})
      };

    const duplicate = await User.findOne({ username }).lean().exec(); // exech is if we use an await function, it ll show you an error in case something fails
    
    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate Username' });
    };

    const hashedPwd = await bcrypt.hash(password, 10);

    const userObject = { username, "password": hashedPwd, roles }
    

    const user = User.create(userObject);

    if (user) {
        res.status(201).json({message: 'User Created' /*`new user ${username} created`*/})
    } else {
        res.status(400).json({message: 'invalid user data receved'})
    }
});


const updateUser = asyncHandler(async (req, res) => {
    
});

const deleteUser = asyncHandler(async (req, res) => {
    
});

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}