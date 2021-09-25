import {AppThunkType} from "../../app/store";
import {authApi, LoginParamsType} from "../../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/app-utils";
import {changeAppStatus} from "../../app/app-reducer";

export type AuthReducerStateType = typeof initialState

export type AuthReducerActionsType =
    |ReturnType<typeof setIsLoggedInAC>
const initialState = {
    isLoggedIn: false as boolean
}

export const setIsLoggedInAC = (loginStatus: boolean) => ({type: "AUTH/SET_IS_LOGGED_IN", loginStatus} as const)

export const authReducer = (state = initialState, action: AuthReducerActionsType): AuthReducerStateType => {
    switch (action.type) {
        case "AUTH/SET_IS_LOGGED_IN":
            return {...state, isLoggedIn: action.loginStatus}
        default:
            return state
    }
}

export const setIsLoggedInTC = (data: LoginParamsType): AppThunkType => async dispatch => {
    dispatch(changeAppStatus("loading"))
    try {
        authApi.login(data)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
    } catch (error) {
        handleServerNetworkError(error.message, dispatch)
    }
    dispatch(changeAppStatus("succeed"))
}

export const removeLoginTC = (): AppThunkType => async dispatch => {
    dispatch(changeAppStatus("loading"))
    try {
        authApi.logout()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(false))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
    } catch (error) {
        handleServerNetworkError(error.message, dispatch)
    }
    dispatch(changeAppStatus("succeed"))
}