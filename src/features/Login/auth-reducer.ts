import {handleServerAppError, handleServerNetworkError} from "../../utils/app-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {asyncAppActions, changeAppStatus} from "../../app/app-reducer";
import {LoginParamsType} from "../../api/api-types";
import {authApi} from "../../api/todo-list-api";

export type AuthInitialStateType = {
    isLoggedIn: boolean
}
const initialState: AuthInitialStateType = {
    isLoggedIn: false
}

export const login = createAsyncThunk(
    'auth/setIsLoggedIn',
    async (data: LoginParamsType, {dispatch}) => {
        dispatch(changeAppStatus("loading"))
        try {
            authApi.login(data)
                .then(res => {
                    if (res.data.resultCode === 0) {
                        return
                    } else {
                        return handleServerAppError(res.data, dispatch)
                    }
                })
        } catch (err) {
            return handleServerNetworkError(err, dispatch)
        }
        dispatch(changeAppStatus("succeed"))
    });

export const logout = createAsyncThunk(
    'auth/removeLogin',
    async (_, {dispatch}) => {
        dispatch(changeAppStatus("loading"))
        try {
            authApi.logout()
                .then(res => {
                    if (res.data.resultCode === 0) {
                        return
                    } else {
                        return handleServerAppError(res.data, dispatch)
                    }
                })
        } catch (error) {
            return handleServerNetworkError(error.message, dispatch)
        }
        dispatch(changeAppStatus('succeed'))
    });

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(asyncAppActions.initializedApp.fulfilled,
                (state) => {
                    state.isLoggedIn = true
                })
            .addCase(login.fulfilled,
                (state) => {
                    state.isLoggedIn = true
                })
            .addCase(logout.fulfilled,
                (state) => {
                    state.isLoggedIn = false
                })
    }
});

/*export const {setIsLoggedInAC} = authSlice.actions*/
export const asyncAuthActions = {login, logout}
export const authReducer = authSlice.reducer
