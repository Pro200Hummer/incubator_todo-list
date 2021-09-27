import {authApi, LoginParamsType} from "../../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/app-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {changeAppStatus} from "../../app/app-reducer";

type InitialStateType = {
    isLoggedIn: boolean
}
const initialState: InitialStateType = {
    isLoggedIn: false
}

export const setIsLoggedIn = createAsyncThunk(
    'auth/setIsLoggedIn',
    async (data: LoginParamsType, {dispatch}) => {
        dispatch(changeAppStatus("loading"))
        try {
            authApi.login(data)
                .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(authSlice.actions.setIsLoggedInAC(true))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                })
        } catch (err) {
            handleServerNetworkError(err, dispatch)
        }
        dispatch(changeAppStatus("succeed"))
    });

export const removeLogin = createAsyncThunk(
    'auth/removeLogin',
    async (_, {dispatch}) => {
        dispatch(changeAppStatus("loading"))
        try {
            authApi.logout()
                .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(authSlice.actions.setIsLoggedInAC(false))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                })
        } catch (error) {
            handleServerNetworkError(error.message, dispatch)
        }
        dispatch(changeAppStatus('succeed'))
    });

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedInAC: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
    },
});

export const {setIsLoggedInAC} = authSlice.actions

export default authSlice.reducer
