import axios from "axios";
import {ResponseType, AuthMeResponseDataType, LoginParamsType, TaskAPIType, UpdateTaskRequestType} from "./api-types";
import {TaskType} from "../features/TodoList/Task/task-types";
import {TodoListType} from "../features/TodoList/todo-list-types";


export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        'API-key': 'c3ff16a4-4b9d-490a-b188-2440deac59e8'
    }
});

export const authApi = {
    me() {
        return instance.get<ResponseType<AuthMeResponseDataType>>(`auth/me`)
    },
    login(model: LoginParamsType) {
        return instance.post<ResponseType<{ userId: string }>>(`auth/login`, model)
    },
    logout() {
        return instance.delete<ResponseType>(`auth/login`)
    }
}

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
