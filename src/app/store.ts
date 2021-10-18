import {Action, configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {authReducer} from "../features/Login/auth-reducer";
import {todoListReducer} from "../features/TodoList/todolist-reducer";
import {tasksReducer} from "../features/TodoList/Task/tasks-reducer";
import {FieldErrorType} from "../api/api-types";
import {appReducer} from "./app-reducer";


const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    todoLists: todoListReducer,
    tasks: tasksReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware] as const
});

export type RootState = ReturnType<typeof rootReducer>
export type RootStateType = ReturnType<typeof store.getState>
export type ThunkAppDispatch = ThunkDispatch<RootStateType, void, Action>;
export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }