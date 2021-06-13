import {AddTodoListActionType, RemoveTodoListActionType, SetTodoListsActionType} from "./todolist-reducer";
import {todoListApi} from "../api/Todo-list-api";
import {AppRootStateType, AppThunkType} from "./store";

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

export type TaskStateType = {
    [key: string]: TaskType[]
};

const initialState: TaskStateType = {}

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskID: string
    todoListID: string
}
export type AddTaskActionType = {
    type: "ADD-TASK"
    task: TaskType
}
export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    taskID: string
    status: TaskStatuses
    todoListID: string
}
export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    taskID: string
    title: string
    todoListID: string
}
export type SetTasksActionType = {
    type: "SET_TASKS"
    tasks: TaskType[]
    todoListID: string
}

export type TasksActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType
    | SetTodoListsActionType
    | SetTasksActionType


export const tasksReducer = (state = initialState, action: TasksActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            const todoListTasks = state[action.todoListID]
            state[action.todoListID] = todoListTasks.filter(task => task.id !== action.taskID)
            return {...state}
        case "ADD-TASK":
            const copy = {...state}
            const tasks = copy[action.task.todoListId]
            const newTasks = [action.task, ...tasks]
            copy[action.task.todoListId] = newTasks
            return copy
        case "CHANGE-TASK-STATUS":
            const taskForChangeStatus: TaskType | undefined = state[action.todoListID].find(t => t.id === action.taskID)
            if (taskForChangeStatus) {
                taskForChangeStatus.status = action.status
            }
            return {
                ...state, [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ?
                    {...t, status: action.status} : t)
            }
        case "CHANGE-TASK-TITLE":
            const taskForChangeTitle: TaskType | undefined = state[action.todoListID].find(t => t.id === action.taskID)
            if (taskForChangeTitle) {
                taskForChangeTitle.title = action.title
            }
            return {
                ...state, [action.todoListID]: state[action.todoListID].map(t => t.id === action.taskID ?
                    {...t, title: action.title} : t)
            }
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
            const copyState = {...state}
            copyState[action.todoListID] = action.tasks
            return copyState
        default:
            return state
    }
}


export const removeTaskAC = (todoListID: string, taskID: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", todoListID, taskID}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: "ADD-TASK", task}
}
export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todoListID: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", taskID, status, todoListID}
}
export const changeTaskTitleAC = (todoListID: string, taskID: string, title: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", todoListID, taskID, title}
}
export const setTasksAC = (tasks: TaskType[], todoListID: string): SetTasksActionType => {
    return {
        type: "SET_TASKS",
        tasks,
        todoListID
    }
}

/* Thunk for tasks-reducer */
export const fetchTasksTC = (todoListID: string): AppThunkType => async dispatch => {
    try {
        const res = await todoListApi.getTasks(todoListID)
        const tasks = res.data.items
        dispatch(setTasksAC(tasks, todoListID))
    } catch (e) {
        throw new Error(e)
    }

}
export const removeTaskTC = (todoListID: string, taskID: string): AppThunkType => async dispatch => {
    try {
        const res = await todoListApi.deleteTask(todoListID, taskID)
        dispatch(removeTaskAC(todoListID, taskID))
    } catch (e) {
        throw new Error(e)
    }

}
export const addTaskTC = (todoListID: string, taskTitle: string): AppThunkType => async dispatch => {
    try {
        const res = await todoListApi.createTask(todoListID, taskTitle)
        const task = res.data.data.item
        dispatch(addTaskAC(task))
    } catch (e) {
        throw new Error(e)
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
        }
    }
export const changeTaskTitleTC = (todoListID: string, taskID: string, taskTitle: string): AppThunkType =>
    async dispatch => {
        try {
            const res = await todoListApi.updateTask(todoListID, taskID, {title: taskTitle})
            dispatch(changeTaskTitleAC(todoListID, taskID, taskTitle))
        } catch (e) {
            throw new Error(e)
        }
    }