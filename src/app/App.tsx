import React, {useEffect} from 'react';
import HeaderContainer from "../features/Header/HeaderContainer";
import ErrorSnackbarContainer from "../components/ErrorSnackbar/ErroSnackbarContainer";
import {Routes} from "../features/Routes";

export const App: React.FC = React.memo(() => {
    return (
        <div>
            <HeaderContainer/>
            <Routes/>
            <ErrorSnackbarContainer/>
        </div>

    )
})
