import {authApi} from "../api/auth-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerAppError, handleServerNetworkError} from "../utils/app-utils";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeed' | 'failed';
export type ModalStatusType = 'no-status' | 'add-list' | 'add-task';

export type ModalType = {
    isOpen: boolean
    modalStatus: ModalStatusType
    modalTitle: string | null
    itemID?: string
}

export type AppReducerStateType = {
    status: RequestStatusType
    error: string | null,
    isInitialized: boolean
    modal: ModalType
}

const initialState: AppReducerStateType = {
    status: 'idle',
    error: null,
    isInitialized: false,
    modal: {
        isOpen: true,
        modalTitle: 'title',
        modalStatus: 'no-status',
        itemID: 'a06d9807-03c2-484c-a192-010e89981528',
    }
}

export const initializedApp = createAsyncThunk(
    'app/initializedApp',
    async (_, {dispatch}) => {
        dispatch(appSlice.actions.changeAppStatus("loading"))
        try {
            await authApi.me()
                .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(setIsLoggedInAC(true))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                    dispatch(appSlice.actions.setIsInitialized(true))
                })
        } catch (err) {
            handleServerNetworkError(err, dispatch)
        }
        dispatch(appSlice.actions.changeAppStatus("succeed"))
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
        setIsInitialized: (state, action: PayloadAction<boolean>) => {
            state.isInitialized = action.payload
        },
        setModalStatus: (state, action: PayloadAction<ModalType>) => {
            state.modal = action.payload
        },
    },
});

export const {changeAppStatus, setError, setIsInitialized, setModalStatus} = appSlice.actions
export default appSlice.reducer



