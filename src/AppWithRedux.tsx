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
    changeTodoListTitleAC, FilterValuesType, removeTodoListAC, TodoListDomainType,
} from "./reducers/todolist-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TaskStateType,
    TaskStatuses
} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./reducers/store";

function AppWithRedux() {

    let todoLists = useSelector<AppRootStateType, TodoListDomainType[]>((state) => state.todoLists)
    let tasks = useSelector<AppRootStateType, TaskStateType>((state) => state.tasks)

    let dispatch = useDispatch()

    const changeFilter = useCallback((filterValue: FilterValuesType, todoListID: string) => {
        dispatch(changeTodoListFilterAC(filterValue, todoListID))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        let action = addTodoListAC(title)
        dispatch(action)
    }, [dispatch])

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(changeTodoListTitleAC(title, todoListID))
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        let action = removeTodoListAC(todoListID)
        dispatch(action)
    }, [dispatch])

    const changeStatus = useCallback((taskID: string, status: TaskStatuses, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskID, status, todoListID))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListID))
    }, [dispatch])

    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID))
    }, [dispatch])

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }, [dispatch])

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
