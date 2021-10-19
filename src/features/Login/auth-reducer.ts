import {handleServerAppError, handleServerNetworkError} from "../../utils/app-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {changeAppStatus} from "../../app/app-reducer";
import {LoginParamsType} from "../../api/api-types";
import {authApi} from "../../api/todo-list-api";
import {AxiosError} from "axios";
import {ThunkError} from "../../app/store";

export type AuthInitialStateType = {
    isLoggedIn: boolean
}

export const login = createAsyncThunk<undefined, LoginParamsType, ThunkError>('auth/login', async (data: LoginParamsType, thunkAPI) => {
        thunkAPI.dispatch(changeAppStatus("loading"))
        try {
            const res = await authApi.login(data)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(changeAppStatus("succeed"))
                return;
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

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
        thunkAPI.dispatch(changeAppStatus("loading"))
        try {
            const res = await authApi.logout()
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(changeAppStatus('succeed'))
                return;
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue({})
            }
        } catch (error) {
            handleServerNetworkError(error.message, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({})
        }
    });

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    } as AuthInitialStateType,
    reducers: {
        setIsLoggedInAC: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        }
    },
    extraReducers: builder => {
        builder
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

export const {setIsLoggedInAC} = authSlice.actions
export const asyncAuthActions = {login, logout}
export const authReducer = authSlice.reducer