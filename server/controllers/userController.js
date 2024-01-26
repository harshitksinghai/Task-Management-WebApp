import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc    Register a user
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    const userExists = await User.findOne({email: email}); // if no matching data/value is found, return null, otherwise return value. So if there is value assigned to userExists, then it will output true in if(userExists)
    if(userExists){
        res.status(400);
        throw new Error('User already Exists');
    }

    const user = await User.create({
        name: name,
        email: email,
        password: password
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    }
    else{
        res.status(400);
        throw new Error('Invalid User Data');
    }
});

// @desc    Auth user/ get token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Auth User'});
});

// @desc    Logout user
// route    POST /api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Logout User'});
});

// @desc    Get user main page
// route    GET /api/users/main
// @access  Private
const getUserMainPage = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Main Page'});
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserMainPage
};