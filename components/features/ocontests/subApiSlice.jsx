import { createEntityAdapter } from '@reduxjs/toolkit';
import { apiSlice } from '../../app/api/apiSlice';

const subsAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.problemList_id.localeCompare(b.problemList_id)
});

const initialState = subsAdapter.getInitialState();

export const subsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUserSubs: builder.query({
            query: () => '/problemSubmissions',
            transformResponse: (responseData) => {
                const loadedSubs = responseData.map((loadedSub) => {
                    loadedSub.id = loadedSub._id;
                    return loadedSub;
                });
                return subsAdapter.setAll(initialState, loadedSubs);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'ProblemSubmission', id: 'LIST' },
                        ...result.ids.map((id) => ({ type: 'ProblemSubmission', id }))
                    ];
                } else {
                    return [{ type: 'ProblemSubmissions', id: 'LIST' }];
                }
            }
        }),

        addUserAnswer: builder.mutation({
            query: ({ user_id, problemList_id, mc_answers, short_answers }) => ({
                url: '/problemSubmissions',
                method: 'POST',
                body: { user_id, problemList_id, mc_answers, short_answers },
            }),
            invalidatesTags: [{ type: 'ProblemSubmissions', id: 'LIST' }],
        }),

        saveUserAnswer: builder.mutation({
            query: ({ id, mc_answers, short_answers, is_submitted, score }) => ({
                url: '/problemSubmissions',
                method: 'PATCH',
                body: { id, mc_answers, short_answers, is_submitted, score },
            }),
            invalidatesTags: [{ type: 'ProblemSubmissions', id: 'LIST' }],
        }),
    }),
    tagTypes: ['ProblemSubmissions', 'ProblemSubmission'],
});

export const {
    useGetUserSubsQuery,
    useAddUserAnswerMutation,
    useSaveUserAnswerMutation,
} = subsApiSlice;