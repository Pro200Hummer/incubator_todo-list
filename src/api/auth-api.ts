import {instance} from "./todo-list-api";
import {ResponseType} from './todo-list-api'

export type LoginParamsType = {
    email?: string
    password?: string
    rememberMe?: boolean
    captcha?: string
}

export type AuthMeResponseDataType = {
    id: string
    email: string
    login: string
}

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


