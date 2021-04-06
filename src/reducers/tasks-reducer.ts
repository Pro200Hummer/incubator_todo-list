import {TaskStateType, TaskType} from '../App';
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolist-reducer";


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
    isDone: boolean
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


export const tasksReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            const todoListTasks = state[action.todoListID]
            state[action.todoListID] = todoListTasks.filter(task => task.id !== action.taskID)
            return {...state}
        case "ADD-TASK":
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false,
            }
            const allTodoListTasks = state[action.todoListID]
            state[action.todoListID] = [newTask, ...allTodoListTasks]
            return {...state}
        case "CHANGE-TASK-STATUS":
            const taskForChangeStatus: TaskType | undefined = state[action.todoListID].find(t => t.id === action.taskID)
            if (taskForChangeStatus) {
                taskForChangeStatus.isDone = action.isDone
            }
            return {...state}
        case "CHANGE-TASK-TITLE":
            const taskForChangeTitle: TaskType | undefined = state[action.todoListID].find(t => t.id === action.taskID)
            if (taskForChangeTitle) {
                taskForChangeTitle.title = action.title
            }
            return {...state}
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
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", taskID, isDone, todoListID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todoListID: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskID, title, todoListID}
}