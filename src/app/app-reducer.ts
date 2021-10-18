import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerAppError, handleServerNetworkError} from "../utils/app-utils";
import {authApi} from "../api/todo-list-api";
import {AppReducerStateType, ModalType, RequestStatusType} from "./app-types";

const initialState: AppReducerStateType = {
    status: 'idle',
    error: null,
    isInitialized: false,
    modal: {
        isOpen: false,
        modalTitle: '',
        modalStatus: 'no-status',
        itemID: '',
    }
}

export const initializedApp = createAsyncThunk(
    'app/initializedApp',
    async (_, {dispatch}) => {
        dispatch(changeAppStatus("loading"))
        try {
            const res = await authApi.me()
            if (res.data.resultCode === 0) {
                dispatch(changeAppStatus("succeed"))
                return {status: true}
            } else {
                handleServerAppError(res.data, dispatch)
                return {status: false}
            }
        } catch (err) {
            handleServerNetworkError(err, dispatch)
            return {status: false}
        }
    }
);

export const appSlice = createSlice({
    name: 'app',
    initialState,
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

export type AppActionsType = typeof appSlice.actions



