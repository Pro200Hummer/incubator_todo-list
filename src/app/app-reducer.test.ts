import {appReducer, changeAppStatus, setError} from "./app-reducer";
import { AppReducerStateType } from "./app-types";


let startState: AppReducerStateType
beforeEach(() => {
    startState = {
        status: "loading",
        error: null,
        isInitialized: false,
        modal:{
            modalStatus: "no-status",
            itemID: 'someID',
            modalTitle: 'someTitle',
            isOpen: false
        }
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

