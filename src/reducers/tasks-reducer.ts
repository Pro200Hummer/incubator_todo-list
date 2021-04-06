import {TaskStateType} from '../App';


export type RemoveTaskActionCreator = {
    type: "REMOVE-TASK"
    taskID: string
    todoListID: string
}

export type ActionType = RemoveTaskActionCreator


export const tasksReducer = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type){
        case "REMOVE-TASK":
            const todoListTasks = state[action.todoListID]
            state[action.todoListID] = todoListTasks.filter(task => task.id !== action.taskID)
            return {...state}
    }
}


export const removeTaskAC = (taskID: string, todoListID: string):RemoveTaskActionCreator => {
    return {type: "REMOVE-TASK", taskID, todoListID}
}