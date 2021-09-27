import React, {useCallback} from "react";
import {Login} from "./Login";
import {useDispatch} from "react-redux";
import {LoginParamsType} from "../../api/auth-api";
import {Redirect} from "react-router-dom";
import {useAppSelector} from "../../app/hooks";
import {setIsLoggedIn} from "./auth-reducer";


export const LoginContainer: React.FC = React.memo(() => {

    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const loginHandler = useCallback((loginData: LoginParamsType) => {
       dispatch(setIsLoggedIn(loginData))
    }, [])

    if(isLoggedIn){
        return <Redirect to={'/'}/>
    }

    return <Login loginHandler={loginHandler}/>
})