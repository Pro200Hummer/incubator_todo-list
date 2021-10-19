import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerAppError, handleServerNetworkError} from "../utils/app-utils";
import {authApi} from "../api/todo-list-api";
import {AppReducerStateType, ModalType, RequestStatusType} from "./app-types";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";

export const initializedApp = createAsyncThunk('app/initializedApp', async (_, thunkAPI) => {
        thunkAPI.dispatch(changeAppStatus("loading"))
        try {
            const res = await authApi.me()
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(changeAppStatus("succeed"))
                return thunkAPI.dispatch(setIsLoggedInAC(true))
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
                return thunkAPI.dispatch(setIsLoggedInAC(false))
            }
        } catch (err) {
            handleServerNetworkError(err, thunkAPI.dispatch)
            return thunkAPI.dispatch(setIsLoggedInAC(false))
        }
    });

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle',
        error: null,
        isInitialized: false,
        modal: {
            isOpen: false,
            modalTitle: '',
            modalStatus: 'no-status',
            itemID: '',
        }
    } as AppReducerStateType,
    reducers: {
        changeAppStatus: (state, action: PayloadAction<RequestStatusType>) => {
            state.status = action.payload
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },
        setModalStatus: (state, action: PayloadAction<ModalType>) => {
            state.modal = action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(initializedApp.fulfilled, (state) => {
                state.isInitialized = true
            })
    }
});

export const asyncAppActions = {initializedApp}
export const {changeAppStatus, setError, setModalStatus} = appSlice.actions
export const appReducer = appSlice.reducer



