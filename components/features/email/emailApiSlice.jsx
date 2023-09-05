import { apiSlice } from '../../app/api/apiSlice';

export const emailApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        activate: builder.mutation({
            query: ({ token }) => ({
                url: `/activate/${token}`,
                method: 'PATCH', 
                body: { token } 
            })
        }),
        send: builder.mutation({
            query: ({ email, message }) => ({
                url: '/',
                method: 'POST',
                body: {email, message }
            })
        })
    })
});

export const { useActivateMutation, useSendMutation } = emailApiSlice;