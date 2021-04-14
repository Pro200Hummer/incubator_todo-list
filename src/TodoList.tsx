import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType, TaskType} from "./App";
import './App.css';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";


export type TodoListPropsType = {
    id: string
    title: string;
    tasks: Array<TaskType>;
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void;
    changeFilter: (FilterValue: FilterValuesType, todoListID: string) => void;
    addTask: (title: string, todoListID: string) => void;
    changeStatus: (taskID: string, isDone: boolean, todoListID: string) => void;
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void;
    changeTodoListTitle: (title: string, todoListID: string) => void;
}

const TodoList = React.memo((props: TodoListPropsType) => {
    console.log("todoList clicked")
    let taskForTodoList = props.tasks;
    if (props.filter === "active") {
        taskForTodoList = taskForTodoList.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        taskForTodoList = taskForTodoList.filter(t => t.isDone)
    }
    const tasks = taskForTodoList.map(taskObj => {
        const removeTask = () => {
            props.removeTask(taskObj.id, props.id);
        }
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeStatus(taskObj.id, e.currentTarget.checked, props.id);
        }
        const changeTitle = (title: string) => {
            props.changeTaskTitle(taskObj.id, title, props.id)
        }
        return (
            <li key={ taskObj.id } className={ taskObj.isDone ? "is-done" : "" }>
                <Checkbox
                    color={"secondary"}
                    onChange={ changeStatus }
                    checked={ taskObj.isDone }
                />
                <EditableSpan title={ taskObj.title } changeItem={ changeTitle }/>
                <IconButton onClick={ removeTask }>
                    <Delete/>
                </IconButton>
            </li>
        )
    });

    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    }, [])
    const onActiveClickHandler = useCallback( () => {
        props.changeFilter("active", props.id)
    }, [])
    const onCompleteClickHandler = useCallback( () => {
        props.changeFilter("completed", props.id)
    }, [])

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const changeTodoListTitle = (title:string) => {
        props.changeTodoListTitle(title, props.id)
    }

    return <div>
        <div>
            <h3><EditableSpan
                title={ props.title }
                changeItem={changeTodoListTitle}/>
                <IconButton onClick={ removeTodoList }>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={ addTask }/>
            <ul className={"list-style"}>
                { tasks }
            </ul>
            <div>
                <Button
                    color={props.filter === "all" ? "secondary" : "primary"}
                    variant={"outlined"}
                    size={"small"}
                    onClick={ onAllClickHandler }>All
                </Button>
                <Button
                    color={props.filter === "active" ? "secondary" : "primary"}
                    variant={"outlined"}
                    size={"small"}
                    onClick={ onActiveClickHandler }>Active
                </Button>
                <Button
                    color={props.filter === "completed" ? "secondary" : "primary" }
                    variant={"outlined"}
                    size={"small"}
                    onClick={ onCompleteClickHandler }>Completed
                </Button>
            </div>
        </div>
    </div>
})

export default TodoList;