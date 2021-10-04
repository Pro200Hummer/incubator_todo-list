import {MouseEvent} from 'react';
import {ResponseType} from '../api/todo-list-api'
import {Dispatch} from "redux";
import {changeAppStatus, setError, setModalStatus} from "../app/app-reducer";

export const handleServerNetworkError = (errorMessage: string | null, dispatch: Dispatch) => {
    dispatch(setError(errorMessage))
    dispatch(changeAppStatus("succeed"))
};

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages) {
        dispatch(setError(data.messages[0]))
    } else {
        dispatch(setError("Some error occurred"))
    }
    dispatch(changeAppStatus("succeed"))
};

export const changeModalStatus = (e: MouseEvent<HTMLElement>, dispatch: Dispatch, itemID?: string) => {
    const trigger: string | undefined = e.currentTarget.dataset.button
    if(trigger === 'add-list'){
        dispatch(setModalStatus({
            isOpen: true,
            modalStatus:'add-list',
            modalTitle: 'Enter the name of the to-do list',
        }))
    }
    if(trigger === 'add-task'){
        dispatch(setModalStatus({
            isOpen: true,
            modalStatus:'add-task',
            modalTitle: 'Enter the task name',
            itemID,
        }))
    }
};