import {
    createSlice
} from "@reduxjs/toolkit";

import {
    fetchMyInvoices
} from "./invoiceThunk";

const initialState = {

    invoices: [],

    pageNumber: 0,
    pageSize: 5,

    totalPages: 0,
    totalElements: 0,

    loading: false,
    error: null,
};

const invoiceSlice =
    createSlice({

        name: "invoice",

        initialState,

        reducers: {},

        extraReducers: (builder) => {

            builder

                .addCase(
                    fetchMyInvoices.pending,

                    (state) => {

                        state.loading = true;
                        state.error = null;
                    }
                )

                .addCase(
                    fetchMyInvoices.fulfilled,

                    (state, action) => {

                        state.loading = false;

                        state.invoices =
                            action.payload.content;

                        state.pageNumber =
                            action.payload.page.number;

                        state.pageSize =
                            action.payload.page.size;

                        state.totalPages =
                            action.payload.page.totalPages;

                        state.totalElements =
                            action.payload.page.totalElements;
                    }
                )

                .addCase(
                    fetchMyInvoices.rejected,

                    (state, action) => {

                        state.loading = false;

                        state.error =
                            action.payload;
                    }
                );
        },
    });

export default invoiceSlice.reducer;