import React, {useState} from 'react';
import './App.css';
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
import {FilterValuesType, TaskStatuses, TaskType, TodoListDomainType, TodoTaskPriority} from "./api/Todo-list-api";
import {TaskStateType} from "./reducers/tasks-reducer";

function App() {
    //BLL
    const todoListID1 = v1();
    const todoListID2 = v1();

    const [todoLists, setTodoLists] = useState<TodoListDomainType[]>([
        {id: todoListID1, title: "What to learn", filter: "all", addedDate: "", order: 0},
        {id: todoListID2, title: "What to buy", filter: "all", addedDate: "", order: 0},
    ]);
    const [tasks, setTasks] = useState<TaskStateType>({
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
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = filterValue
            setTodoLists([...todoLists])
        }
    }

    function addTodoListAC(title: string) {
        const newTodoListID = v1();
        const newTodoList: TodoListDomainType = {
            id: newTodoListID, title: title, filter: "all", order: 0, addedDate: ""
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.title = title
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
        setTasks({...tasks})
    }


    function changeStatus(taskID: string, status: TaskStatuses, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task: TaskType | undefined = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.status = status
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task: TaskType | undefined = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    function removeTask(taskID: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.filter(task => task.id !== taskID)
        setTasks({...tasks})
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            status: TaskStatuses.New,
            todoListId: todoListID2,
            order: 0,
            priority: TodoTaskPriority.Low,
            startDate: "",
            deadline: "",
            addedDate: "",
            description: ""
        }
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = [newTask, ...todoListTasks]
        setTasks({...tasks})
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
                <Paper elevation={ 10 } style={ {padding: "10px"} }>
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
            <Container fixed={ true }>
                <Grid container style={ {margin: "20px 0px"} }>
                    <AddItemForm addItem={ addTodoListAC }/>
                </Grid>
                <Grid container spacing={ 2 }>{ content }</Grid>
            </Container>
        </div>
    )
}

export default App;
