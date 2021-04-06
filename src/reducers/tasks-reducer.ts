import {TaskStateType, TaskType} from '../App';
import {v1} from "uuid";


export type RemoveTaskActionCreator = {
    type: "REMOVE-TASK"
    taskID: string
    todoListID: string
}

export type AddTaskActionCreator ={
    type: "ADD-TASK"
    title: string
    todoListID: string
}

export type ActionType = RemoveTaskActionCreator
|AddTaskActionCreator


export const tasksReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type){
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
        default:
            return state
    }
}


export const removeTaskAC = (taskID: string, todoListID: string):RemoveTaskActionCreator => {
    return {type: "REMOVE-TASK", taskID, todoListID}
}
export const addTaskAC = (title: string, todoListID: string):AddTaskActionCreator => {
    return {type:"ADD-TASK", title, todoListID}
}