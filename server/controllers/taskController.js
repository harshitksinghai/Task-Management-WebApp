import asyncHandler from 'express-async-handler';
import Task from '../models/taskModel.js';

// @desc    create a new task
// route    POST /api/tasks/create
// @access  Private
const createTask = asyncHandler(async (req, res) => {
    const { userId, type, properties, content, parentId } = req.body;

    const task = await Task.create({
        userId: userId,
        type: type,
        properties: properties,
        content: content,
        parentId: parentId,
    });

    if (task) {
        res.status(201).json({
            _id: task._id,
            userId: task.userId,
            type: task.type,
            properties: task.properties,
            content: task.content,
            parentId: task.parentId,
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid Task Data");
    }
});

// @desc    show all tasks
// route    POST /api/tasks/fetch
// @access  Private
const showAllTasks = asyncHandler(async (req, res) => {
    const userId = req.body.userId;
    const tasks = await Task.find({userId: userId});
    if (tasks) {
        res.status(200).json(tasks);
    }
    else {
        res.status(500);
        throw new Error("Unable to fetch data from database");
    }
});

// @desc    delete an existing task
// route    POST /api/tasks/:taskId
// @access  Private
const deleteTaskById = asyncHandler(async (req, res) => {
    const taskId = req.params.taskId;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (deletedTask) {
        res.status(200).json(deletedTask);
    }
    else {
        res.status(500);
        throw new Error("Task deletion unsuccessful");
    }
});

// @desc    update an existing task
// route    PATCH /api/tasks/:taskId
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
    const taskId = req.params.taskId;
    const { properties } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(taskId, { properties }, { new: true });
        if (!updatedTask) {
            res.status(404);
            throw new Error('Task not found');
        }
        console.log("updated task")
        console.log(updatedTask)
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500);
        throw new Error("Task updation unsuccessful");
    }
});

// @desc    show subtasks of specific task
// route    GET /api/tasks/subtasks/:parentId
// @access  Private
const showSubTasks = asyncHandler(async (req, res) => {
    
    const parentId = req.params.parentId;
    
    // Find the parent task by ID
    const parentTask = await Task.findById(parentId);
    
    if (!parentTask) {
        // If parent task not found, return 404
        res.status(404);
        console.log("Parent task not found");
        throw new Error("Parent task not found");
    }
    // Fetch sub-tasks based on parent task's subTasks array
    if(parentTask.subTasks.length === 0){
        res.status(404);
        console.log("No subtasks exist");
        throw new Error("No subtasks exist");
    }

    const filteredSubTasks = await Task.find({ _id: { $in: parentTask.subTasks } });
    if(filteredSubTasks){
        res.status(200).json(filteredSubTasks);
    }
    else{
        res.status(500);
        console.log("Error fetching subtasks");
        throw new Error("Error fetching subtasks");
    }
});

// @desc    update parent-task's subTasks field with new sub-task id
// route    PATCH /api/tasks/subtasks/:parentId
// @access  Private
const updateParentTaskSubTasksField = asyncHandler(async (req, res) => {
    const parentId = req.params.parentId;
    const { taskId } = req.body;

    try {
        // Find the parent task by its ID
        const parentTask = await Task.findById(parentId);
        if (!parentTask) {
            res.status(404);
            console.log("Parent Task not found");
            throw new Error("Parent Task not found");
        }

        // Add the new taskId to the subTasks array
        parentTask.subTasks.push(taskId);

        // Save the updated parent task
        const updatedParentTask = await parentTask.save();

        console.log("Updated parent task:", updatedParentTask);
        res.status(200).json(updatedParentTask);
    } catch (err) {
        res.status(500);
        console.log("Parent Task subTasks id updation unsuccessful");
        throw new Error("Parent Task subTasks id updation unsuccessful");
    }
});

export {
    createTask,
    showAllTasks,
    deleteTaskById,
    updateTask,
    showSubTasks,
    updateParentTaskSubTasksField
};