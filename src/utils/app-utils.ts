import {changeAppStatusAC, setErrorAC} from "../app/app-reducer";
import {ResponseType} from '../api/Todo-list-api'
import {Dispatch} from "redux";

export const handleServerNetworkError = (errorMessage: string | null, dispatch: Dispatch) => {
    dispatch(setErrorAC(errorMessage))
    dispatch(changeAppStatusAC("idle"))
}

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC("Some error occurred"))
    }
    dispatch(changeAppStatusAC("succeed"))
}