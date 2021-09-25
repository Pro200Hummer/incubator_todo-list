import {AppThunkType} from "./store";
import {authApi} from "../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/app-utils";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeed' | 'failed';

export type AppReducerActionTypes =
    | ReturnType<typeof changeAppStatus>
    | ReturnType<typeof setError>
    | ReturnType<typeof setIsInitialized>

export type AppReducerStateType = typeof initialState;

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false as boolean
};

export const changeAppStatus = (status: RequestStatusType) => ({type: "APP/SET_STATUS", status} as const);
export const setError = (error: string | null) => ({type: "APP/SET_ERROR", error} as const)
export const setIsInitialized = (initializedStatus: boolean) => ({
    type: "APP/SET_INITIALIZED",
    initializedStatus
} as const)

export const appReducer = (state = initialState, action: AppReducerActionTypes): AppReducerStateType => {
    switch (action.type) {
        case "APP/SET_STATUS":
            return {...state, status: action.status}
        case "APP/SET_ERROR":
            return {...state, error: action.error}
        case "APP/SET_INITIALIZED":
            return {...state, isInitialized: action.initializedStatus}
        default:
            return state
    }
};

export const initializedApp = (): AppThunkType => async dispatch => {
    try {
        authApi.me()
            .then(res => {
                if(res.data.resultCode === 0){
                    dispatch(setIsLoggedInAC(true))
                }else{
                    handleServerAppError(res.data, dispatch)
                }
                dispatch(setIsInitialized(true))
            })
    } catch (error) {
        handleServerNetworkError(error.message, dispatch)
    }
}




