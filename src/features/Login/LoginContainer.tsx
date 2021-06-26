import React, {useCallback} from "react";
import {Login} from "./Login";
import {useDispatch, useSelector} from "react-redux";
import {setIsLoggedInTC} from "./auth-reducer";
import {LoginParamsType} from "../../api/auth-api";
import {AppRootStateType} from "../../app/store";
import {Redirect} from "react-router-dom";


export const LoginContainer: React.FC = React.memo(() => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const loginHandler = useCallback((loginData: LoginParamsType) => {
        dispatch(setIsLoggedInTC(loginData))
    }, [dispatch])

    if(isLoggedIn){
        return <Redirect to={'/'}/>
    }

    return <Login loginHandler={loginHandler}/>
})