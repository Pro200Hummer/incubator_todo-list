import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../reducers/store";
import {FilterValuesType, TodoListDomainType} from "../../api/Todo-list-api";
import {addTaskTC} from "../../reducers/tasks-reducer";
import {AppReducerStateType} from "../../reducers/app-reducer";
import Grid from "@material-ui/core/Grid";
import AddItemForm from "../AddItemForm/AddItemForm";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Container} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TodoList from "./TodoList";
import {
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    createTodoListTC,
    deleteTodoListTC, fetchTodoListsTC
} from "../../reducers/todolist-reducer";



const TodoListContainer = React.memo(() => {

    const todoLists = useSelector<AppRootStateType, TodoListDomainType[]>((state) => state.todoLists)

    const {
        todoListLoadingStatus,
    } = useSelector<AppRootStateType, AppReducerStateType>((state) => state.appAspects)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [])

    const changeFilter = useCallback((filterValue: FilterValuesType, todoListID: string) => {
        dispatch(changeTodoListFilterAC(filterValue, todoListID))
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

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskTC(todoListID, title))
    }, [dispatch])

    const content = todoLists.map(tl => {
        return (
            <Grid item key={ tl.id }>
                <Paper elevation={ 10 } style={ {padding: "10px"} }>
                    <TodoList
                        id={ tl.id }
                        title={ tl.title }
                        filter={ tl.filter }
                        changeFilter={ changeFilter }
                        addTask={ addTask }
                        changeTodoListTitle={ changeTodoListTitle }
                        removeTodoList={ removeTodoList }
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <Container fixed={ true }>
            <Grid container style={ {margin: "20px 0px"} }>
                <AddItemForm addItem={ addTodoList }/>
            </Grid>
            <Grid container spacing={ 2 }>
                { todoListLoadingStatus === 'loading' ? <CircularProgress className="preloader-position"/> : content }
            </Grid>
        </Container>
    )
})
export default TodoListContainer