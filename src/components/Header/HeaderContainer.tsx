import React from "react";
import Header from "./Header";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {AppReducerStateType} from "../../reducers/app-reducer";


const HeaderContainer = React.memo(() => {
    const {
        appStatus,
    } = useSelector<AppRootStateType, AppReducerStateType>((state) => state.appAspects)

    return (
        <Header appStatus={appStatus}/>
    )
});
export default HeaderContainer;