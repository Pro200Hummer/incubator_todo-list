import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox} from '@material-ui/core';
import EditableSpan from '../../../components/EditableSpan/EditableSpan';
import IconButton from '@material-ui/core/IconButton';
import {Delete} from '@material-ui/icons';
import {TaskStatuses, TaskType} from "./tasks-reducer";


export type TaskPropsType = {
    task: TaskType
    changeTaskTitle: (taskID: string, title: string) => void;
    changeTaskStatus: (taskID: string, status: TaskStatuses) => void;
    deleteTask: (taskID: string) => void;
}

export const Task: React.FC<TaskPropsType> = React.memo(props => {
    console.log("task")
    const {
        task,
        deleteTask,
        changeTaskStatus,
        changeTaskTitle
    } = props

    const removeTask = useCallback(() => {
        deleteTask(task.id)
    }, [deleteTask, task.id])

    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const taskStatus = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        changeTaskStatus(task.id, taskStatus);
    }, [changeTaskStatus, task.id])

    const changeTitle = useCallback((title: string) => {
        changeTaskTitle(task.id, title)
    }, [changeTaskTitle, task.id])


    return (
        <li className={ task.status === TaskStatuses.Completed ? "is-done" : "" }>
            <Checkbox
                color={ "secondary" }
                onChange={ changeStatus }
                checked={ task.status === TaskStatuses.Completed }
            />
            <EditableSpan title={ task.title } changeItem={ changeTitle }/>
            <IconButton onClick={ removeTask }>
                <Delete/>
            </IconButton>

        </li>
    )
});
