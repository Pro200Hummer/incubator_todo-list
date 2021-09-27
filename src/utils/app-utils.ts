import {ResponseType} from '../api/todo-list-api'
import {Dispatch} from "redux";
import {changeAppStatus, setError} from "../app/app-reducer";

export const handleServerNetworkError = (errorMessage: string | null, dispatch: Dispatch) => {
    dispatch(setError(errorMessage))
    dispatch(changeAppStatus("succeed"))
}

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages) {
        dispatch(setError(data.messages[0]))
    } else {
        dispatch(setError("Some error occurred"))
    }
    dispatch(changeAppStatus("succeed"))
}