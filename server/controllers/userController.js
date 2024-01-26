import asyncHandler from 'express-async-handler';

// @desc    Auth user/ get token
// route    POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Auth User'});
});

// @desc    Register a user
// route    POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Register User'});
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