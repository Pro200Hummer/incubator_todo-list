import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {todoListReducer, TodoListsActionType} from '../features/TodoList/todolist-reducer';
import {TasksActionType, tasksReducer} from '../features/TodoList/Task/tasks-reducer';
import {appReducer, AppReducerActionTypes} from "./app-reducer";
import {authReducer, AuthReducerActionsType} from "../features/Login/auth-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
    app: appReducer,
    auth: authReducer,
})

// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// Combining the types of all action creators
export type AppActionsTypes = TasksActionType | TodoListsActionType | AppReducerActionTypes | AuthReducerActionsType

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsTypes>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

