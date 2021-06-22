import React from "react";
import Header from "./Header";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {AppReducerStateType} from "../../reducers/app-reducer";


const HeaderContainer = React.memo(() => {
    const {
        status,
    } = useSelector<AppRootStateType, AppReducerStateType>((state) => state.appAspects)

    return (
        <Header status={status}/>
    )
});
export default HeaderContainer;