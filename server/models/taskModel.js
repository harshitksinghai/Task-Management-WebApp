import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    properties:{
        type: mongoose.Schema.Types.Mixed,
        default:{}
    },
    content:{
        type: [String],
        default: []
    },
    parentId:{
        type: String,
        default: null
    },
    isCompleted:{
        type: Boolean,
        default: false
    }

},{
    timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

export default Task;