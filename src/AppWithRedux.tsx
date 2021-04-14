import React, {useCallback} from 'react';
import './App.css';
import TodoList from './TodoList';
import AddItemForm from "./AddItemForm";
import {AppBar, Container} from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import {Menu} from "@material-ui/icons";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC, removeTodoListAC,
} from "./reducers/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";

export type FilterValuesType = "all" | "active" | "completed";
export type TaskType = {
    id: string
    title: string
    isDone: boolean
};
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
};

export type TaskStateType = {
    [key: string]: TaskType[]
};

function AppWithRedux() {

    let todoLists = useSelector<AppRootStateType, TodoListType[]>((state) => state.todoLists)
    let tasks = useSelector<AppRootStateType, TaskStateType>((state) => state.tasks)

    let dispatch = useDispatch()

    const changeFilter = useCallback((filterValue: FilterValuesType, todoListID: string) => {
        dispatch(changeTodoListFilterAC(filterValue, todoListID))
    }, [])

    const addTodoList = useCallback((title: string) => {
        let action = addTodoListAC(title)
        dispatch(action)
    }, [])

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(changeTodoListTitleAC(title, todoListID))
    }, [])

    const removeTodoList = useCallback((todoListID: string) => {
        let action = removeTodoListAC(todoListID)
        dispatch(action)
    }, [])


    const changeStatus = useCallback((taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
    }, [])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListID))
    }, [])

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID))
    }, [])

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }, [])

    const content = todoLists.map(tl => {
        return (
            <Grid item key={ tl.id }>
                <Paper elevation={ 10 } style={ {padding: "10px"} }>
                    <TodoList
                        id={ tl.id }
                        title={ tl.title }
                        tasks={ tasks[tl.id] }
                        removeTask={ removeTask }
                        changeFilter={ changeFilter }
                        addTask={ addTask }
                        changeStatus={ changeStatus }
                        changeTaskTitle={ changeTaskTitle }
                        changeTodoListTitle={ changeTodoListTitle }
                        filter={ tl.filter }
                        removeTodoList={ removeTodoList }
                    />
                </Paper>
            </Grid>
        )
    })
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed={ true }>
                <Grid container style={ {margin: "20px 0px"} }>
                    <AddItemForm addItem={ addTodoList }/>
                </Grid>
                <Grid container spacing={ 2 }>{ content }</Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;
