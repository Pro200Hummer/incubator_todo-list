import {handleServerAppError, handleServerNetworkError} from "../../utils/app-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {asyncAppActions, changeAppStatus} from "../../app/app-reducer";
import {LoginParamsType} from "../../api/api-types";
import {authApi} from "../../api/todo-list-api";
import {AxiosError} from "axios";
import {ThunkError} from "../../app/store";

export type AuthInitialStateType = {
    isLoggedIn: boolean
}
const initialState: AuthInitialStateType = {
    isLoggedIn: false
}

export const login = createAsyncThunk<{isLoggedIn: boolean}, LoginParamsType, ThunkError>(
    'auth/login',
    async (data: LoginParamsType, thunkAPI) => {
        thunkAPI.dispatch(changeAppStatus("loading"))
        try {
            const res = await authApi.login(data)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(changeAppStatus("succeed"))
                return {isLoggedIn: true}
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
            }
        } catch (err) {
            const error: AxiosError = err
            handleServerNetworkError(err, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: []})
        }
    });

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, {dispatch}) => {
        dispatch(changeAppStatus("loading"))
        try {
            const res = await authApi.logout()
            if (res.data.resultCode === 0) {
                dispatch(changeAppStatus('succeed'))
                return {isLoggedIn: false}
            } else {
                handleServerAppError(res.data, dispatch)
                return {isLoggedIn: true}
            }
        } catch (error) {
            handleServerNetworkError(error.message, dispatch)
            return {isLoggedIn: true}
        }
    });

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(asyncAppActions.initializedApp.fulfilled,
                (state,action) => {
                    state.isLoggedIn = action.payload.status
                })
            .addCase(login.fulfilled,
                (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn
                })
            .addCase(logout.fulfilled,
                (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn
                })
    }
});

/*export const {setIsLoggedInAC} = authSlice.actions*/
export const asyncAuthActions = {login, logout}
export const authReducer = authSlice.reducer
export type AuthActionsType = typeof authSlice.actions
