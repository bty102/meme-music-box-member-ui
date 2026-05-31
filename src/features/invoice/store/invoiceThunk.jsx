import {
    createAsyncThunk
} from "@reduxjs/toolkit";

import {
    getMyInvoicesApi
} from "../services/invoiceApi";

export const fetchMyInvoices =
    createAsyncThunk(
        "invoice/fetchMyInvoices",

        async (
            {
                pageNumber,
                pageSize,
            },
            thunkAPI
        ) => {

            try {

                return await getMyInvoicesApi({
                    pageNumber,
                    pageSize,
                });

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error.response?.data?.message
                    || "Fetch invoices failed"
                );
            }
        }
    );