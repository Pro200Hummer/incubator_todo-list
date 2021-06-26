import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {addTaskTC} from "./Task/tasks-reducer";
import Grid from "@material-ui/core/Grid";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import {Container} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TodoList from "./TodoList";
import {
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    createTodoListTC,
    deleteTodoListTC,
    fetchTodoListsTC, TodoListDomainType
} from "./todolist-reducer";
import { Redirect } from 'react-router-dom';


const TodoListContainer = React.memo(() => {
    console.log("todo list container")
    const todoLists = useSelector<AppRootStateType, TodoListDomainType[]>((state) => state.todoLists)
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        if(!isLoggedIn){
            return
        }
        dispatch(fetchTodoListsTC())
    }, [])

    const changeTodoListFilter = useCallback((trigger: string | undefined, todoListID: string) => {
        switch (trigger) {
            case "all":
                return dispatch(changeTodoListFilterAC("all", todoListID))
            case "active":
                return dispatch(changeTodoListFilterAC("active", todoListID))
            case "completed":
                return dispatch(changeTodoListFilterAC("completed", todoListID))
            default:
                return dispatch(changeTodoListFilterAC("all", todoListID))
        }

    }, [dispatch])

    const addTodoList = useCallback((todoListTitle: string) => {
        dispatch(createTodoListTC(todoListTitle))
    }, [dispatch])

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(changeTodoListTitleTC(title, todoListID))
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(deleteTodoListTC(todoListID))
    }, [dispatch])

    const addTaskForTodoList = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskTC(todoListID, title))
    }, [dispatch])

    const content = todoLists.map(tl => {
        const disable = tl.entityStatus === "loading"
        return (
            <Grid item key={ tl.id }>
                <Paper elevation={ 10 } style={ {padding: "10px"} }>
                    <TodoList
                        todoList={tl}
                        disable={disable}
                        changeTodoListFilter={ changeTodoListFilter }
                        addTaskForTodoList={ addTaskForTodoList }
                        changeTodoListTitle={ changeTodoListTitle }
                        removeTodoList={ removeTodoList }
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
                <AddItemForm addItem={ addTodoList }/>
            </Grid>
            <Grid container spacing={ 2 }>
                { content }
            </Grid>
        </Container>
    )
})
export default TodoListContainer