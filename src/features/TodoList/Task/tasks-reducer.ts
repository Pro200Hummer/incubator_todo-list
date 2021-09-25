import {
    AddTodoListActionType,
    RemoveTodoListActionType,
    SetTodoListsActionType
} from "../todolist-reducer";
import {todoListApi} from "../../../api/todo-list-api";
import {AppRootStateType, AppThunkType} from "../../../app/store";
import {changeAppStatus} from "../../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/app-utils";

export type TaskStateType = {
    [key: string]: TaskType[]
};

export type TaskType = {
    id: string,
    title: string,
    description: null | string,
    todoListId: string,
    order: number,
    status: TaskStatuses,
    priority: TodoTaskPriority,
    startDate: string,
    deadline: string,
    addedDate: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TodoTaskPriority {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TasksActionType =
    | ReturnType<typeof addTask>
    | ReturnType<typeof removeTask>
    | ReturnType<typeof changeTaskStatus>
    | ReturnType<typeof changeTaskTitle>
    | ReturnType<typeof setTasks>
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodoListsActionType

const initialState: TaskStateType = {}

export const removeTask = (todoListID: string, taskID: string) =>
    ({type: "REMOVE-TASK", todoListID, taskID} as const)

export const addTask = (task: TaskType) =>
    ({type: "ADD-TASK", task} as const)

export const changeTaskStatus = (taskID: string, status: TaskStatuses, todoListID: string) =>
    ({type: "CHANGE-TASK-STATUS", taskID, status, todoListID} as const)

export const changeTaskTitle = (todoListID: string, taskID: string, title: string) =>
    ({type: "CHANGE-TASK-TITLE", todoListID, taskID, title} as const)

export const setTasks = (tasks: TaskType[], todoListID: string) =>
    ({type: "SET_TASKS", tasks, todoListID} as const)

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
};

export const fetchTasks = (todoListID: string): AppThunkType => async dispatch => {
    dispatch(changeAppStatus("loading"))
    try {
        const res = await todoListApi.getTasks(todoListID)
        const tasks = res.data.items
        dispatch(setTasks(tasks, todoListID))
        dispatch(changeAppStatus("succeed"))
    } catch (error) {
        handleServerNetworkError(error.message, dispatch)
    }

}
export const removeTaskTC = (todoListID: string, taskID: string): AppThunkType => async dispatch => {
    dispatch(changeAppStatus("loading"))
    try {
        await todoListApi.deleteTask(todoListID, taskID)
        dispatch(removeTask(todoListID, taskID))
        dispatch(changeAppStatus("succeed"))
    } catch (error) {
        handleServerNetworkError(error.message, dispatch)
    }

}
export const addTaskTC = (todoListID: string, taskTitle: string): AppThunkType => async dispatch => {
    dispatch(changeAppStatus("loading"))
    try {
        const res = await todoListApi.createTask(todoListID, taskTitle)
        const task = res.data.data.item
        if(res.data.resultCode === 0){
            dispatch(addTask(task))
        }else {
            handleServerAppError(res.data, dispatch)
        }
        dispatch(changeAppStatus("succeed"))
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
                    dispatch(changeTaskStatus(taskID, status, todoListID))
                })
                .catch(error => {
                    handleServerNetworkError(error.message, dispatch)
                })
        }
    }
export const changeTaskTitleTC = (todoListID: string, taskID: string, taskTitle: string): AppThunkType => async dispatch => {
        try {
            await todoListApi.updateTask(todoListID, taskID, {title: taskTitle})
            dispatch(changeTaskTitle(todoListID, taskID, taskTitle))
        } catch (error) {
            handleServerNetworkError(error.message, dispatch)
        }
    }
