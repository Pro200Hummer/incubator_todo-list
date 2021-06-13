import {todoListApi} from "../api/Todo-list-api";
import {AppThunkType} from "./store";

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
    todoList: TodoListType
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

export type TodoListsActionType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeFilterActionType
    | ChangeTodoListTitleActionType
    | SetTodoListsActionType

export const todoListReducer = (state = initialState, action: TodoListsActionType): TodoListDomainType[] => {
    switch (action.type) {
        case "ADD_TODOLIST": {
            const newTodoList: TodoListDomainType = {...action.todoList, filter: "all"}
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
        }
        case "CHANGE_TODOLIST_TITLE": {
            return state.map(tl => {
                if (tl.id === action.todoListID) {
                    return {...tl, title: action.title}
                } else {
                    return tl
                }
            })
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

export const addTodoListAC = (todoList: TodoListType): AddTodoListActionType => {
    return {type: "ADD_TODOLIST", todoList}
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
export const fetchTodoListsTC = (): AppThunkType => async dispatch => {
    try {
        const res = await todoListApi.getTodoLists()
        dispatch(setTodoListsAC(res.data))
    } catch (e) {
        throw new Error(e)
    }
}
export const deleteTodoListTC = (todoListID: string): AppThunkType => async dispatch => {
    try {
        const res = await todoListApi.deleteTodoList(todoListID)
        dispatch(removeTodoListAC(todoListID))
    } catch (e) {
        throw new Error(e)
    }

}
export const createTodoListTC = (todoListTitle: string): AppThunkType => async dispatch => {
    try {
        const res = await todoListApi.createTodoList(todoListTitle)
        dispatch(addTodoListAC(res.data.data.item))
    } catch (e) {
        throw new Error(e)
    }

}
export const changeTodoListTitleTC = (todoListTitle: string, todoListID: string): AppThunkType => async dispatch => {
    try {
        const res = await todoListApi.updateTodoList(todoListID, todoListTitle)
        dispatch(changeTodoListTitleAC(todoListTitle, todoListID))
    } catch (e) {
        throw new Error(e)
    }
}
