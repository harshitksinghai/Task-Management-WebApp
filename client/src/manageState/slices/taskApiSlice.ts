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
        updateTask: builder.mutation({
            query: ({taskId, properties}) => ({
                url: `${TASKS_URL}/${taskId}`,
                method: 'PATCH',
                body: { properties },
            }),
        }),
    }),
})

export const { useCreateTaskMutation, useFetchTasksMutation, useDeleteTaskMutation, useUpdateTaskMutation } = taskApiSlice;