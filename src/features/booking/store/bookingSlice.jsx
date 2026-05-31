import {
    createSlice,
} from "@reduxjs/toolkit";

import {
    fetchMyBookings,
} from "./bookingThunk";

const initialState = {

    bookings: [],

    pageNumber: 0,
    pageSize: 5,

    totalPages: 0,
    totalElements: 0,

    loading: false,
    error: null,
};

const bookingSlice =
    createSlice({

        name: "booking",

        initialState,

        reducers: {},

        extraReducers: (builder) => {

            builder

                .addCase(
                    fetchMyBookings.pending,

                    (state) => {

                        state.loading = true;
                        state.error = null;
                    }
                )

                .addCase(
                    fetchMyBookings.fulfilled,

                    (state, action) => {

                        state.loading = false;

                        state.bookings =
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
                    fetchMyBookings.rejected,

                    (state, action) => {

                        state.loading = false;

                        state.error =
                            action.payload;
                    }
                );
        },
    });

export default bookingSlice.reducer;