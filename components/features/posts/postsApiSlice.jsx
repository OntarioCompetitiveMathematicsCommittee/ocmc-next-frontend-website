import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const sortComparer = (a, b) => {
    if (a.display && !b.display) return -1;
    else if (!a.display && b.display) return 1;

    const dateA = new Date(a.updatedAt);
    const dateB = new Date(b.updatedAt);

    if (dateA > dateB) return -1;
    else if (dateA < dateB) return 1;
    else return 0;
};


const postsAdapter = createEntityAdapter({
    sortComparer: sortComparer
});

const initialState = postsAdapter.getInitialState();

export const postsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getPosts: builder.query({
            query: () => '/posts',
            validStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 60,
            transformResponse: (responseData) => {
                const loadedPosts = responseData.map((post) => {
                    post.id = post._id;
                    return post;
                });
                return postsAdapter.setAll(initialState, loadedPosts);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Posts', id: 'LIST' },
                        ...result.ids.map((id) => ({ type: 'Post', id }))
                    ]
                } else {
                    return [{ type: 'Posts', id: 'LIST' }]
                }
            }
        }),

        addNewPost: builder.mutation({
            query: initialPostData => ({
                url: '/posts',
                method: 'POST',
                body: { ...initialPostData }
            }),
            invalidatesTags: [{ type: 'Post', id: 'LIST' }]
        }),

        updatePost: builder.mutation({
            query: initialPostData => ({
                url: '/posts',
                method: 'PATCH',
                body: { ...initialPostData }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]
        }),

        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: '/posts',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]
        })

    }),
});

export const {
    useGetPostsQuery,
    useAddNewPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation
} = postsApiSlice;

export const selectPostResult = postsApiSlice.endpoints.getPosts.select();

const selectPostsData = createSelector(
    selectPostResult,
    postsResult => postsResult.data
);

export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState);