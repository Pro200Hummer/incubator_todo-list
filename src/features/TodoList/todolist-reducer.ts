import {todoListApi} from "../../api/todo-list-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/app-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {changeAppStatus} from "../../app/app-reducer";
import {
    ChangeEntityStatusPayloadType,
    ChangeTodoListFilterPayloadType,
    ChangeTodoListTitleType,
    TodoListDomainType
} from "./todo-list-types";

const initialState: TodoListDomainType[] = [];

export const fetchTodoLists = createAsyncThunk(
    'todoLists/fetchTodoLists',
    async (_, {dispatch}) => {
        dispatch(changeAppStatus("loading"))
        try {
            const res = await todoListApi.getTodoLists()
            dispatch(changeAppStatus("succeed"))
            return {todoLists: res.data}
        } catch (error) {
            handleServerNetworkError(error.message, dispatch)
        }
    });

export const deleteTodoList = createAsyncThunk(
    'todoLists/deleteTodoList',
    async (todoListID: string, {dispatch}) => {
        dispatch(changeAppStatus("loading"))
        dispatch(todoListSlice.actions.changeEntityStatusAC({entityStatus: 'loading', todoListID}))
        await todoListApi.deleteTodoList(todoListID)
        dispatch(changeAppStatus("succeed"))
        dispatch(todoListSlice.actions.changeEntityStatusAC({entityStatus: 'idle', todoListID}))
        return {todoListID: todoListID}
    });

export const createTodoList = createAsyncThunk(
    'todoLists/createTodoList',
    async (todoListTitle: string, {dispatch}) => {
        dispatch(changeAppStatus("loading"))
        try {
            const res = await todoListApi.createTodoList(todoListTitle)
            if (res.data.resultCode === 0) {
                return {todoList: res.data.data.item}
            } else {
                handleServerAppError(res.data, dispatch)
            }
        } catch (error) {
            handleServerNetworkError(error.message, dispatch)
        }
    });

export const changeTodoListTitle = createAsyncThunk(
    'todoLists/changeTodoListTitle',
    async (params: ChangeTodoListTitleType, {dispatch}) => {
        dispatch(changeAppStatus("loading"))
        try {
            const res = await todoListApi.updateTodoList(params.todoListID, params.title)
            if (res.data.resultCode === 0) {
                dispatch(changeAppStatus("succeed"))
                return {todoListID: params.todoListID, title: params.title}
            } else {
                handleServerAppError(res.data, dispatch)
            }
        } catch (error) {
            handleServerNetworkError(error.message, dispatch)
        }
    });

export const todoListSlice = createSlice({
    name: 'todoList',
    initialState,
    reducers: {
        changeTodoListFilterAC: (state, action: PayloadAction<ChangeTodoListFilterPayloadType>) => {
            return state.map(tl => tl.id === action.payload.id ?
                {...tl, filter: action.payload.filter} : tl)
        },
        changeEntityStatusAC: (state, action: PayloadAction<ChangeEntityStatusPayloadType>) => {
            return state.map(tl => tl.id === action.payload.todoListID ?
                {...tl, entityStatus: action.payload.entityStatus} : tl)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchTodoLists.fulfilled, (state, action) => {
                if (action.payload) return action.payload.todoLists.map(tl => ({
                    ...tl,
                    filter: "all",
                    entityStatus: "idle"
                }))
            })
            .addCase(createTodoList.fulfilled, (state, action) => {
                if (action.payload) state.unshift({...action.payload.todoList, filter: 'all', entityStatus: 'idle'})
            })
            .addCase(deleteTodoList.fulfilled, (state, action) => {
                state.splice(state.findIndex(tl => tl.id === action.payload.todoListID), 1)
            })
            .addCase(changeTodoListTitle.fulfilled, (state, action) => {
                if (action.payload) {
                    const index = state.findIndex(tl => {
                        if (action.payload) return tl.id === action.payload.todoListID
                    })
                    state[index].title = action.payload.title
                }
            })
    }
});

export const asyncTodoListActions = {
    fetchTodoLists,
    createTodoList,
    changeTodoListTitle,
    deleteTodoList,
}
export const {changeTodoListFilterAC, changeEntityStatusAC} = todoListSlice.actions
export const todoListReducer = todoListSlice.reducer