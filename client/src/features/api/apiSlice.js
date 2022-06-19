import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
    tagTypes: ['Post'],
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => '/post',
            providesTags: ['Post']
        }),
        addNewPost: builder.mutation({
            query: initialPost => ({
                url: '/post',
                method: 'POST',
                body: initialPost
            }),
            invalidatesTags: ['Post']
        }),
        deletePostConfirm: builder.mutation({
            query: post => ({
                url: '/post',
                method: 'DELETE',
                body: post
            }),
            invalidatesTags: ['Post']
        }),
        addNewUser: builder.mutation({
            query: user => ({
                url: '/user/register',
                method: 'POST',
                body: user
            }),
            invalidatesTags: ['Post']
        }),
        getUsers: builder.query({
            query: () => '/user',
            providesTags: ['Post']
        }),
        providesTags: ['Post']
    }),
})

export const {
    useGetPostsQuery,
    useAddNewPostMutation,
    useDeletePostConfirmMutation,
    useAddNewUserMutation,
    useGetUsersQuery
} = apiSlice;
