import React from 'react';
import HeaderContainer from "./components/Header/HeaderContainer";
import TodoListContainer from "./components/TodoList/TodoListContainer";
import ErrorSnackbarContainer from "./components/ErrorSnackbar/ErroSnackbarContainer";


const App = () => {
    return (
        <div>
            <ErrorSnackbarContainer/>
            <HeaderContainer/>
            <TodoListContainer/>
        </div>
    )
}

export default App;
