import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolist-reducer";

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
    title: string
    todoListID: string
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

export type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType


export const tasksReducer = (state = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            const todoListTasks = state[action.todoListID]
            state[action.todoListID] = todoListTasks.filter(task => task.id !== action.taskID)
            return {...state}
        case "ADD-TASK":
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.New,
                todoListId: action.todoListID,
                order: 0,
                priority: TodoTaskPriority.Low,
                startDate: "",
                deadline: "",
                addedDate: "",
                description: ""
            }
            const allTodoListTasks = state[action.todoListID]
            state[action.todoListID] = [newTask, ...allTodoListTasks]
            return {...state}
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
            return {...state, [action.todoListID]: []}
        case "REMOVE_TODOLIST":
            delete state[action.todoListID]
            return {...state}
        default:
            return state
    }
}


export const removeTaskAC = (taskID: string, todoListID: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskID, todoListID}
}
export const addTaskAC = (title: string, todoListID: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todoListID}
}
export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todoListID: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", taskID, status, todoListID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskID, title, todoListID}
}