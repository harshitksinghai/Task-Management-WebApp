import { differenceInDays } from "date-fns";
import { TaskProperties } from "./taskSlice";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AddTaskStates {
    type: string;
    properties: TaskProperties;
    content: string[];
    parentId: string | null;
}

const initialState: AddTaskStates = {
    type: "task",
    properties: { title: "", isCompleted: false, daysLeft: '-' },
    content: [],
    parentId: null,
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
        updateProperties(state, action: PayloadAction<{ key: string; value: any }>) {
            const key = action.payload.key;
            const value = action.payload.value;
            if (value !== undefined) {
                state.properties[key as keyof TaskProperties] = value;
              } else {
                // If the value is undefined, delete the key-value pair if it exists
                if (state.properties.hasOwnProperty(key as keyof TaskProperties)) {
                  delete state.properties[key as keyof TaskProperties];
                }
              }
        },
    },
});

export const { setTitle, setType, setDueDate, setParentId, setIsCompleted, setProperties, setDaysLeft, clearProperties, updateProperties } = addTaskStatesSlice.actions;
export default addTaskStatesSlice.reducer;
