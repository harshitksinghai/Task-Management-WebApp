import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TaskProperties {
  title?: string;
  isCompleted?: boolean;
  dueDate?: Date;
  // Add other properties here as needed
}

interface Task {
  _id: string;
  userId: string;
  type: string;
  properties: TaskProperties;
  content: string[];
  parentId: string;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

export const taskSlice = createSlice({
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
      const newTasks = action.payload.data.filter((task: any) => !state.tasks.some((t) => t._id === task._id));
      state.tasks.unshift(...newTasks);
    },
    deleteTaskLocal: (state, action) => {
      state.tasks = state.tasks.filter((task: any) => task._id !== action.payload.taskId);
    },
    clearTasksLocal: (state) => {
      state.tasks = [];
    },
    updateTaskLocal: (state, action: PayloadAction<{ taskId: string }>) => {
      const taskToUpdate = state.tasks.find((task) => task._id === action.payload.taskId);
      // Update the task as needed
    },
  },
});

export const { createTaskLocal, fetchTasksToLocal, deleteTaskLocal, clearTasksLocal } = taskSlice.actions;

export default taskSlice.reducer;
