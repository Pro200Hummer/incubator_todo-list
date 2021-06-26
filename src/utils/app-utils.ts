import {changeAppStatusAC, setErrorAC} from "../app/app-reducer";
import {ResponseType} from '../api/todo-list-api'
import {Dispatch} from "redux";

export const handleServerNetworkError = (errorMessage: string | null, dispatch: Dispatch) => {
    dispatch(setErrorAC(errorMessage))
    dispatch(changeAppStatusAC("succeed"))
}

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages) {
        dispatch(setErrorAC(data.messages[0]))
    } else {
        dispatch(setErrorAC("Some error occurred"))
    }
    dispatch(changeAppStatusAC("succeed"))
}