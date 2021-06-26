import {authReducer, AuthReducerStateType, setIsLoggedInAC} from "./auth-reducer";

let startState: AuthReducerStateType
beforeEach(() => {
    startState = {
        isLoggedIn: false
    }
})

test('loading status should be changed', () => {
    const action = setIsLoggedInAC(true)
    const endState = authReducer(startState, action)

    expect(endState.isLoggedIn).toBeTruthy()
})

