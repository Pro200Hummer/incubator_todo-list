import React, {useCallback, useEffect} from "react";
import {Task} from "./Task";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../app/hooks";
import {changeTaskStatus, changeTaskTitleTC, fetchTasks, removeTask, TaskStatuses} from "./tasks-reducer";
import {FilterValuesType} from "../todolist-reducer";

type TaskContainerPropsType = {
    todoListID: string
    filter: FilterValuesType
}

const TaskContainer: React.FC<TaskContainerPropsType> = (props) => {
    console.log("task container")
    /*const allTasks = useSelector<AppRootStateType, TaskStateType>((state) => state.tasks)*/
    const allTasks = useAppSelector((state) => state.tasks)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasks(props.todoListID))
    }, [])

    let taskForTodoList = allTasks[props.todoListID];
    if (props.filter === "active") {
        taskForTodoList = taskForTodoList.filter(t => !t.status)
    }
    if (props.filter === "completed") {
        taskForTodoList = taskForTodoList.filter(t => t.status)
    }

    const removeTaskCallback = useCallback((taskID: string) => {
        dispatch(removeTask({todoListID: props.todoListID, taskID}))
    }, [dispatch])

    const changeStatusCallback = useCallback((taskID: string, status: TaskStatuses) => {
        dispatch(changeTaskStatus({todoListID: props.todoListID, taskID, status}))
    }, [dispatch])

    const changeTaskTitleCallback = useCallback((taskID: string, taskTitle: string) => {
        dispatch(changeTaskTitleTC({todoListID: props.todoListID, taskID, taskTitle}))
    }, [dispatch])

    const tasks = taskForTodoList.map(taskObj => {
        return (
            <Task
                key={taskObj.id}
                task={taskObj}
                changeTaskTitle={changeTaskTitleCallback}
                changeTaskStatus={changeStatusCallback}
                deleteTask={removeTaskCallback}
            />
        )
    });

    return (
        <>
            {tasks}
        </>
    )
}
export default TaskContainer