import { createSlice } from "@reduxjs/toolkit";

export interface TaskProperties {
  title?: string;
  isCompleted?: boolean;
  dueDate?: Date;
  daysLeft?: number | string;
  content?: Text;
  // Add other properties here as needed
}

export interface Task {
  _id: string;
  userId: string;
  type: string;
  properties: TaskProperties;
  subTasks: string[];
  parentId: string;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    createTaskLocal: (state, action) => {
      const existingTask = state.tasks.find((task) => task._id === action.payload.data._id);
      if(!existingTask){
        state.tasks.unshift(action.payload.data);
      }
    },
    fetchTasksToLocal: (state, action) => {
      if(action.payload.data){
        const newTasks = action.payload.data.filter((task: any) => !state.tasks.some((t) => t._id === task._id));
        state.tasks.unshift(...newTasks);
      }
    },
    deleteTaskLocal: (state, action) => {
      state.tasks = state.tasks.filter((task: any) => task._id !== action.payload.taskId);
    },
    clearTasksLocal: (state) => {
      state.tasks = [];
    },
    updateTaskLocal: (state, action) => {
      const taskToUpdate = state.tasks.find((task) => task._id === action.payload.taskId);
      if(taskToUpdate){
        taskToUpdate.properties = { ...action.payload.properties };
      }
    },
    updateParentTaskSubTasksFieldLocal: (state, action) => {
      const { parentId, taskId } = action.payload;
      const parentTaskToUpdate = state.tasks.find((task) => task._id === parentId);
      if(parentTaskToUpdate){
        if (!parentTaskToUpdate.subTasks) {
          parentTaskToUpdate.subTasks = []; // Ensure subTasks is initialized as an array
        }
        parentTaskToUpdate.subTasks.push(taskId);
      }
    },
  },
});

export const { createTaskLocal, fetchTasksToLocal, deleteTaskLocal, clearTasksLocal, updateTaskLocal, updateParentTaskSubTasksFieldLocal } = taskSlice.actions;

export default taskSlice.reducer;
