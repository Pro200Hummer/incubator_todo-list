import {FilterValuesType} from "../App";
import {v1} from "uuid";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
};

const initialState: TodoListType[] = [];

export type RemoveTodoListActionType = {
    type: "REMOVE_TODOLIST",
    todoListID: string,
}
export type AddTodoListActionType = {
    type: "ADD_TODOLIST",
    title: string,
    todoListID: string
}
export type ChangeFilterActionType = {
    type: "CHANGE_TODOLIST_FILTER",
    filterValue: FilterValuesType
    todoListID: string,
}
export type ChangeTodoListTitleActionType = {
    type: "CHANGE_TODOLIST_TITLE",
    title: string,
    todoListID: string,
}

export type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeFilterActionType
    | ChangeTodoListTitleActionType;

export const todoListReducer = (state = initialState, action: ActionType): TodoListType[] => {
    switch (action.type) {
        case "ADD_TODOLIST": {
            const newTodoListID = action.todoListID;
            const newTodoList: TodoListType = {
                id: newTodoListID, title: action.title, filter: "all",
            }
            return [...state, newTodoList]
        }
        case "REMOVE_TODOLIST": {
            return state.filter(tl => tl.id !== action.todoListID)
        }
        case "CHANGE_TODOLIST_FILTER": {
            return state.map(tl => {
                if (tl.id === action.todoListID) {
                    return {...tl, filter: action.filterValue}
                } else {
                    return tl
                }
            })
            return state
        }
        case "CHANGE_TODOLIST_TITLE": {
            return state.map(tl => {
                if (tl.id === action.todoListID) {
                    return {...tl, title: action.title}
                } else {
                    return tl
                }
            })
            return state
        }
        default:
            return state
    }
}

export const addTodoListAC = (title: string): AddTodoListActionType => {
    return {type: "ADD_TODOLIST", title, todoListID: v1()}
}
export const removeTodoListAC = (todoListID: string): RemoveTodoListActionType => {
    return {type: "REMOVE_TODOLIST", todoListID}
}
export const changeTodoListFilterAC = (filterValue: FilterValuesType, todoListID: string): ChangeFilterActionType => {
    return {type: "CHANGE_TODOLIST_FILTER", filterValue, todoListID}
}
export const changeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTitleActionType => {
    return {type: "CHANGE_TODOLIST_TITLE", title, todoListID}
}
