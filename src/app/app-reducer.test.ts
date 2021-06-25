import {appReducer, AppReducerStateType, changeAppStatusAC, setErrorAC} from "./app-reducer";


let startState: AppReducerStateType
beforeEach(() => {
    startState = {
        status: "loading",
        error: null,
    }
})

test('loading status should be changed', () => {
    const action = changeAppStatusAC("succeed")
    const endState = appReducer(startState, action)

    expect(endState.status).toBe("succeed")
})

test('the error must be triggered', () => {

    const action = setErrorAC("ERROR")
    const endState = appReducer(startState, action)

    expect(endState.error).toBe("ERROR")
})
