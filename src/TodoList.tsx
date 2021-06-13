import React, {useCallback, useEffect} from 'react';
import './App.css';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import Task from "./Task";
import {fetchTasksTC} from "./reducers/tasks-reducer";
import {useDispatch} from "react-redux";
import {FilterValuesType, TaskStatuses, TaskType} from "./api/Todo-list-api";


export type TodoListPropsType = {
    id: string
    title: string;
    tasks: Array<TaskType>;
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void;
    changeFilter: (FilterValue: FilterValuesType, todoListID: string) => void;
    addTask: (title: string, todoListID: string) => void;
    changeStatus: (taskID: string, status: TaskStatuses, todoListID: string) => void;
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void;
    changeTodoListTitle: (title: string, todoListID: string) => void;
}


const TodoList = React.memo((props: TodoListPropsType) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])

    const removeTask = (taskID: string) => {
        props.removeTask(taskID, props.id);
    }
    const changeStatus = (taskID: string, taskStatus: TaskStatuses) => {
        props.changeStatus(taskID, taskStatus, props.id);
    }
    const changeTitle = (taskID: string, title: string) => {
        props.changeTaskTitle(taskID, title, props.id)
    }

    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    }, [props.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("active", props.id)
    }, [props.id])
    const onCompleteClickHandler = useCallback(() => {
        props.changeFilter("completed", props.id)
    }, [props.id])

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.id, props.addTask])
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.id)
    }, [props.changeTodoListTitle, props.id])

    let taskForTodoList = props.tasks;
    if (props.filter === "active") {
        taskForTodoList = taskForTodoList.filter(t => !t.status)
    }
    if (props.filter === "completed") {
        taskForTodoList = taskForTodoList.filter(t => t.status)
    }

    const tasks = taskForTodoList.map(taskObj => {
        return (
            <Task
                key={ taskObj.id }
                task={ taskObj }
                changeTaskTitle={ changeTitle }
                changeTaskStatus={ changeStatus }
                deleteTask={ removeTask }
            />
        )
    });

    return <div>
        <div>
            <h3><EditableSpan
                title={ props.title }
                changeItem={ changeTodoListTitle }/>
                <IconButton onClick={ removeTodoList }>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={ addTask }/>
            <ul className={ "list-style" }>
                { tasks }
            </ul>
            <div>
                <Button
                    color={ props.filter === "all" ? "secondary" : "primary" }
                    variant={ "outlined" }
                    size={ "small" }
                    onClick={ onAllClickHandler }>All
                </Button>
                <Button
                    color={ props.filter === "active" ? "secondary" : "primary" }
                    variant={ "outlined" }
                    size={ "small" }
                    onClick={ onActiveClickHandler }>Active
                </Button>
                <Button
                    color={ props.filter === "completed" ? "secondary" : "primary" }
                    variant={ "outlined" }
                    size={ "small" }
                    onClick={ onCompleteClickHandler }>Completed
                </Button>
            </div>
        </div>
    </div>
})

export default TodoList;