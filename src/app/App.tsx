import React, {useEffect} from 'react';
import HeaderContainer from "../features/Header/HeaderContainer";
import ErrorSnackbarContainer from "../components/ErrorSnackbar/ErroSnackbarContainer";
import {Routes} from "../features/Routes";
import {useDispatch} from "react-redux";
import {useAppSelector} from "./hooks";
import {initializedApp} from "./app-reducer";
import {ModalContainer} from "../components/Modal/ModalContainer";

export const App: React.FC = () => {
    console.log("app")
    const isInitialized = useAppSelector((state) => state.app.isInitialized)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializedApp())
    }, [dispatch])

   /* if (!isInitialized) {
        return (
            <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        )
    }*/
    return (
        <div>
            <HeaderContainer/>
            <Routes/>
            <ErrorSnackbarContainer/>
            <ModalContainer/>
        </div>

    )
}
