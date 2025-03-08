import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const problemListsAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.name.localeCompare(b.name)
});

const initialState = problemListsAdapter.getInitialState();

export const problemApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProblemList: builder.query({
            query: () => '/problemLists',
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
                    ];
                } else {
                    return [{ type: 'ProblemLists', id: 'LIST' }];
                }
            }
        }),
    }),
    tagTypes: ['ProblemLists', 'ProblemList'],
});

export const {
    useGetProblemListQuery,
} = problemApiSlice;