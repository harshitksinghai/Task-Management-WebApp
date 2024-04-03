import asyncHandler from 'express-async-handler';
import Task from '../models/taskModel.js';

const createTask = asyncHandler(async (req, res) => {
    const {title, project} = req.body;

    const projectValue = project !== undefined ? project : false;

    const task = await Task.create({
        title: title,
        project: projectValue
    });

    if(task){
        res.status(201).json({
            _id: task._id,
            title: task.title,
            completion: task.completion,
            project: task.project
        });
    }
    else{
        res.status(400);
        throw new Error("Invalid Task Data");
    }
});

const showTasks = asyncHandler(async (req, res) => {
    const tasks = await Task.find();
    if(tasks){
        res.status(200).json(tasks);
    }
    else{
        res.status(500);
        throw new Error("Unable to fetch data from database");
    }
    
});

const deleteTaskById = asyncHandler(async (req, res) => {
    const taskID = req.params.taskId;
    const deletedTask = await Task.findByIdAndDelete(taskID);
    if(deletedTask){
        res.status(200).json(deletedTask);
    }
    else{
        res.status(500);
        throw new Error("Task deletion unsuccessful");
    }
});

export {
    createTask,
    showTasks,
    deleteTaskById
};