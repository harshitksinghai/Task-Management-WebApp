import { differenceInDays } from "date-fns";
import { TaskProperties } from "./taskSlice";
import { createSlice } from "@reduxjs/toolkit";

export interface AddTaskStates {
    type: string;
    properties: TaskProperties;
    subTasks: string[];
    parentId: string | undefined;
}

const initialState: AddTaskStates = {
    type: "task",
    properties: { title: "", isCompleted: false, daysLeft: '-' },
    subTasks: [],
    parentId: undefined,
};

const addTaskStatesSlice = createSlice({
    name: "addTaskStates",
    initialState,
    reducers: {
        setTitle(state, action) {
            if (!state.properties.title) {
                // Initialize title property only when setting it
                state.properties.title = "";
            }
            state.properties.title = action.payload;
        },
        setType(state, action) {
            state.type = action.payload;
        },
        setDueDate(state, action) {
            state.properties.dueDate = action.payload;
        },
        setParentId(state, action) {
            state.parentId = action.payload;
        },
        setIsCompleted(state, action){
            state.properties.isCompleted = action.payload;
        },
        setProperties(state, action) {
            state.properties = action.payload;
        },
        setDaysLeft(state, action){
            const dueDate = action.payload;
            const localDueDate = dueDate ? new Date(dueDate) : undefined;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            state.properties.daysLeft = localDueDate ? differenceInDays(localDueDate, today) : '-';
        },
        clearProperties(state) {
            state.properties = { title: "", isCompleted: false, daysLeft: '-'  };
        },
    },
});

export const { setTitle, setType, setDueDate, setParentId, setIsCompleted, setProperties, setDaysLeft, clearProperties } = addTaskStatesSlice.actions;
export default addTaskStatesSlice.reducer;
