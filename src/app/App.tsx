import React, {useEffect} from 'react';
import HeaderContainer from "../features/Header/HeaderContainer";
import ErrorSnackbarContainer from "../components/ErrorSnackbar/ErroSnackbarContainer";
import {Routes} from "../features/Routes";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializedAppAC} from "./app-reducer";
import {CircularProgress} from "@material-ui/core";

export const App: React.FC = () => {
    console.log("app")
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializedAppAC())
    }, [])

    if (!isInitialized) {
        return (
            <div style={ {position: 'fixed', top: '30%', textAlign: 'center', width: '100%'} }>
                <CircularProgress/>
            </div>
        )
    }
    return (
        <div>
            <HeaderContainer/>
            <Routes/>
            <ErrorSnackbarContainer/>
        </div>

    )
}
