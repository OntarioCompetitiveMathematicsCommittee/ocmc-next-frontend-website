import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const sortComparer = (a, b) => {
    if(!a.signups_active && b.signups_active) return 1;
    else if(a.signups_active && !b.signups_active) return -1;

    const dateA = new Date(a.updatedAt);
    const dateB = new Date(b.updatedAt);

    if (dateA > dateB) return -1;
    else if (dateA < dateB) return 1;
    else return 0;
};

const contestsAdapter = createEntityAdapter({
    sortComparer: sortComparer
});

const initialState = contestsAdapter.getInitialState();

export const contestsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getContests: builder.query({
            query: () => '/contests',
            validStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 60,
            transformResponse: (responseData) => {
                const loadedContests = responseData.map((contest) => {
                    contest.id = contest._id;
                    return contest;
                });
                return contestsAdapter.setAll(initialState, loadedContests);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Contests', id: 'LIST' },
                        ...result.ids.map((id) => ({ type: 'Contest', id }))
                    ]
                } else {
                    return [{ type: 'Contests', id: 'LIST' }]
                }
            }
        }),

        addNewContest: builder.mutation({
            query: initialContestData => ({
                url: '/contests',
                method: 'POST',
                body: { ...initialContestData }
            }),
            invalidatesTags: [{ type: 'Contest', id: 'LIST' }]
        }),

        updateContest: builder.mutation({
            query: initialContestData => ({
                url: '/contests',
                method: 'PATCH',
                body: { ...initialContestData }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Contest', id: arg.id }]
        }),

        updateContestSignups: builder.mutation({
            query: ({ id, participant_id, type }) => ({
                url: `/contests/${id}`,
                method: 'PATCH',
                body: { participant_id, type }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Contest', id: arg.id }]
        }),

        deleteContest: builder.mutation({
            query: ({ id }) => ({
                url: '/contests',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Contest', id: arg.id }]
        })

    }),
});

export const { 
    useGetContestsQuery,
    useAddNewContestMutation,
    useUpdateContestMutation,
    useUpdateContestSignupsMutation,
    useDeleteContestMutation
} = contestsApiSlice;

export const selectContestResult = contestsApiSlice.endpoints.getContests.select();

const selectContestsData = createSelector(
    selectContestResult,
    contestsResult => contestsResult.data
);

export const {
    selectAll: selectAllContests,
    selectById: selectContestById,
    selectIds: selectContestIds
} = contestsAdapter.getSelectors(state => selectContestsData(state) ?? initialState);