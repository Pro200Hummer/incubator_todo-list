import {configureStore} from "@reduxjs/toolkit";
import {appSlice} from "./app-reducer";
import {authSlice} from "../features/Login/auth-reducer";
import {todoListSlice} from "../features/TodoList/todolist-reducer";
import {taskSlice} from "../features/TodoList/Task/tasks-reducer";


export const store = configureStore({
    reducer: {
        app: appSlice.reducer,
        auth: authSlice.reducer,
        todoLists: todoListSlice.reducer,
        tasks: taskSlice.reducer
    }
});

export type RootStateType = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch