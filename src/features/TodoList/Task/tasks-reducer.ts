import {todoListApi} from "../../../api/todo-list-api";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/app-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {changeAppStatus} from "../../../app/app-reducer";
import {addTodoListAC, removeTodoListAC, setTodoListsAC, TodoListType} from "../todolist-reducer";

export type TaskStateType = {
    [key: string]: TaskType[]
};

export type TaskType = {
    id: string,
    title: string,
    description: null | string,
    todoListId: string,
    order: number,
    status: TaskStatuses,
    priority: TodoTaskPriority,
    startDate: string,
    deadline: string,
    addedDate: string
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TodoTaskPriority {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type RemoveTaskActionType = {
    todoListID: string
    taskID: string
};
export type ChangeTaskStatusActionType = {
    taskID: string
    status: TaskStatuses
    todoListID: string
};
export type ChangeTaskTitleActionType = {
    todoListID: string
    taskID: string
    taskTitle: string
};
export type SetTasksActionType = {
    tasks: TaskType[]
    todoListID: string
};
export type AddTaskActionType = {
    todoListID: string
    taskTitle: string
}

const initialState: TaskStateType = {}

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (todoListID: string, {dispatch}) => {
        dispatch(changeAppStatus("loading"))
        try {
            const res = await todoListApi.getTasks(todoListID)
            const tasks: TaskType[] = res.data.items
            dispatch(taskSlice.actions.setTasksAC({tasks, todoListID}))
            dispatch(changeAppStatus("succeed"))
        } catch (error) {
            handleServerNetworkError(error.message, dispatch)
        }
    });

export const removeTask = createAsyncThunk(
    'tasks/removeTask',
    async (params: RemoveTaskActionType, {dispatch}) => {
        dispatch(changeAppStatus("loading"))
        try {
            await todoListApi.deleteTask(params.todoListID, params.taskID)
            dispatch(taskSlice.actions.removeTaskAC(params))
            dispatch(changeAppStatus("succeed"))
        } catch (error) {
            handleServerNetworkError(error.message, dispatch)
        }
    });

export const addTask = createAsyncThunk(
    'tasks/addTask',
    async (params: AddTaskActionType, {dispatch}) => {
        dispatch(changeAppStatus("loading"))
        try {
            const res = await todoListApi.createTask(params.todoListID, params.taskTitle)
            const task = res.data.data.item
            if (res.data.resultCode === 0) {
                dispatch(taskSlice.actions.addTaskAC(task))
            } else {
                handleServerAppError(res.data, dispatch)
            }
            dispatch(changeAppStatus("succeed"))
        } catch (error) {
            handleServerNetworkError(error.message, dispatch)
        }
    });

export const changeTaskStatus = createAsyncThunk(
    'tasks/changeTaskStatus',
    async (params: ChangeTaskStatusActionType, {dispatch}) => {
        dispatch(changeAppStatus("loading"))
        todoListApi.updateTask(params.todoListID, params.taskID, {status: params.status})
            .then(() => {
                dispatch(taskSlice.actions.changeTaskStatusAC(params))
                dispatch(changeAppStatus("succeed"))
            })
            .catch(error => {
                handleServerNetworkError(error.message, dispatch)
            })
    });

export const changeTaskTitleTC = createAsyncThunk(
    'tasks/changeTaskStatus',
    async (params: ChangeTaskTitleActionType, {dispatch}) => {
        dispatch(changeAppStatus("loading"))
        try {
            await todoListApi.updateTask(params.todoListID, params.taskID, {title: params.taskTitle})
            dispatch(taskSlice.actions.changeTaskTitleAC(params))
            dispatch(changeAppStatus("succeed"))
        } catch (error) {
            handleServerNetworkError(error.message, dispatch)
        }
    });

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        removeTaskAC: (state, action: PayloadAction<RemoveTaskActionType>) => {
            return {
                ...state, [action.payload.todoListID]: state[action.payload.todoListID].filter(task =>
                    task.id !== action.payload.taskID)
            }
        },
        addTaskAC: (state, action: PayloadAction<TaskType>) => {
            return {...state, [action.payload.todoListId]: [action.payload, ...state[action.payload.todoListId]]}
        },
        changeTaskStatusAC: (state, action: PayloadAction<ChangeTaskStatusActionType>) => {
            return {
                ...state, [action.payload.todoListID]: state[action.payload.todoListID]
                    .map(t => t.id === action.payload.taskID ? {...t, status: action.payload.status} : t)
            }
        },
        changeTaskTitleAC: (state, action: PayloadAction<ChangeTaskTitleActionType>) => {
            return {
                ...state, [action.payload.todoListID]: state[action.payload.todoListID]
                    .map(t => t.id === action.payload.taskID ? {...t, title: action.payload.taskTitle} : t)
            }
        },
        setTasksAC: (state, action: PayloadAction<SetTasksActionType>) => {
            return {...state, [action.payload.todoListID]: action.payload.tasks}
        }
    },
    extraReducers: (builder => {
        builder
            .addCase(addTodoListAC,
                (state, action: PayloadAction<TodoListType>) => {
                    return {...state, [action.payload.id]: []}
                })
            .addCase(removeTodoListAC,
                (state, action: PayloadAction<string>) => {
                    delete state[action.payload]
                    return {...state}
                })
            .addCase(setTodoListsAC,
                (state, action: PayloadAction<TodoListType[]>) => {
                    action.payload.forEach((tl) => {
                        state[tl.id] = []
                    })
                })
    })
});
