// /api/users will be connected to this whole file

import express from "express";
const router = express.Router();
import {protect} from '../middleware/authMiddleware.js';
import { 
    authUser,
    registerUser,
    logoutUser,
    getUserMainPage
} from "../controllers/userController.js"; // when you use the import syntax, you are importing your own js file, so you need to add the .js extension otherwise it will give a module not found error.


router.post('/', registerUser); // final route will be /api/users/
router.post('/auth', authUser); // final route will be /api/users/auth
router.post('/logout', logoutUser); // final route will be /api/users/logout
router.get('/main', protect, getUserMainPage); // final route will be /api/users/main


export default router;