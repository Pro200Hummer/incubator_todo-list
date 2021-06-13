import {v1} from "uuid";
import {todoListApi} from "../api/Todo-list-api";
import {Dispatch} from "redux";
import {setTasksAC} from "./tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
};

const initialState: TodoListDomainType[] = [];

export type RemoveTodoListActionType = {
    type: "REMOVE_TODOLIST",
    todoListID: string,
}
export type AddTodoListActionType = {
    type: "ADD_TODOLIST",
    todoListTitle: string,
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
export type SetTodoListsActionType = {
    type: "SET_TODO_LISTS"
    todoLists: TodoListType[]
}

export type ActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeFilterActionType
    | ChangeTodoListTitleActionType
    | SetTodoListsActionType

export const todoListReducer = (state = initialState, action: ActionType): TodoListDomainType[] => {
    switch (action.type) {
        case "ADD_TODOLIST": {
            const newTodoList: TodoListDomainType = {
                id: action.todoListID,
                title: action.todoListTitle,
                filter: "all",
                addedDate: "",
                order: 0
            }
            return [newTodoList, ...state]
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
        case "SET_TODO_LISTS":
            return action.todoLists.map(tl => {
                return {
                    ...tl,
                    filter: "all"
                }
            })

        default:
            return state
    }
}

export const addTodoListAC = (todoListTitle: string, todoListID: string): AddTodoListActionType => {
    return {type: "ADD_TODOLIST", todoListTitle, todoListID}
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
export const setTodoListsAC = (todoLists: TodoListType[]): SetTodoListsActionType => {
    return {
        type: "SET_TODO_LISTS",
        todoLists
    }
}

/* Thunks for todolist-reducer */
export const fetchTodoListsTC = () => (dispatch: Dispatch) => {
    todoListApi.getTodoLists()
        .then(res => {
            dispatch(setTodoListsAC(res.data))
        })
}
export const deleteTodoListTC = (todoListID: string) => (dispatch: Dispatch) => {
    todoListApi.deleteTodoList(todoListID)
        .then(() => {
            dispatch(removeTodoListAC(todoListID))
        })
}
export const createTodoListTC = (todoListTitle: string) => (dispatch: Dispatch) => {
    todoListApi.createTodoList(todoListTitle)
        .then((res) => {
            const todoListID = res.data.data.item.id
            dispatch(addTodoListAC(todoListTitle, todoListID))
        })
}
export const changeTodoListTitleTC = (todoListTitle: string, todoListID: string) =>
    (dispatch: Dispatch) => {
        todoListApi.updateTodoList(todoListID, todoListTitle)
            .then(() => {
                dispatch(changeTodoListTitleAC(todoListTitle, todoListID))
            })
    }
