import React, {useCallback} from "react";
import Header from "./Header";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {RequestStatusType} from "../../app/app-reducer";
import {removeLoginTC} from "../Login/auth-reducer";


const HeaderContainer = React.memo(() => {

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    const logoutClickHandler = useCallback(() => {
        dispatch(removeLoginTC())
    }, [dispatch])

    return (
        <Header
            status={status}
            isLoggedIn={isLoggedIn}
            logoutClickHandler={logoutClickHandler}
        />
    )
});
export default HeaderContainer;