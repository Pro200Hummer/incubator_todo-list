import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import TodoListContainer from "./TodoList/TodoListContainer";
import {LoginContainer} from "./Login/LoginContainer";


export const PATH = {
    TODO_LIST: "/",
    LOGIN: "/login",
    ERROR_404: '/404'
}

export const Routes = () => {
    return (
        <>
            <Switch>
                <Route exact path={PATH.TODO_LIST} render={() => <TodoListContainer/>}/>
                <Route path={PATH.LOGIN} render={() => <LoginContainer/>}/>
                <Route path={PATH.ERROR_404} render={() => <h1>404: PAGE NOT FOUND</h1>}/>
                <Redirect from={'*'} to={PATH.ERROR_404}/>
            </Switch>
        </>
    )
}