import { apiSlice } from '../../app/api/apiSlice';

export const emailApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        activate: builder.mutation({
            query: ({ token }) => ({
                url: `/activate/${token}`,
                method: 'PATCH', 
                body: { token }
            })
        })
    })
});

export const { useActivateMutation } = emailApiSlice;