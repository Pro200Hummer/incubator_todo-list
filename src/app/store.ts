import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk';
import {authReducer} from "../features/Login/auth-reducer";
import {todoListReducer} from "../features/TodoList/todolist-reducer";
import {tasksReducer} from "../features/TodoList/Task/tasks-reducer";
import {FieldErrorType} from "../api/api-types";
import {appReducer} from "./app-reducer";


export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        todoLists: todoListReducer,
        tasks:tasksReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }