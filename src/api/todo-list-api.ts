import axios from "axios";
import {TaskStatuses, TaskType, TodoTaskPriority} from "../features/TodoList/Task/tasks-reducer";
import {TodoListType} from "../features/TodoList/todolist-reducer";

export type TaskAPIType = {
    items: TaskType[]
};
export type FieldErrorType = { field: string; error: string }
export type ResponseType<D = {}> = {
    "data": D
    "messages": string[]
    "resultCode": number
};

export type UpdateTaskRequestType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TodoTaskPriority
    startDate?: string
    deadline?: string
};



export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        'API-key': 'c3ff16a4-4b9d-490a-b188-2440deac59e8'
    }
});

export const todoListApi = {
    createTodoList(todoListTitle: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>(`todo-lists`, {
            title: todoListTitle
        })

    },
    getTodoLists() {
        return instance.get<TodoListType[]>(`todo-lists`)
    },
    updateTodoList(todoListID: string, todoListTitle: string) {
        return instance.put<ResponseType>(`todo-lists/${ todoListID }`, {
            title: todoListTitle
        })
    },
    deleteTodoList(todoListID: string) {
        return instance.delete<ResponseType>(`todo-lists/${ todoListID }`)
    },
    getTasks(todoListID: string) {
        return instance.get<TaskAPIType>(`todo-lists/${ todoListID }/tasks`)
    },
    createTask(todoListID: string, taskTitle: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${ todoListID }/tasks`, {
            title: taskTitle
        })
    },
    deleteTask(todoListID: string, taskID: string) {
        return instance.delete<ResponseType>(`todo-lists/${ todoListID }/tasks/${ taskID }`)
    },
    updateTask(todoListID: string, taskID: string, updateTaskRequest: UpdateTaskRequestType) {
        return instance.put<ResponseType>(`todo-lists/${ todoListID }/tasks/${ taskID }`, updateTaskRequest)
    }
};
