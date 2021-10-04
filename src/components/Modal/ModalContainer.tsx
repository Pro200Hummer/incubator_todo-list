import React, {FC, memo, useCallback} from 'react';
import {Dialog, Paper} from "@material-ui/core";
import {useAppSelector} from "../../app/hooks";
import {ModalWindow} from "./ModalWindow";
import {useDispatch} from "react-redux";
import {setModalStatus} from "../../app/app-reducer";
import {createTodoList} from "../../features/TodoList/todolist-reducer";
import {addTask} from "../../features/TodoList/Task/tasks-reducer";


export const ModalContainer: FC = memo(() => {

    const modal = useAppSelector((state) => state.app.modal)
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setModalStatus({modalStatus: "no-status", isOpen: false, modalTitle: null}))
    }

    const addTitleHandler = useCallback((title: string) => {
        if(modal.modalStatus === 'add-list'){
            dispatch(createTodoList(title))
        }
        if(modal.modalStatus === 'add-task'){
            if(modal.itemID)  dispatch(addTask({todoListID: modal.itemID, taskTitle: title}))
        }
    }, [dispatch])

    return (
        <>
            <Dialog
                open={modal.isOpen}
                onClose={handleClose}
            >
                <Paper>
                    <ModalWindow
                        title={modal.modalTitle && modal.modalTitle}
                        addTitle={addTitleHandler}
                    />
                </Paper>
            </Dialog>
        </>
    )
});