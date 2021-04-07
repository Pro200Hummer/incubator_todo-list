import React from 'react';
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
    //BLL
    /*let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, dispatchToTodoLists] = useReducer(todoListReducer, [
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"},
    ]);
    let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todoListID1]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "TypeScript", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Beer", isDone: false},
            {id: v1(), title: "Meat", isDone: false},
            {id: v1(), title: "Chips", isDone: false},
        ],
    });*/

    let todoLists = useSelector<AppRootStateType, TodoListType[]>((state) => state.todoLists)
    let tasks = useSelector<AppRootStateType, TaskStateType>((state) => state.tasks)

    let dispatch = useDispatch()

    function changeFilter(filterValue: FilterValuesType, todoListID: string) {
        dispatch(changeTodoListFilterAC(filterValue, todoListID))
    }
    function addTodoList(title: string) {
        let action = addTodoListAC(title)
        dispatch(action)
    }
    function changeTodoListTitle(title: string, todoListID: string) {
        dispatch(changeTodoListTitleAC(title, todoListID))
    }
    function removeTodoList(todoListID: string) {
        let action = removeTodoListAC(todoListID)
        dispatch(action)
    }


    function changeStatus(taskID: string, isDone: boolean, todoListID: string) {
        dispatch(changeTaskStatusAC(taskID, isDone, todoListID))
    }
    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        dispatch(changeTaskTitleAC(taskID, title, todoListID))
    }
    function removeTask(taskID: string, todoListID: string) {
        dispatch(removeTaskAC(taskID, todoListID))
    }
    function addTask (title: string, todoListID: string) {
        dispatch(addTaskAC(title, todoListID))
    }

    const content = todoLists.map(tl => {
        let taskForTodoList = tasks[tl.id]
        if (tl.filter === "active") {
            taskForTodoList = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === "completed") {
            taskForTodoList = tasks[tl.id].filter(t => t.isDone)
        }
        return (
            <Grid item key={ tl.id }>
                <Paper elevation={10} style={{padding: "10px"}} >
                    <TodoList
                        id={ tl.id }
                        title={ tl.title }
                        tasks={ taskForTodoList }
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
            <Container fixed={true}>
                <Grid container style={{margin:"20px 0px"}}>
                    <AddItemForm addItem={ addTodoList }/>
                </Grid>
                <Grid container spacing={2}>{ content }</Grid>
            </Container>
        </div>
    )
}

export default AppWithRedux;
