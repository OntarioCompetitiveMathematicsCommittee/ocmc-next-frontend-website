import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const txoAdapter = createEntityAdapter({});

const initialState = txoAdapter.getInitialState();

export const txoApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getTxos: builder.query({
            query: () => '/txo',
            validStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            keepUnusedDataFor: 60,
            transformResponse: (responseData) => {
                const loadedTxos = responseData.map((txo) => {
                    txo.id = txo._id;
                    return txo;
                });
                return txoAdapter.setAll(initialState, loadedTxos);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'TxOs', id: 'LIST' },
                        ...result.ids.map((id) => ({ type: 'TxO', id }))
                    ]
                } else {
                    return [{ type: 'TxOs', id: 'LIST' }]
                }
            }
        }),

        updateTxo: builder.mutation({
            query: txoData => ({
                url: '/txo',
                method: 'POST',
                body: { ...txoData }
            }),
            invalidatesTags: [{ type: 'TxO', id: 'LIST' }]
        }),

        deleteTxo: builder.mutation({
            query: ({ id }) => ({
                url: '/txo',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: [{ type: 'TxO', id: 'LIST' }]
        })
    })
});

export const {
    useGetTxosQuery,
    useUpdateTxoMutation,
    useDeleteTxoMutation
} = txoApiSlice;

export const selectTxoResult = txoApiSlice.endpoints.getTxos.select();

const selectTxoData = createSelector(
    selectTxoResult,
    (txoResult) => txoResult.data
);

export const {
    selectAll: selectAllTxos,
    selectById: selectTxoById,
    selectIds: selectTxoIds
} = txoAdapter.getSelectors((state) => selectTxoData(state) ?? initialState);