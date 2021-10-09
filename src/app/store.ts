import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk';
import {appSlice} from "./app-reducer";
import {authSlice} from "../features/Login/auth-reducer";
import {todoListSlice} from "../features/TodoList/todolist-reducer";
import {taskSlice} from "../features/TodoList/Task/tasks-reducer";
import { FieldErrorType } from "../api/todo-list-api";


export const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        auth: authSlice.reducer,
        todoLists: todoListSlice.reducer,
        tasks: taskSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }