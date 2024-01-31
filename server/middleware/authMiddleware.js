import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token){
        try {
            const decoded = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userID).select('-password');
            next();
        } 
        catch (error) {
            res.status(401);
            throw new Error('Not authorised, invalid token');
        }
    }
    else {
        res.status(401);
        throw new Error('Not authorised, no token');
    }
});

export {protect};