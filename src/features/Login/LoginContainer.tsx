import React, {useCallback} from "react";
import {Login} from "./Login";
import {useDispatch} from "react-redux";
import {Redirect} from "react-router-dom";
import {useAppSelector} from "../../app/hooks";
import {asyncAuthActions} from "./auth-reducer";
import {LoginParamsType} from "../../api/api-types";


export const LoginContainer: React.FC = React.memo(() => {

    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const loginHandler = useCallback((loginData: LoginParamsType) => {
       dispatch(asyncAuthActions.login(loginData))
    }, [dispatch])

    if(isLoggedIn){
        return <Redirect to={'/'}/>
    }

    return <Login loginHandler={loginHandler}/>
})