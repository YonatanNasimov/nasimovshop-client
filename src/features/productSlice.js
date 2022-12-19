import { createSlice } from "@reduxjs/toolkit"

const initState = {
    products: [],
    isFetching: false,
    error: false,
}

const productSlice = createSlice({
    name: "product",
    initialState: initState,
    reducers: {
        // get all
        getProductsStart: (state, actions) => {
            state.isFetching = true;
            state.error = false;
        },
        getProductsSuccess: (state, actions) => {
            state.isFetching = false;
            state.products = actions.payload;
        },
        getProductsFailure: (state, actions) => {
            state.isFetching = false;
            state.error = true;
        },
        // delete
        deleteProductsStart: (state, actions) => {
            state.isFetching = true;
            state.error = false;
        },
        deleteProductsSuccess: (state, actions) => {
            state.isFetching = false;
            state.products.splice(
                state.products.findIndex((item) => item._id === actions.payload), 1
            );
        },
        deleteProductsFailure: (state, actions) => {
            state.isFetching = false;
            state.error = true;
        },
        //UPDATE
        // updateProductsStart: (state) => {
        //     state.isFetching = true;
        //     state.error = false;
        // },
        // updateProductsSuccess: (state, action) => {
        //     state.isFetching = false;
        //     state.products[
        //         state.products.findIndex((item) => item._id === action.payload.id)
        //     ] = action.payload.product;
        // },
        updateProductsFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        // add
        addProductsStart: (state, actions) => {
            state.isFetching = true;
            state.error = false;
        },
        addProductsSuccess: (state, actions) => {
            state.isFetching = false;
            state.products.push(actions.payload);
        },
        addProductsFailure: (state, actions) => {
            state.isFetching = false;
            state.error = true;
        },
    },
});

export const { getProductsStart, getProductsSuccess, getProductsFailure,
    deleteProductsFailure, deleteProductsStart, deleteProductsSuccess,
    updateProductsFailure, updateProductsStart, updateProductsSuccess,
    addProductsFailure, addProductsStart, addProductsSuccess,
} = productSlice.actions
export default productSlice.reducer
