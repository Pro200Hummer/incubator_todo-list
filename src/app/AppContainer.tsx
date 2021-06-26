import React, {useEffect} from 'react'
import {App} from "./App";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializedAppAC} from "./app-reducer";
import {CircularProgress} from "@material-ui/core";

export const AppContainer = () => {
    console.log("app container")
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
    return <App/>
}