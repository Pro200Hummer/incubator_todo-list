import {
    addTodoListAC,
    AddTodoListActionType,
    RemoveTodoListActionType,
    SetTodoListsActionType
} from "./todolist-reducer";
import {TaskStatuses, TaskType, todoListApi} from "../api/Todo-list-api";
import {AppRootStateType, AppThunkType} from "./store";
import {changeAppStatusAC, setErrorAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/app-utils";

const initialState: TaskStateType = {}

/* Tasks reducer */
export const tasksReducer = (state = initialState, action: TasksActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {...state, [action.todoListID]: state[action.todoListID].filter(task =>
                    task.id !== action.taskID)}
        case "ADD-TASK":
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case "CHANGE-TASK-STATUS":
            return {...state, [action.todoListID]: state[action.todoListID]
                    .map(t => t.id === action.taskID ? {...t, status: action.status} : t)}
        case "CHANGE-TASK-TITLE":
            return {...state, [action.todoListID]: state[action.todoListID]
                    .map(t => t.id === action.taskID ? {...t, title: action.title} : t)}
        case "ADD_TODOLIST":
            return {...state, [action.todoList.id]: []}
        case "REMOVE_TODOLIST":
            delete state[action.todoListID]
            return {...state}
        case "SET_TODO_LISTS":
            const stateCopy = {...state}
            action.todoLists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        case "SET_TASKS":
            return {...state, [action.todoListID]: action.tasks}
        default:
            return state
    }
}

/* Actions */
export const removeTaskAC = (todoListID: string, taskID: string) =>
    ({type: "REMOVE-TASK", todoListID, taskID} as const)

export const addTaskAC = (task: TaskType) =>
    ({type: "ADD-TASK", task} as const)

export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todoListID: string) =>
    ({type: "CHANGE-TASK-STATUS", taskID, status, todoListID} as const)

export const changeTaskTitleAC = (todoListID: string, taskID: string, title: string) =>
    ({type: "CHANGE-TASK-TITLE", todoListID, taskID, title} as const)

export const setTasksAC = (tasks: TaskType[], todoListID: string) =>
    ({type: "SET_TASKS", tasks, todoListID} as const)


/* Thunks */
export const fetchTasksTC = (todoListID: string): AppThunkType => async dispatch => {
    dispatch(changeAppStatusAC("loading"))
    try {
        const res = await todoListApi.getTasks(todoListID)
        const tasks = res.data.items
        dispatch(setTasksAC(tasks, todoListID))
        dispatch(changeAppStatusAC("succeed"))
    } catch (error) {
        handleServerNetworkError(error.message, dispatch)
    }

}
export const removeTaskTC = (todoListID: string, taskID: string): AppThunkType => async dispatch => {
    dispatch(changeAppStatusAC("loading"))
    try {
        const res = await todoListApi.deleteTask(todoListID, taskID)
        dispatch(removeTaskAC(todoListID, taskID))
        dispatch(changeAppStatusAC("succeed"))
    } catch (error) {
        handleServerNetworkError(error.message, dispatch)
    }

}
export const addTaskTC = (todoListID: string, taskTitle: string): AppThunkType => async dispatch => {
    dispatch(changeAppStatusAC("loading"))
    try {
        const res = await todoListApi.createTask(todoListID, taskTitle)
        const task = res.data.data.item
        if(res.data.resultCode === 0){
            dispatch(addTaskAC(task))
        }else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error.message, dispatch)
    }

}
export const changeTaskStatusTC = (todoListID: string, taskID: string, status: TaskStatuses): AppThunkType =>
    (dispatch,
     getState: () => AppRootStateType) => {
        const allTasks = getState().tasks
        const tasksForCurrentTodoList = allTasks[todoListID]
        const task = tasksForCurrentTodoList.find(t => {
            return t.id === taskID
        })
        if (task) {
            todoListApi.updateTask(todoListID, taskID, {
                title: task.title,
                description: task.deadline,
                status: status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
            })
                .then(() => {
                    dispatch(changeTaskStatusAC(taskID, status, todoListID))
                })
                .catch(error => {
                    handleServerNetworkError(error.message, dispatch)
                })
        }
    }
export const changeTaskTitleTC = (todoListID: string, taskID: string, taskTitle: string): AppThunkType => async dispatch => {
        try {
            const res = await todoListApi.updateTask(todoListID, taskID, {title: taskTitle})
            dispatch(changeTaskTitleAC(todoListID, taskID, taskTitle))
        } catch (error) {
            handleServerNetworkError(error.message, dispatch)
        }
    }

/* Types */
export type TaskStateType = {
    [key: string]: TaskType[]
};

export type TasksActionType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof setTasksAC>
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodoListsActionType
