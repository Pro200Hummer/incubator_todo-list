import {todoListApi} from "../../api/todo-list-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/app-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {changeAppStatus} from "../../app/app-reducer";
import {
    ChangeEntityStatusPayloadType,
    ChangeTodoListFilterPayloadType,
    ChangeTodoListTitleType,
    TodoListDomainType, TodoListType
} from "./todo-list-types";
import {ThunkError} from "../../app/store";


export const fetchTodoLists = createAsyncThunk<{todoLists: TodoListType[]}, void, ThunkError>(
    'todoLists/fetchTodoLists',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(changeAppStatus("loading"))
        try {
            const res = await todoListApi.getTodoLists()
            thunkAPI.dispatch(changeAppStatus("succeed"))
            return {todoLists: res.data}
        } catch (error) {
            handleServerNetworkError(error.message, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: []})
        }
    });

export const deleteTodoList = createAsyncThunk<{todoListID: string}, string, ThunkError>(
    'todoLists/deleteTodoList',
    async (todoListID: string, thunkAPI) => {
        thunkAPI.dispatch(changeAppStatus("loading"))
        thunkAPI.dispatch(changeEntityStatusAC({entityStatus: 'loading', todoListID}))
        try{
            await todoListApi.deleteTodoList(todoListID)
            thunkAPI.dispatch(changeAppStatus("succeed"))
            thunkAPI.dispatch(changeEntityStatusAC({entityStatus: 'idle', todoListID}))
            return {todoListID: todoListID}
        }catch (error){
            return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: []})
        }

    });

export const createTodoList = createAsyncThunk<{todoList: TodoListType},string, ThunkError >(
    'todoLists/createTodoList',
    async (todoListTitle: string, thunkAPI) => {
        thunkAPI.dispatch(changeAppStatus("loading"))
        try {
            const res = await todoListApi.createTodoList(todoListTitle)
            if (res.data.resultCode === 0) {
                return {todoList: res.data.data.item}
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
            }
        } catch (error) {
            handleServerNetworkError(error.message, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: []})
        }
    });

export const changeTodoListTitle = createAsyncThunk<ChangeTodoListTitleType, ChangeTodoListTitleType, ThunkError>(
    'todoLists/changeTodoListTitle',
    async (params: ChangeTodoListTitleType, thunkAPI) => {
        thunkAPI.dispatch(changeAppStatus("loading"))
        try {
            const res = await todoListApi.updateTodoList(params.todoListID, params.title)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(changeAppStatus("succeed"))
                return {todoListID: params.todoListID, title: params.title}
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
            }
        } catch (error) {
            handleServerNetworkError(error.message, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: []})
        }
    });

export const todoListSlice = createSlice({
    name: 'todoList',
    initialState: [] as TodoListDomainType[],
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