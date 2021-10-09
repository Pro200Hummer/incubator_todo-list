import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {handleServerAppError, handleServerNetworkError} from "../utils/app-utils";
import {authApi} from "../api/todo-list-api";

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
            await authApi.me()
                .then(res => {
                    if (res.data.resultCode === 0) {
                        /*dispatch(setIsLoggedInAC(true))*/
                        dispatch(setIsInitialized(true))
                        return
                    } else {
                       return  handleServerAppError(res.data, dispatch)
                    }
                })
        } catch (err) {
            return handleServerNetworkError(err, dispatch)
        }
        dispatch(changeAppStatus("succeed"))
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
    }
});

export const asyncAppActions = {initializedApp}
export const {changeAppStatus, setError, setIsInitialized, setModalStatus} = appSlice.actions
export default appSlice.reducer



