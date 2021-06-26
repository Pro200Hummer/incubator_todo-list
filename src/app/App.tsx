import React from 'react';
import HeaderContainer from "../features/Header/HeaderContainer";
import ErrorSnackbarContainer from "../components/ErrorSnackbar/ErroSnackbarContainer";
import {Routes} from "../features/Routes";
import {BrowserRouter} from "react-router-dom";


const App: React.FC = () => {
    return (
        <div>
            <BrowserRouter>
                <HeaderContainer/>
                <Routes/>
                <ErrorSnackbarContainer/>
            </BrowserRouter>
        </div>

    )
}

export default App;
