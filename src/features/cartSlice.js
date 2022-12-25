import { createSlice } from "@reduxjs/toolkit"

const initState = {
    products: [],
    quantity: 0,
    total: 0,
    details: {}
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initState,
    reducers: {
        addProduct: (state, actions) => {
            state.quantity += 1;
            state.products.push(actions.payload);
            state.total += actions.payload.price * actions.payload.quantity;
        },
        setOrders: (state, actions) => {
            state.details = actions.payload.data;
        },
        resetAllItems: (state, actions) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
        deleteSingleItem: (state, actions) => {
            state.products = state.products.filter
                (
                    (item) => item._id != actions.payload.delId
                )
            state.quantity -= 1;
            state.total -= actions.payload.price ;
        }
    }
});

export const { addProduct, setOrders, resetAllItems, deleteSingleItem } = cartSlice.actions
export default cartSlice.reducer
