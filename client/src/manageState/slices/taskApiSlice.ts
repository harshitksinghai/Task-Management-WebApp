import { apiSlice } from "./apiSlice";

const TASKS_URL = "/api/tasks";
const SUBTASKS_URL = "/api/tasks/subtasks";

export const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTask: builder.mutation({
            query: (data) => ({
                url: `${TASKS_URL}/create`,
                method: 'POST',
                body: data
            }),
        }),
        fetchAllTasks: builder.mutation({
            query: (data) => ({
                url: `${TASKS_URL}/fetch`,
                method: 'POST',
                body: data
            }),
        }),
        fetchSubTasks: builder.query({
            query: (parentId) => ({
                url: `${SUBTASKS_URL}/${parentId}`,
                method: 'GET',
            }),
        }),
        updateParentTaskSubTasksField: builder.mutation({
            query: ({parentId, taskId}) => ({
                url: `${SUBTASKS_URL}/${parentId}`,
                method: 'PATCH',
                body: { taskId },
            }),
        }),
        deleteTask: builder.mutation({
            query: (taskId) => ({
                url: `${TASKS_URL}/${taskId}`,
                method: 'DELETE',
            }),
        }),
        updateTask: builder.mutation({
            query: ({taskId, properties}) => ({
                url: `${TASKS_URL}/${taskId}`,
                method: 'PATCH',
                body: { properties },
            }),
        }),
    }),
})

export const { useCreateTaskMutation, useFetchAllTasksMutation, useDeleteTaskMutation, useUpdateTaskMutation, useFetchSubTasksQuery, useUpdateParentTaskSubTasksFieldMutation } = taskApiSlice;