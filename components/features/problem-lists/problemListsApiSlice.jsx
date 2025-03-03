import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const sortComparer = (a, b) => {
    const dateA = new Date(a.updatedAt);
    const dateB = new Date(b.updatedAt);

    if (dateA > dateB) return -1;
    else if (dateA < dateB) return 1;
    else return 0;
};

const problemListsAdapter = createEntityAdapter({
    sortComparer: sortComparer
});

const initialState = problemListsAdapter.getInitialState();

export const problemListsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getProblemLists: builder.query({
            query: () => '/problemLists',
            validStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 60,
            transformResponse: (responseData) => {
                const loadedProblemLists = responseData.map((problemList) => {
                    problemList.id = problemList._id;
                    return problemList;
                });
                return problemListsAdapter.setAll(initialState, loadedProblemLists);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'ProblemLists', id: 'LIST' },
                        ...result.ids.map((id) => ({ type: 'ProblemList', id }))
                    ]
                } else {
                    return [{ type: 'ProblemLists', id: 'LIST' }]
                }
            }
        }),

        addNewProblemList: builder.mutation({
            query: initialProblemListData => ({
                url: '/problemLists',
                method: 'POST',
                body: { ...initialProblemListData }
            }),
            invalidatesTags: [{ type: 'ProblemList', id: 'LIST' }]
        }),

        updateProblemList: builder.mutation({
            query: initialProblemListData => ({
                url: '/problemLists',
                method: 'PATCH',
                body: { ...initialProblemListData }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'ProblemList', id: arg.id }]
        }),

        deleteProblemList: builder.mutation({
            query: ({ id }) => ({
                url: '/problemLists',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'ProblemList', id: arg.id }]
        })

    }),
});

export const { 
    useGetProblemListsQuery,
    useAddNewProblemListMutation,
    useUpdateProblemListMutation,
    useDeleteProblemListMutation
} = problemListsApiSlice;

export const selectProblemListResult = problemListsApiSlice.endpoints.getProblemLists.select();

const selectProblemListsData = createSelector(
    selectProblemListResult,
    problemListsResult => problemListsResult.data
);

export const {
    selectAll: selectAllProblemLists,
    selectById: selectProblemListById,
    selectIds: selectProblemListIds
} = problemListsAdapter.getSelectors(state => selectProblemListsData(state) ?? initialState);