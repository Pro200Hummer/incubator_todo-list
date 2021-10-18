import React, {useCallback} from "react";
import {Login} from "./Login";
import {Redirect} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {asyncAuthActions, login} from "./auth-reducer";
import {LoginParamsType} from "../../api/api-types";


export const LoginContainer: React.FC = React.memo(() => {

    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const loginHandler = useCallback(async (loginData: LoginParamsType) => {
        const action = await dispatch(asyncAuthActions.login(loginData))
        if(login.rejected.match(action)){
            if(action.payload?.fieldsErrors?.length){
                return action.payload.fieldsErrors
            }
        }
    }, [dispatch])

    if(isLoggedIn){
        return <Redirect to={'/'}/>
    }

    return <Login loginHandler={loginHandler}/>
})