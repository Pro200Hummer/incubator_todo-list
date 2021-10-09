import {TaskStatuses, TaskType, TodoTaskPriority} from "../features/TodoList/Task/task-types";


export type LoginParamsType = {
    email?: string
    password?: string
    rememberMe?: boolean
    captcha?: string
};

export type AuthMeResponseDataType = {
    id: string
    email: string
    login: string
};

export type TaskAPIType = {
    items: TaskType[]
};

export type FieldErrorType = { field: string; error: string };

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