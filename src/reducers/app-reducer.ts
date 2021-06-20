const initialState = {
    appStatus: 'succeed' as RequestStatusType,
    todoListLoadingStatus: 'succeed' as RequestStatusType,
};

export const appReducer = (state = initialState, action: AppReducerActionTypes): AppReducerStateType => {
    switch (action.type) {
        case "APP/SET_STATUS":
            return {...state, appStatus: action.status}
        case "SET_TODOLIST_STATUS":
            return {...state, todoListLoadingStatus: action.status}
        default:
            return state
    }
};


export const changeAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET_STATUS", status} as const);
export const changeTodoListLoadingStatusAC = (status: RequestStatusType) => ({type: "SET_TODOLIST_STATUS", status} as const);

export type RequestStatusType = 'idle' | 'loading' | 'succeed' | 'failed';

export type AppReducerActionTypes =
    | ReturnType<typeof changeAppStatusAC>
    | ReturnType<typeof changeTodoListLoadingStatusAC>

export type AppReducerStateType = typeof initialState;
