import {UpdateTaskRequestType} from "../../../api/api-types";

export type TaskStateType = {
    [key: string]: TaskType[]
};

export type TaskType = {
    id: string,
    title: string,
    description: string,
    todoListId: string,
    order: number,
    status: TaskStatuses,
    priority: TodoTaskPriority,
    startDate: string,
    deadline: string,
    addedDate: string
};

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

export type UpdateTaskActionType = {
    taskID: string
    model: UpdateTaskRequestType
    todoListID: string
};

export type SetTasksActionType = {
    tasks: TaskType[]
    todoListID: string
};

export type AddTaskActionType = {
    todoListID: string
    taskTitle: string
};
