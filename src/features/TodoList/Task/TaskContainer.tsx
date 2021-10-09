import React, {useCallback, useEffect} from "react";
import {Task} from "./Task";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../../app/hooks";
import {fetchTasks, removeTask, TaskStatuses, updateTask} from "./tasks-reducer";
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
    }, [dispatch, props.todoListID])

    let taskForTodoList = allTasks[props.todoListID];
    if (props.filter === "active") {
        taskForTodoList = taskForTodoList.filter(t => !t.status)
    }
    if (props.filter === "completed") {
        taskForTodoList = taskForTodoList.filter(t => t.status)
    }

    const removeTaskCallback = useCallback((taskID: string) => {
        dispatch(removeTask({todoListID: props.todoListID, taskID}))
    }, [dispatch, props.todoListID])

    const changeStatusCallback = useCallback((taskID: string, status: TaskStatuses) => {
        dispatch(updateTask({todoListID: props.todoListID, taskID, model:{status}}))
    }, [dispatch, props.todoListID])

    const changeTaskTitleCallback = useCallback((taskID: string, taskTitle: string) => {
        dispatch(updateTask({todoListID: props.todoListID, taskID, model: {title: taskTitle}}))
    }, [dispatch, props.todoListID])

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