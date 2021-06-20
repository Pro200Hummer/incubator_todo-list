import React, {useCallback, useEffect} from "react";
import Task from "./Task";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {
    changeTaskStatusTC,
    changeTaskTitleTC,
    fetchTasksTC,
    removeTaskTC,
    TaskStateType
} from "../../reducers/tasks-reducer";
import {FilterValuesType, TaskStatuses} from "../../api/Todo-list-api";
import CircularProgress from "@material-ui/core/CircularProgress";
import {AppReducerStateType} from "../../reducers/app-reducer";

type TaskContainerPropsType = {
    todoListID: string
    filter: FilterValuesType
}

const TaskContainer: React.FC<TaskContainerPropsType> = (props) => {

    const {appStatus} = useSelector<AppRootStateType, AppReducerStateType>((state) => state.appAspects)
    const allTasks = useSelector<AppRootStateType, TaskStateType>((state) => state.tasks)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.todoListID))
    }, [])

    let taskForTodoList = allTasks[props.todoListID];
    if (props.filter === "active") {
        taskForTodoList = taskForTodoList.filter(t => !t.status)
    }
    if (props.filter === "completed") {
        taskForTodoList = taskForTodoList.filter(t => t.status)
    }

    const removeTask = useCallback((taskID: string) => {
        dispatch(removeTaskTC(props.todoListID, taskID))
    }, [dispatch])

    const changeStatus = useCallback((taskID: string, status: TaskStatuses) => {
        dispatch(changeTaskStatusTC(props.todoListID, taskID, status))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, taskTitle: string) => {
        dispatch(changeTaskTitleTC(props.todoListID, taskID, taskTitle))
    }, [dispatch])

    const tasks = taskForTodoList.map(taskObj => {
        return (
            <Task
                key={ taskObj.id }
                task={ taskObj }
                changeTaskTitle={ changeTaskTitle }
                changeTaskStatus={ changeStatus }
                deleteTask={ removeTask }
            />
        )
    });

    return (
        <>
            {appStatus === 'loading' ? <CircularProgress className="preloader-position" color="secondary"/> : tasks}
        </>
    )
}
export default TaskContainer