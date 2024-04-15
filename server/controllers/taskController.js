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
// route    GET /api/tasks
// @access  Private
const showTasks = asyncHandler(async (req, res) => {
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
    console.log("properties");

    console.log(properties);
    const taskToUpdate = await Task.findById(taskId);
    if (!taskToUpdate) {
        res.status(404);
        throw new Error('Task not found');
    }
    try {
        //taskToUpdate.properties = { ...properties };
        //console.log("taskToUpdate.properties")
        //console.log(taskToUpdate.properties)
        //const updatedTask = await taskToUpdate.save();
        
        const updatedTask = await Task.findByIdAndUpdate(taskId, { properties }, { new: true });
        console.log("updated task")
        console.log(updatedTask)
        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(500);
        throw new Error("Task updation unsuccessful");
    }
});



export {
    createTask,
    showTasks,
    deleteTaskById,
    updateTask
};