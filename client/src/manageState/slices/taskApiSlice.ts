import { apiSlice } from "./apiSlice";

const TASKS_URL = "/api/tasks";

export const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createTask: builder.mutation({
            query: (data) => ({
                url: `${TASKS_URL}/create`,
                method: 'POST',
                body: data
            }),
        }),
        fetchTasks: builder.mutation({
            query: (data) => ({
                url: `${TASKS_URL}/fetch`,
                method: 'POST',
                body: data
            }),
        }),
        deleteTask: builder.mutation({
            query: (taskId) => ({
                url: `${TASKS_URL}/${taskId}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const { useCreateTaskMutation, useFetchTasksMutation, useDeleteTaskMutation } = taskApiSlice;