import {AuthInitialStateType, authReducer} from "./auth-reducer";
import {asyncAppActions} from "../../app/app-reducer";

let startState: AuthInitialStateType
beforeEach(() => {
    startState = {
        isLoggedIn: false
    }
})

test('login status should be changed', () => {

    const anyVoid = () => {}

    const action = asyncAppActions.initializedApp.fulfilled(anyVoid(), 'requestId', anyVoid())
    const endState = authReducer(startState, action)

    expect(endState.isLoggedIn).toBeTruthy()
})

