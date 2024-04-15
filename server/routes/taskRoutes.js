// /api/tasks will be connected to this whole file

import express from "express";
const router = express.Router();
import {protect} from '../middleware/authMiddleware.js';
import { 
    createTask,
    deleteTaskById,
    showAllTasks,
    updateTask,
    showSubTasks,
    updateParentTaskSubTasksField
} from "../controllers/taskController.js"; // when you use the import syntax, you are importing your own js file, so you need to add the .js extension otherwise it will give a module not found error.


router.post('/create', protect, createTask); // final route will be /api/tasks/create
router.post('/fetch', protect, showAllTasks); // final route will be /api/tasks/fetch
router.delete('/:taskId', protect, deleteTaskById); // final route will be /api/tasks/:taskId  (dynamic)
router.patch('/:taskId', protect, updateTask); // final route will be /api/tasks/:taskId (dynamic)

router.get('/subtasks/:parentId', protect, showSubTasks); // final route will be /api/tasks/subtasks/:parentId  (dynamic)
router.patch('/subtasks/:parentId', protect, updateParentTaskSubTasksField); // final route will be /api/tasks/subtasks/:parentId  (dynamic)
//router.get('/main', protect, getUserMainPage); // final route will be /api/users/main


export default router;