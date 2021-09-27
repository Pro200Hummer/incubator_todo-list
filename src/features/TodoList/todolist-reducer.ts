import {todoListApi} from "../../api/todo-list-api";
import {RequestStatusType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/app-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {changeAppStatus} from "../../app/app-reducer";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
};

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType,
};

export type ChangeTodoListFilterPayloadType = {
    filter: FilterValuesType
    id: string
}
export type ChangeTodoListTitleType = {
    title: string
    todoListID: string
}
export type ChangeEntityStatusPayloadType = {
    entityStatus: RequestStatusType
    todoListID: string
}

const initialState: TodoListDomainType[] = [];

export const fetchTodoLists = createAsyncThunk(
    'todoLists/fetchTodoLists',
    async (_, {dispatch}) => {
        dispatch(changeAppStatus("loading"))
        try {
            const res = await todoListApi.getTodoLists()
            dispatch(todoListSlice.actions.setTodoListsAC(res.data))
        } catch (error) {
            handleServerNetworkError(error.message, dispatch)
        }
        dispatch(changeAppStatus("succeed"))
    });

export const deleteTodoList = createAsyncThunk(
    'todoLists/deleteTodoList',
    async (todoListID: string, {dispatch}) => {
        dispatch(changeAppStatus("loading"))
        dispatch(todoListSlice.actions.changeEntityStatusAC({entityStatus: 'loading', todoListID}))
        try {
            await todoListApi.deleteTodoList(todoListID)
            dispatch(todoListSlice.actions.removeTodoListAC(todoListID))
            dispatch(changeAppStatus("succeed"))
            dispatch(todoListSlice.actions.changeEntityStatusAC({entityStatus: 'idle', todoListID}))
        } catch (error) {
            handleServerNetworkError(error.message, dispatch)
        }
    });

export const createTodoList = createAsyncThunk(
    'todoLists/createTodoList',
    async (todoListTitle: string, {dispatch}) => {
        dispatch(changeAppStatus("loading"))
        try {
            const res = await todoListApi.createTodoList(todoListTitle)
            if (res.data.resultCode === 0) {
                dispatch(todoListSlice.actions.addTodoListAC(res.data.data.item))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        } catch (error) {
            handleServerNetworkError(error.message, dispatch)
        }
    });

export const changeTodoListTitle = createAsyncThunk(
    'todoLists/changeTodoListTitle',
    async (params:ChangeTodoListTitleType, {dispatch}) => {
        dispatch(changeAppStatus("loading"))
        try {
            await todoListApi.updateTodoList(params.todoListID, params.title)
            dispatch(todoListSlice.actions.changeTodoListTitleAC(params))
            dispatch(changeAppStatus("succeed"))
        } catch (error) {
            handleServerNetworkError(error.message, dispatch)
        }
    });

export const todoListSlice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        addTodoListAC: (state, action: PayloadAction<TodoListType>) => {
            return [{...action.payload, filter: 'all', entityStatus: 'idle'}, ...state]
        },
        removeTodoListAC: (state, action: PayloadAction<string>) => {
            return state.filter(tl => tl.id !== action.payload)
        },
        changeTodoListFilterAC: (state, action: PayloadAction<ChangeTodoListFilterPayloadType>) => {
            return state.map(tl => tl.id === action.payload.id ?
                {...tl, filter: action.payload.filter} : tl)
        },
        changeTodoListTitleAC: (state, action: PayloadAction<ChangeTodoListTitleType>) => {
            return state.map(tl => tl.id === action.payload.todoListID ?
                {...tl, title: action.payload.title} : tl)
        },
        setTodoListsAC: (state, action: PayloadAction<TodoListType[]>) => {
            return action.payload.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        },
        changeEntityStatusAC: (state, action: PayloadAction<ChangeEntityStatusPayloadType>) => {
            return state.map(tl => tl.id === action.payload.todoListID ?
                {...tl, entityStatus: action.payload.entityStatus} : tl)
        }
    }
});

export const {addTodoListAC, removeTodoListAC, changeTodoListFilterAC, setTodoListsAC} = todoListSlice.actions
export default todoListSlice.reducer