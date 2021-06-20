import React from 'react';
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import HeaderContainer from "./components/Header/HeaderContainer";
import TodoListContainer from "./components/TodoList/TodoListContainer";


const App = () => {
    return (
        <div>
            <ErrorSnackbar/>
            <HeaderContainer/>
            <TodoListContainer/>
        </div>
    )
}

export default App;
