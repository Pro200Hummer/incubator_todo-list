import React, {useCallback, MouseEvent} from 'react';
import '../../App.css';
import AddItemForm from "../AddItemForm/AddItemForm";
import EditableSpan from "../EditableSpan/EditableSpan";
import {Button} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import {FilterValuesType} from "../../api/Todo-list-api";
import TaskContainer from "../Task/TaskContainer";

export type TodoListPropsType = {
    id: string
    title: string;
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    changeFilter: (trigger: string | undefined, todoListID: string) => void;
    changeTodoListTitle: (title: string, todoListID: string) => void;
    addTask: (title: string, todoListID: string) => void;
}


const TodoList: React.FC<TodoListPropsType> = React.memo(props => {

    const changeFilter = useCallback((e:MouseEvent<HTMLButtonElement>) => {
        props.changeFilter(e.currentTarget.dataset.filter, props.id)
    }, [props.id])

    const removeTodoList = useCallback(() => {
        props.removeTodoList(props.id)
    }, [props.id])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.id, props.addTask])

    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.id)
    }, [props.changeTodoListTitle, props.id])

    return <div>
        <div>
            <h3>
                <EditableSpan
                    title={ props.title }
                    changeItem={ changeTodoListTitle }
                />
                <IconButton onClick={ removeTodoList }>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={ addTask }/>
            <ul className={ "list-style" }>
                <TaskContainer todoListID={props.id} filter={props.filter}/>
            </ul>
            <div>
                <Button
                    data-filter="all"
                    color={ props.filter === "all" ? "secondary" : "primary" }
                    variant={ "outlined" }
                    size={ "small" }
                    onClick={ changeFilter }>All
                </Button>
                <Button
                    data-filter="active"
                    color={ props.filter === "active" ? "secondary" : "primary" }
                    variant={ "outlined" }
                    size={ "small" }
                    onClick={ changeFilter }>Active
                </Button>
                <Button
                    data-filter="completed"
                    color={ props.filter === "completed" ? "secondary" : "primary" }
                    variant={ "outlined" }
                    size={ "small" }
                    onClick={ changeFilter }>Completed
                </Button>
            </div>
        </div>
    </div>
})

export default TodoList;