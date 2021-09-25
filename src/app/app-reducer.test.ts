import {appReducer, AppReducerStateType, changeAppStatus, setError, setIsInitialized} from "./app-reducer";


let startState: AppReducerStateType
beforeEach(() => {
    startState = {
        status: "loading",
        error: null,
        isInitialized: false,
    }
})

test('loading status should be changed', () => {
    const action = changeAppStatus("succeed")
    const endState = appReducer(startState, action)

    expect(endState.status).toBe("succeed")
})

test('the error must be triggered', () => {

    const action = setError("ERROR")
    const endState = appReducer(startState, action)

    expect(endState.error).toBe("ERROR")
})

test('initialized status should be changed', () => {

    const action = setIsInitialized(true)
    const endState = appReducer(startState, action)

    expect(endState.isInitialized).toBeTruthy()
})
