import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodoListActionType = {
    type: "REMOVE_TODOLIST",
    id: string,
}
type AddTodoListActionType = {
    type: "ADD_TODOLIST",
    title: string,
}
type ChangeFilterActionType = {
    type: "CHANGE_TODOLIST_FILTER",
    filter: FilterValuesType
    id: string,
}
type ChangeTodoListTitleActionType = {
    type: "CHANGE_TODOLIST_TITLE",
    title: string,
    id: string,
}

export type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeFilterActionType
    | ChangeTodoListTitleActionType;

export const todoListReducer = (state: TodoListType[], action: ActionType): TodoListType[] => {
    switch (action.type) {
        case "ADD_TODOLIST": {
            const newTodoListID = v1();
            const newTodoList: TodoListType = {
                id: newTodoListID, title: action.title, filter: "all",
            }
            return [...state, newTodoList]
        }
        case "REMOVE_TODOLIST": {
            return state.filter(tl => tl.id !== action.id)
        }
        case "CHANGE_TODOLIST_FILTER": {
            return state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.filter}
                } else {
                    return tl
                }
            })
            return state
        }
        case "CHANGE_TODOLIST_TITLE": {
            return state.map(tl => {
                if (tl.id === action.id) {
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

//Домашка
// №1 проделать с 1 по 9 пунткы урока.
// №2 Изучить useReducer; почитать про остальные хуки.
// №3 пункты 14 и 15 занятия.
// Подтянуть соцсеть до 47 урока.