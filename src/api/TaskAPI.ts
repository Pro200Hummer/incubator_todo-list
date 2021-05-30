import axios from 'axios';

export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        'API-key': '73b1837e-5f6e-44e2-a66e-fd7ff9204f6e'
    }
})

export type TaskType = {
    "id": string,
    "title": string,
    "description": null | string,
    "todoListId": string,
    "order": number,
    "status": number,
    "priority": number,
    "startDate": any,    // change any
    "deadline": any,     // change any
    "addedDate": string
}

export type TaskAPIType = {
    items: TaskType[]
}

export type TasksResponseType<D> = {
    resultCode: number
    messages: string[],
    data: D
}

export const tasksAPI = {
    getTasks(todoListID: string) {
        const getPromise =
            instance.get<TaskAPIType>(`todo-lists/${ todoListID }/tasks`)
        return getPromise
    },
    createTask(todoListID: string, taskTitle: string) {
        const postPromise =
            instance.post<TasksResponseType<{ item: TaskAPIType }>>(`todo-lists/${ todoListID }/tasks`, {
                title: taskTitle
            })
        return postPromise
    },
    deleteTask(todoListID: string, taskID: string) {
        const deletePromise =
            instance.delete<TasksResponseType<{}>>(`todo-lists/${ todoListID }/tasks/${ taskID }`)
        return deletePromise
    },
    updateTask(todoListID: string, taskID: string, newTitle: string) {
        const putPromise =
            instance.put<TasksResponseType<{}>>(`todo-lists/${ todoListID }/tasks/${ taskID }`, {
                title: newTitle
            })
        return putPromise
    }
};

