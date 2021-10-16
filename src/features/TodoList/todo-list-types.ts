import {RequestStatusType} from "../../app/app-types";


export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
};

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType,
};

export type ChangeTodoListFilterPayloadType = {
    filter: FilterValuesType
    id: string
};

export type ChangeTodoListTitleType = {
    title: string
    todoListID: string
};

export type ChangeEntityStatusPayloadType = {
    entityStatus: RequestStatusType
    todoListID: string
};