import React, {ChangeEvent, useCallback} from "react";
import {Checkbox} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";

export type TaskPropsType = {
    task: TaskType
    changeTaskTitle: (taskID: string, title: string) => void;
    changeTaskStatus: (taskID: string, isDone: boolean) => void;
    deleteTask: (taskID: string) => void;
}

const Task: React.FC<TaskPropsType> = React.memo(props => {

    const {
        task,
        deleteTask,
        changeTaskStatus,
        changeTaskTitle
    } = props

    const removeTask = useCallback(() => {
        deleteTask(task.id)
    }, [task.id])

    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id, e.currentTarget.checked);
    }, [task.id])

    const changeTitle = useCallback((title: string) => {
        changeTaskTitle(task.id, title)
    }, [task.id])

    return (
        <li className={ task.isDone ? "is-done" : "" }>
            <Checkbox
                color={ "secondary" }
                onChange={ changeStatus }
                checked={ task.isDone }
            />
            <EditableSpan title={ task.title } changeItem={ changeTitle }/>
            <IconButton onClick={ removeTask }>
                <Delete/>
            </IconButton>
        </li>
    )
})

export default Task