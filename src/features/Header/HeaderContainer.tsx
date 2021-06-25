import React from "react";
import Header from "./Header";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {AppReducerStateType} from "../../app/app-reducer";


const HeaderContainer = React.memo(() => {
    const {
        status,
    } = useSelector<AppRootStateType, AppReducerStateType>((state) => state.appAspects)

    return (
        <Header status={status}/>
    )
});
export default HeaderContainer;