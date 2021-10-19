import {todoListApi} from "../../../api/todo-list-api";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/app-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {changeAppStatus} from "../../../app/app-reducer";
import {asyncTodoListActions} from "../todolist-reducer";
import {AddTaskActionType, RemoveTaskActionType, TaskStateType, TaskType, UpdateTaskActionType} from "./task-types";
import {UpdateTaskRequestType} from "../../../api/api-types";
import {RootStateType, ThunkError} from "../../../app/store";

export const fetchTasks = createAsyncThunk<{todoListID: string, tasks: TaskType[]}, string, ThunkError>(
    'tasks/fetchTasks',
    async (todoListID: string, thunkAPI) => {
        thunkAPI.dispatch(changeAppStatus("loading"))
        try {
            const res = await todoListApi.getTasks(todoListID)
            const tasks: TaskType[] = res.data.items
            thunkAPI.dispatch(changeAppStatus("succeed"))
            return {todoListID, tasks}
        } catch (error) {
            handleServerNetworkError(error.message, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: []})
        }
    });

export const removeTask = createAsyncThunk<RemoveTaskActionType, RemoveTaskActionType, ThunkError>(
    'tasks/removeTask',
    async (params: RemoveTaskActionType, thunkAPI) => {
        thunkAPI.dispatch(changeAppStatus("loading"))
        try {
            await todoListApi.deleteTask(params.todoListID, params.taskID)
            thunkAPI.dispatch(changeAppStatus("succeed"))
            return {todoListID: params.todoListID, taskID: params.taskID}
        } catch (error) {
            handleServerNetworkError(error.message, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: []})
        }
    });

export const addTask = createAsyncThunk<{task: TaskType, todoListID: string}, AddTaskActionType, ThunkError>(
    'tasks/addTask',
    async (params: AddTaskActionType, thunkAPI) => {
        thunkAPI.dispatch(changeAppStatus("loading"))
        try {
            const res = await todoListApi.createTask(params.todoListID, params.taskTitle)
            const task = res.data.data.item
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(changeAppStatus("succeed"))
                return {task, todoListID: params.todoListID}
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
            }
        } catch (error) {
            handleServerNetworkError(error.message, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: []})
        }
    });

export const updateTask = createAsyncThunk<UpdateTaskActionType, UpdateTaskActionType, ThunkError>(
    'tasks/updateTask',
    async (params: UpdateTaskActionType, thunkAPI) => {
        const state = thunkAPI.getState() as RootStateType

        const task = state.tasks[params.todoListID].find(t => t.id === params.taskID)
        if (!task) {
            return thunkAPI.rejectWithValue({errors: ['task not found in the state'], fieldsErrors: []})
        }

        const apiModel: UpdateTaskRequestType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...params.model
        }
        thunkAPI.dispatch(changeAppStatus("loading"))
        try {
            const res = await todoListApi.updateTask(params.todoListID, params.taskID, apiModel)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(changeAppStatus("succeed"))
                return {todoListID: params.todoListID, taskID: params.taskID, model: params.model}
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
            }
        } catch (error) {
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: []})
        }
    });

export const taskSlice = createSlice({
    name: 'tasks',
    initialState: {} as TaskStateType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action) => {
                if (action.payload) return {...state, [action.payload.todoListID]: action.payload.tasks}
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                if (action.payload) return {
                    ...state, [action.payload.todoListID]: state[action.payload.todoListID]
                        .filter(task => {
                            if (action.payload) {
                                return task.id !== action.payload.taskID
                            }
                        })
                }
            })
            .addCase(addTask.fulfilled, (state, action) => {
                if (action.payload) return {
                    ...state,
                    [action.payload.todoListID]: [action.payload.task, ...state[action.payload.todoListID]]
                }
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                if(action.payload){
                    const tasks = state[action.payload.todoListID]
                    const index = tasks.findIndex(t => {
                        if(action.payload) return  t.id === action.payload.taskID
                    })
                    if (index > -1 ) {
                        tasks[index] = {...tasks[index], ...action.payload.model}
                    }
                }
            })
            .addCase(asyncTodoListActions.createTodoList.fulfilled,
                (state, action) => {
                    if (action.payload) return {...state, [action.payload.todoList.id]: []}
                })
            .addCase(asyncTodoListActions.deleteTodoList.fulfilled,
                (state, action) => {
                    delete state[action.payload.todoListID]
                })
            .addCase(asyncTodoListActions.fetchTodoLists.fulfilled,
                (state, action) => {
                    if (action.payload) action.payload.todoLists.forEach((tl) => {
                        state[tl.id] = []
                    })
                })
    }
});

export const asyncTasksActions = {fetchTasks, removeTask, addTask, updateTask}
export const tasksReducer = taskSlice.reducer
export type TasksActionType = typeof taskSlice.actions
