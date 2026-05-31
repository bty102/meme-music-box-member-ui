import {
    createAsyncThunk,
} from "@reduxjs/toolkit";

import {
    getMyBookingsApi,
} from "../services/bookingApi";

export const fetchMyBookings =
    createAsyncThunk(
        "booking/fetchMyBookings",

        async (
            {
                pageNumber,
                pageSize,
            },
            thunkAPI
        ) => {

            try {

                return await getMyBookingsApi({
                    pageNumber,
                    pageSize,
                });

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error.response?.data?.message
                    || "Fetch bookings failed"
                );
            }
        }
    );