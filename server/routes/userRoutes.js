// /api/users will be connected to this whole file

import express from "express";
const router = express.Router();

import { authUser } from "../controllers/userController.js"; // when you use the import syntax, you are importing your own js file, so you need to add the .js extension otherwise it will give a module not found error.


router.post('/auth', authUser); // final route will be /api/users/auth


export default router;