import React, {useCallback, useEffect} from 'react'
import {useDispatch} from "react-redux";
import Grid from "@material-ui/core/Grid";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import {Container} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TodoList from "./TodoList";
import { Redirect } from 'react-router-dom';
import {useAppSelector} from "../../app/hooks";
import {
    changeTodoListFilterAC,
    changeTodoListTitle,
    createTodoList,
    deleteTodoList,
    fetchTodoLists
} from "./todolist-reducer";
import {addTask} from "./Task/tasks-reducer";


const TodoListContainer = React.memo(() => {
    console.log("todo list container")
    const todoLists = useAppSelector((state) => state.todoLists)
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        if(!isLoggedIn){
            return
        }
        dispatch(fetchTodoLists())
    }, [])

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
        dispatch(createTodoList(todoListTitle))
    }, [dispatch])

    const changeTodoListTitleCallback = useCallback((title: string, todoListID: string) => {
        dispatch(changeTodoListTitle({title, todoListID}))
    }, [dispatch])

    const removeTodoListCallback = useCallback((todoListID: string) => {
        dispatch(deleteTodoList(todoListID))
    }, [dispatch])

    const addTaskForTodoListCallback = useCallback((taskTitle: string, todoListID: string) => {
        dispatch(addTask({todoListID, taskTitle}))
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
            </Grid>
            <Grid container spacing={ 2 }>
                { content }
            </Grid>
        </Container>
    )
})
export default TodoListContainer