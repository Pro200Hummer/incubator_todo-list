import {TaskStateType, TaskType} from '../App';
import {v1} from "uuid";


export type RemoveTaskActionCreator = {
    type: "REMOVE-TASK"
    taskID: string
    todoListID: string
}
export type AddTaskActionCreator = {
    type: "ADD-TASK"
    title: string
    todoListID: string
}
export type ChangeTaskStatusActionCreator = {
    type: "CHANGE-TASK-STATUS"
    taskID: string
    isDone: boolean
    todoListID: string
}

export type ActionType = RemoveTaskActionCreator
    | AddTaskActionCreator
    | ChangeTaskStatusActionCreator


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
            const task: TaskType | undefined = state[action.todoListID].find(t => t.id === action.taskID)
            if (task) {
                task.isDone = action.isDone
            }
            return {...state}
        default:
            return state
    }
}


export const removeTaskAC = (taskID: string, todoListID: string): RemoveTaskActionCreator => {
    return {type: "REMOVE-TASK", taskID, todoListID}
}
export const addTaskAC = (title: string, todoListID: string): AddTaskActionCreator => {
    return {type: "ADD-TASK", title, todoListID}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todoListID: string): ChangeTaskStatusActionCreator => {
    return {type: "CHANGE-TASK-STATUS", taskID, isDone, todoListID}
}