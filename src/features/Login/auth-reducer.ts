import {AppThunkType} from "../../app/store";
import {authApi, LoginParamsType} from "../../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/app-utils";
import {changeAppStatusAC} from "../../app/app-reducer";

const initialState = {
    isLoggedIn: false
}

/* Reducer */
export const authReducer = (state = initialState, action: AuthReducerActionsType): AuthReducerStateType => {
    switch (action.type) {
        case "AUTH/SET_IS_LOGGED_IN":
            return {...state, isLoggedIn: action.loginStatus}
        default:
            return state
    }
}


/* Action Creators */
export const setIsLoggedInAC = (loginStatus: boolean) => ({type: "AUTH/SET_IS_LOGGED_IN", loginStatus} as const)

/* Thunks */
export const setIsLoggedInTC = (data: LoginParamsType): AppThunkType => async dispatch => {
    dispatch(changeAppStatusAC("loading"))
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
    dispatch(changeAppStatusAC("succeed"))
}

/* Types */

export type AuthReducerStateType = typeof initialState

export type AuthReducerActionsType =
    |ReturnType<typeof setIsLoggedInAC>