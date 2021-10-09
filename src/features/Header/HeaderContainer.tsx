import React, {useCallback} from "react";
import Header from "./Header";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../../app/hooks";
import {asyncAuthActions} from "../Login/auth-reducer";


const HeaderContainer = React.memo(() => {

    const status = useAppSelector((state) => state.app.status)
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    const logoutClickHandler = useCallback(() => {
        dispatch(asyncAuthActions.logout())
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