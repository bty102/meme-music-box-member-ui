import {
    createSlice,
} from "@reduxjs/toolkit";

import {
    fetchProducts,
    searchProducts,
} from "./productThunk";

const initialState = {

    products: [],

    pageNumber: 0,
    pageSize: 10,

    totalPages: 0,
    totalElements: 0,

    loading: false,
    error: null,

    searchKeyword: "",

    mode: "LIST",
};

const productSlice =
    createSlice({

        name: "product",

        initialState,

        reducers: {

            setSearchKeyword:
                (state, action) => {

                    state.searchKeyword =
                        action.payload;
                },
        },

        extraReducers: (builder) => {

            builder

                /* FETCH */

                .addCase(
                    fetchProducts.pending,

                    (state) => {

                        state.loading = true;
                        state.error = null;
                    }
                )

                .addCase(
                    fetchProducts.fulfilled,

                    (state, action) => {

                        state.loading = false;

                        state.mode = "LIST";

                        state.products =
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
                    fetchProducts.rejected,

                    (state, action) => {

                        state.loading = false;

                        state.error =
                            action.payload;
                    }
                )

                /* SEARCH */

                .addCase(
                    searchProducts.pending,

                    (state) => {

                        state.loading = true;
                        state.error = null;
                    }
                )

                .addCase(
                    searchProducts.fulfilled,

                    (state, action) => {

                        state.loading = false;

                        state.mode = "SEARCH";

                        state.products =
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
                    searchProducts.rejected,

                    (state, action) => {

                        state.loading = false;

                        state.error =
                            action.payload;
                    }
                );
        },
    });

export const {
    setSearchKeyword,
} = productSlice.actions;

export default productSlice.reducer;