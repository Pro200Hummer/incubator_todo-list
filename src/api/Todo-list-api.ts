import axios from "axios";

/* Types */
export type TaskType = {
    "id": string,
    "title": string,
    "description": null | string,
    "todoListId": string,
    "order": number,
    "status": number,
    "priority": number,
    "startDate": string,
    "deadline": string,
    "addedDate": string
}

export type TaskAPIType = {
    items: TaskType[]
}

export type TodoListAPIType = {
    "id": string,
    "title": string,
    "addedDate": string,
    "order": number
}

export type ResponseType<D = {}> = {
    "data": D
    "messages": string[]
    "resultCode": number
}

/* Instance to requests */
const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        'API-key': '73b1837e-5f6e-44e2-a66e-fd7ff9204f6e'
    }
})

/* API */
export const todoListApi = {
    createTodoList(todoListTitle: string) {
        return instance.post<ResponseType<{ item: TodoListAPIType }>>(`todo-lists`, {
            title: todoListTitle
        })

    },
    getTodoLists() {
        return instance.get<TodoListAPIType[]>(`todo-lists`)
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
        return instance.post<ResponseType<{ item: TaskAPIType }>>(`todo-lists/${ todoListID }/tasks`, {
            title: taskTitle
        })
    },
    deleteTask(todoListID: string, taskID: string) {
        return instance.delete<ResponseType>(`todo-lists/${ todoListID }/tasks/${ taskID }`)
    },
    updateTask(todoListID: string, taskID: string, newTitle: string) {
        return instance.put<ResponseType>(`todo-lists/${ todoListID }/tasks/${ taskID }`, {
            title: newTitle
        })
    }
}