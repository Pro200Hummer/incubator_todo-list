import {appReducer, AppReducerStateType, changeAppStatusAC, changeButtonStatusAC} from "./app-reducer";


let startState: AppReducerStateType
beforeEach(() => {
    startState = {
        appStatus: "loading",
        todoListLoadingStatus: "loading",
        buttonDisable: false
    }
})

test('loading status should be changed', () => {
    const action = changeAppStatusAC("succeed")
    const endState = appReducer(startState, action)

    expect(endState.appStatus).toBe("succeed")
})
test('button status should be changed', () => {
    const action = changeButtonStatusAC()
    const endState = appReducer(startState, action)

    expect(endState.buttonDisable).toBe(true)
})