import {MouseEvent} from 'react';
import {Dispatch} from "redux";
import {ResponseType} from "../api/api-types";
import {changeAppStatus, setError, setModalStatus} from "../app/app-reducer";

export const handleServerNetworkError = (errorMessage: string | null, dispatch: Dispatch) => {
    console.log(errorMessage)
    dispatch(setError(errorMessage))
    dispatch(changeAppStatus("succeed"))
};

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    if (data.messages) {
        console.log(data.messages[0])
        dispatch(setError(data.messages[0]))
    } else {
        dispatch(setError("Some error occurred"))
    }
    dispatch(changeAppStatus("succeed"))
};

export const changeModalStatus = (e: MouseEvent<HTMLButtonElement>, dispatch: Dispatch, itemID?: string) => {
    const trigger: Attr | null = e.currentTarget.children[0].attributes.getNamedItem("data-action")
    if (trigger !== null) {
        if (trigger.value === 'add-list') {
            dispatch(setModalStatus({
                isOpen: true,
                modalStatus: 'add-list',
                modalTitle: 'Enter the name of the new to-do list',
            }))
        }
        if (trigger.value === 'add-task') {
            dispatch(setModalStatus({
                isOpen: true,
                modalStatus: 'add-task',
                modalTitle: 'Enter the new task name',
                itemID,
            }))
        }
    }
};