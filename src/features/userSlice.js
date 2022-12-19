import { createSlice } from "@reduxjs/toolkit"
let dt = new Date();

const initState = {
    logInTime : 0,
    users: [],
    currentUser: "",
    isFatching: false,
    error: false,
}

const userSlice = createSlice({
    name: "user",
    initialState: initState,
    reducers: {
        // login
        loginStart: (state) => {
            state.isFatching = true
        },
        loginSuccess: (state, actions) => {
            state.isFatching = false;
            state.currentUser = actions.payload;
            state.logInTime = dt.getTime();
        },
        loginFailure: (state) => {
            state.isFatching = false;
            state.error = true;
        },
        // logout
        logOut: (state, actions) => {
            state.currentUser = ""
        },
        // get user
        getUserssStart: (state, actions) => {
            state.isFatching = true;
            state.error = false;
        },
        getUserssSuccess: (state, actions) => {
            state.isFatching = false;
            state.users = actions.payload;
        },
        getUserssFailure: (state, actions) => {
            state.isFatching = false;
            state.error = true;
        },
        // delete
        deleteUsersStart: (state, actions) => {
            state.isFatching = true;
            state.error = false;
        },
        deleteUsersSuccess: (state, actions) => {
            state.isFatching = false;
            state.users.splice(
                state.users.findIndex((item) => item._id === actions.payload), 1
            );
        },
        deleteUsersFailure: (state, actions) => {
            state.isFatching = false;
            state.error = true;
        },
    },
});

export const { loginFailure, loginSuccess, loginStart, logOut,
    getUserssFailure, getUserssStart, getUserssSuccess,
    deleteUsersFailure, deleteUsersStart, deleteUsersSuccess,
} = userSlice.actions
export default userSlice.reducer
