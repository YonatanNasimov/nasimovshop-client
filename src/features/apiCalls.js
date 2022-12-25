import { doApiGet, doApiMethod, server_url } from "../services/apiServices";
import {
    deleteProductsFailure, deleteProductsStart, deleteProductsSuccess,
    getProductsFailure, getProductsStart, getProductsSuccess,
    // updateProductsFailure, updateProductsStart, updateProductsSuccess,
    addProductsFailure, addProductsStart, addProductsSuccess,
}
    from "./productSlice";
import {
    getUserssFailure, getUserssStart, getUserssSuccess,
    deleteUsersFailure, deleteUsersStart, deleteUsersSuccess,
}
    from "./userSlice";
    import { toast } from 'react-toastify';



// products
// get
export const getProducts = async (dispatch) => {
    dispatch(getProductsStart());
    let url = server_url + "/products";
    try {
        let resp = await doApiGet(url);
        dispatch(getProductsSuccess(resp.data));
    } catch (err) {
        dispatch(getProductsFailure());
    }
};
// delete
export const deleteProduct = async (dispatch, id) => {
    dispatch(deleteProductsStart());
    let url = server_url + `/products/${id}`;
    try {
        let resp = await doApiMethod(url, "DELETE", "");
        dispatch(deleteProductsSuccess(id));
    } catch (err) {
        dispatch(deleteProductsFailure());
    }
};
// update
// export const updateProduct = async (id, product, dispatch) => {
//     dispatch(updateProductsStart());
//     let url = server_url + `/products/${id}`;
//     try {
//         let resp = await doApiMethod(url, "PUT", product)
//         dispatch(updateProductsSuccess({ id, product }));
//     } catch (err) {
//         dispatch(updateProductsFailure());
//     }
// };

// add
export const addProduct = async (product, dispatch) => {
    dispatch(addProductsStart());
    let url = server_url + `/products`;
    try {
        let resp = await doApiMethod(url, "POST", product);
        dispatch(addProductsSuccess(resp.data));
    } catch (err) {
        dispatch(addProductsFailure());
        toast.error("there is a eror you sure all inputs are full")
    }
};

// users
// get
export const getUsers = async (dispatch) => {
    dispatch(getUserssStart());
    let url = server_url + "/users/usersList";
    try {
        let resp = await doApiGet(url);
        dispatch(getUserssSuccess(resp.data));
    } catch (err) {
        dispatch(getUserssFailure());
    }
};
// delete
export const deleteUser = async (dispatch, id) => {
    dispatch(deleteUsersStart());
    let url = server_url + `/users/${id}`;
    try {
        let resp = await doApiMethod(url, "DELETE", "");
        dispatch(deleteProductsSuccess(id));
    } catch (err) {
        dispatch(deleteUsersFailure());
    }
};

