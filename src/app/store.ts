import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk, {ThunkAction} from 'redux-thunk';
import {todoListReducer, TodoListsActionType} from '../features/TodoList/todolist-reducer';
import {TasksActionType, tasksReducer} from '../features/TodoList/Task/tasks-reducer';
import {appReducer, AppReducerActionTypes} from "./app-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
    appAspects: appReducer,
})

// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk));
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// Combining the types of all action creators
export type AppActionsTypes = TasksActionType | TodoListsActionType | AppReducerActionTypes

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsTypes>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

