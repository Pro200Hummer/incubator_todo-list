import axios from "axios";

/* Instance to requests */
const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        'API-key': 'c3ff16a4-4b9d-490a-b188-2440deac59e8'
    }
})

/* API */
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
}

/* Types */
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
export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}

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

export type TaskAPIType = {
    items: TaskType[]
}

export type ResponseType<D = {}> = {
    "data": D
    "messages": string[]
    "resultCode": number
}

export type UpdateTaskRequestType = {
    title?: string
    description?: string | null
    status?: TaskStatuses
    priority?: TodoTaskPriority
    startDate?: string | null
    deadline?: string | null
}
