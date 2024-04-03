import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
        type: String,
        default: ""
    },
    completion:{
        type: Boolean,
        default: false
    },
    project:{
        type: Boolean,
        default: false
    },
    projectId:{
        type: String,
        default: ""
    }

},{
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

export default Task;