import React, {useReducer} from 'react';
/*import './App.css';
import TodoList from './TodoList';
import {v1} from "uuid";
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
    changeTodoListFilterAC, changeTodoListTitleAC,
    FilterValuesType, removeTodoListAC,
    todoListReducer
} from "./reducers/todolist-reducer";
import {
    addTaskAC, addTaskTC,
    changeTaskStatusAC, changeTaskTitleAC, removeTaskAC,
    tasksReducer,
    TaskStatuses, TodoTaskPriority
} from "./reducers/tasks-reducer";*/

/*
function AppWithReducers() {
    //BLL
    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, dispatchToTodoLists] = useReducer(todoListReducer, [
        {id: todoListID1, title: "What to learn", filter: "all", addedDate: "", order: 0},
        {id: todoListID2, title: "What to buy", filter: "all", addedDate: "", order: 0},
    ]);
    let [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todoListID1]: [
            {
                id: v1(), title: "HTML & CSS",
                status: TaskStatuses.Completed,
                todoListId: todoListID1,
                order: 0,
                priority: TodoTaskPriority.Low,
                startDate: "",
                deadline: "",
                addedDate: "",
                description: ""
            },
        ],
        [todoListID2]: [
            {
                id: v1(), title: "Milk",
                status: TaskStatuses.Completed,
                todoListId: todoListID2,
                order: 0,
                priority: TodoTaskPriority.Low,
                startDate: "",
                deadline: "",
                addedDate: "",
                description: ""
            },

        ],
    });


    function changeFilter(filterValue: FilterValuesType, todoListID: string) {
        dispatchToTodoLists(changeTodoListFilterAC(filterValue, todoListID))
    }
    function addTodoList(title: string) {
        let action = addTodoListAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }
    function changeTodoListTitle(title: string, todoListID: string) {
        dispatchToTodoLists(changeTodoListTitleAC(title, todoListID))
    }
    function removeTodoList(todoListID: string) {
        let action = removeTodoListAC(todoListID)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }


    function changeStatus(taskID: string, status: TaskStatuses, todoListID: string) {
        dispatchToTasks(changeTaskStatusAC(taskID, status, todoListID))
    }
    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        dispatchToTasks(changeTaskTitleAC(taskID, title, todoListID))
    }
    function removeTask(taskID: string, todoListID: string) {
        dispatchToTasks(removeTaskAC(taskID, todoListID))
    }
    function addTask (title: string, todoListID: string) {
        dispatchToTasks(addTaskTC(todoListID, title))
    }

    const content = todoLists.map(tl => {
        let taskForTodoList = tasks[tl.id]
        if (tl.filter === "active") {
            taskForTodoList = tasks[tl.id].filter(t => t.status === TaskStatuses.New)
        }
        if (tl.filter === "completed") {
            taskForTodoList = tasks[tl.id].filter(t => t.status === TaskStatuses.Completed)
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

export default AppWithReducers;
*/
