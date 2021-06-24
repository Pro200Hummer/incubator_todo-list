const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
};

export const appReducer = (state = initialState, action: AppReducerActionTypes): AppReducerStateType => {
    switch (action.type) {
        case "APP/SET_STATUS":
            return {...state, status: action.status}
        case "APP/SET_ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
};


export const changeAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET_STATUS", status} as const);
export const setErrorAC = (error: string | null) => ({type:"APP/SET_ERROR", error} as const)


export type RequestStatusType = 'idle' | 'loading' | 'succeed' | 'failed';

export type AppReducerActionTypes =
    | ReturnType<typeof changeAppStatusAC>
    | ReturnType<typeof setErrorAC>

export type AppReducerStateType = typeof initialState;
