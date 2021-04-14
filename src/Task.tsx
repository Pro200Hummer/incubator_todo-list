import React, {ChangeEvent, useCallback} from "react";
import {Checkbox} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";

export type TaskPropsType = {
    task: TaskType
    id: string
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void;
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void;
    deleteTask: (taskID: string, todoListID: string) => void;
}

const Task: React.FC<TaskPropsType> = React.memo(props => {

    const {
        task,
        id,
        deleteTask,
        changeTaskStatus,
        changeTaskTitle
    } = props

    const removeTask = useCallback(() => {
        deleteTask(task.id, id)
    }, [task.id, id])

    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id, e.currentTarget.checked, id);
    }, [task.id, id])

    const changeTitle = useCallback((title: string) => {
        changeTaskTitle(task.id, title, id)
    }, [task.id, id])

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