import {AuthInitialStateType, authReducer, setIsLoggedInAC} from "./auth-reducer";

let startState: AuthInitialStateType
beforeEach(() => {
    startState = {
        isLoggedIn: false
    }
})

test('login status should be changed', () => {

    const action = setIsLoggedInAC(true)
    const endState = authReducer(startState, action)

    expect(endState.isLoggedIn).toBe(true)
})

