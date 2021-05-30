import axios from "axios";

export type TodoListAPIType = {
    "id": string,
    "title": string,
    "addedDate": string,
    "order": number
}

export type TodoListResponseType<D> = {
    "data": D
    "messages": string[]
    "resultCode": number
}

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        'API-key': '73b1837e-5f6e-44e2-a66e-fd7ff9204f6e'
    }
})

export const todoListAPI = {
    createTodoList(todoListTitle: string) {
        const postPromise =
            instance.post<TodoListResponseType<{ item: TodoListAPIType }>>(`todo-lists`, {
                title: todoListTitle
            })
        return postPromise
    },
    getTodoLists() {
        const getPromise =
            instance.get<TodoListAPIType[]>(`todo-lists`)
        return getPromise
    },
    updateTodoList(todoListID: string, todoListTitle: string) {
        const putPromise =
            instance.put<TodoListResponseType<{}>>(`todo-lists/${ todoListID }`, {
                title: todoListTitle
            })
        return putPromise
    },
    deleteTodoList(todoListID: string) {
        const deletePromise =
            instance.delete<TodoListResponseType<{}>>(`todo-lists/${ todoListID }`)
        return deletePromise
    },
}