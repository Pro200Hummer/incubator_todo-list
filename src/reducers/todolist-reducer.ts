import {FilterValuesType, todoListApi, TodoListDomainType, TodoListType} from "../api/Todo-list-api";
import {AppThunkType} from "./store";
import {changeAppStatusAC, setErrorAC} from "./app-reducer";

const initialState: TodoListDomainType[] = [];

/* Todo lists reducer */
export const todoListReducer = (state = initialState, action: TodoListsActionType): TodoListDomainType[] => {
    switch (action.type) {
        case "ADD_TODOLIST": {
            return [{...action.todoList, filter: "all"}, ...state]
        }
        case "REMOVE_TODOLIST": {
            return state.filter(tl => tl.id !== action.todoListID)
        }
        case "CHANGE_TODOLIST_FILTER": {
            return state.map(tl => tl.id === action.todoListID ? {...tl, filter: action.filterValue} : tl)
        }
        case "CHANGE_TODOLIST_TITLE": {
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.title} : tl)
        }
        case "SET_TODO_LISTS":
            return action.todoLists.map(tl => ({...tl, filter: "all"}))
        default:
            return state
    }
}

export const addTodoListAC = (todoList: TodoListType) =>
    ({type: "ADD_TODOLIST", todoList} as const)

export const removeTodoListAC = (todoListID: string) =>
    ({type: "REMOVE_TODOLIST", todoListID} as const)

export const changeTodoListFilterAC = (filterValue: FilterValuesType, todoListID: string) =>
    ({type: "CHANGE_TODOLIST_FILTER", filterValue, todoListID} as const)

export const changeTodoListTitleAC = (title: string, todoListID: string) =>
    ({type: "CHANGE_TODOLIST_TITLE", title, todoListID} as const)

export const setTodoListsAC = (todoLists: TodoListType[]) =>
    ({type: "SET_TODO_LISTS", todoLists} as const)


/* Thunks for todolist-reducer */
export const fetchTodoListsTC = (): AppThunkType => async dispatch => {
    dispatch(changeAppStatusAC("loading"))
    try {
        const res = await todoListApi.getTodoLists()
        dispatch(setTodoListsAC(res.data))
        dispatch(changeAppStatusAC("succeed"))
    } catch (e) {
        throw new Error(e)
    }
}
export const deleteTodoListTC = (todoListID: string): AppThunkType => async dispatch => {
    dispatch(changeAppStatusAC("loading"))
    try {
        const res = await todoListApi.deleteTodoList(todoListID)
        dispatch(removeTodoListAC(todoListID))
        dispatch(changeAppStatusAC("succeed"))
    } catch (e) {
        throw new Error(e)
    }

}
export const createTodoListTC = (todoListTitle: string): AppThunkType => async dispatch => {
    dispatch(changeAppStatusAC("loading"))
    try {
        const res = await todoListApi.createTodoList(todoListTitle)
        if(res.data.resultCode === 0){
            dispatch(addTodoListAC(res.data.data.item))
        }else if(res.data.messages){
            dispatch(setErrorAC(res.data.messages[0]))
        }else{
            dispatch(setErrorAC("Some error occurred"))
        }
        dispatch(changeAppStatusAC("succeed"))
    } catch (e) {

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
/* Types */
export type RemoveTodoListActionType = ReturnType<typeof removeTodoListAC>
export type AddTodoListActionType = ReturnType<typeof addTodoListAC>
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>

export type TodoListsActionType =
    | RemoveTodoListActionType
    | AddTodoListActionType
    | SetTodoListsActionType
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof changeTodoListTitleAC>