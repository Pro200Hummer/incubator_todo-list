import React, {useCallback, useEffect} from 'react'
import {useDispatch} from "react-redux";
import Grid from "@material-ui/core/Grid";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import {Container, IconButton} from "@material-ui/core";
import {AddCircle} from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
import TodoList from "./TodoList";
import { Redirect } from 'react-router-dom';
import {useAppSelector} from "../../app/hooks";
import {
    asyncTodoListActions,
    changeTodoListFilterAC
} from "./todolist-reducer";
import {asyncTasksActions} from "./Task/tasks-reducer";
import {changeModalStatus} from "../../utils/app-utils";



const TodoListContainer = React.memo(() => {
    console.log("todo list container")
    const todoLists = useAppSelector((state) => state.todoLists)
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        if(!isLoggedIn){
            return
        }
        dispatch(asyncTodoListActions.fetchTodoLists())
    }, [dispatch, isLoggedIn])

    const changeTodoListFilterCallback = useCallback((trigger: string | undefined, todoListID: string) => {
        switch (trigger) {
            case "all":
                return dispatch(changeTodoListFilterAC({filter: "all", id:todoListID}))
            case "active":
                return dispatch(changeTodoListFilterAC({filter: "active", id:todoListID}))
            case "completed":
                return dispatch(changeTodoListFilterAC({filter: "completed", id:todoListID}))
            default:
                return dispatch(changeTodoListFilterAC({filter: "all", id:todoListID}))
        }
    }, [dispatch])

    const addTodoListCallback = useCallback((todoListTitle: string) => {
        dispatch(asyncTodoListActions.createTodoList(todoListTitle))
    }, [dispatch])

    const changeTodoListTitleCallback = useCallback((title: string, todoListID: string) => {
        dispatch(asyncTodoListActions.changeTodoListTitle({title, todoListID}))
    }, [dispatch])

    const removeTodoListCallback = useCallback((todoListID: string) => {
        dispatch(asyncTodoListActions.deleteTodoList(todoListID))
    }, [dispatch])

    const addTaskForTodoListCallback = useCallback((taskTitle: string, todoListID: string) => {
        dispatch(asyncTasksActions.addTask({todoListID, taskTitle}))
    }, [dispatch])

    const content = todoLists.map(tl => {
        const disable = tl.entityStatus === "loading"
        return (
            <Grid item key={ tl.id }>
                <Paper elevation={ 10 } style={ {padding: "10px"} }>
                    <TodoList
                        todoList={tl}
                        disable={disable}
                        changeTodoListFilter={ changeTodoListFilterCallback }
                        addTaskForTodoList={ addTaskForTodoListCallback }
                        changeTodoListTitle={ changeTodoListTitleCallback }
                        removeTodoList={ removeTodoListCallback }
                    />
                </Paper>
            </Grid>
        )
    })

    if(!isLoggedIn){
        return <Redirect to={'/login'}/>
    }

    return (
        <Container fixed={ true }>
            <Grid container style={ {margin: "20px 0px"} }>
                <AddItemForm addItem={ addTodoListCallback }/>
                <IconButton onClick={e => changeModalStatus(e, dispatch)}>
                    <AddCircle
                        fontSize={"large"}
                        color={'primary'}
                        data-action={"add-list"}
                    />
                </IconButton>
            </Grid>
            <Grid container spacing={ 2 }>
                { content }
            </Grid>
        </Container>
    )
})
export default TodoListContainer