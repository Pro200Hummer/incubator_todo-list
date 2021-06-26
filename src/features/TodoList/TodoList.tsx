import React, {MouseEvent, useCallback} from 'react';
import '../../app/App.css';
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import EditableSpan from "../../components/EditableSpan/EditableSpan";
import {Button} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import TaskContainer from "./Task/TaskContainer";
import {TodoListDomainType} from "./todolist-reducer";

export type TodoListPropsType = {
    todoList: TodoListDomainType
    disable: boolean
    removeTodoList: (todoListID: string) => void
    changeTodoListFilter: (trigger: string | undefined, todoListID: string) => void;
    changeTodoListTitle: (title: string, todoListID: string) => void;
    addTaskForTodoList: (title: string, todoListID: string) => void;
}


const TodoList: React.FC<TodoListPropsType> = React.memo(props => {
    console.log("todolist")
    const {
        todoList,
        disable,
        removeTodoList,
        changeTodoListFilter,
        changeTodoListTitle,
        addTaskForTodoList,
    } = props

    const changeFilter = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        changeTodoListFilter(e.currentTarget.dataset.filter, todoList.id)
    }, [todoList.id])

    const deleteTodoList = useCallback(() => {
        removeTodoList(todoList.id)
    }, [todoList.id])

    const addTask = useCallback((title: string) => {
        addTaskForTodoList(title, todoList.id)
    }, [todoList.id, addTaskForTodoList])

    const changeTitle = useCallback((title: string) => {
        changeTodoListTitle(title, todoList.id)
    }, [changeTodoListTitle, todoList.id])

    return <div>
        <div>
            <h3>
                <EditableSpan
                    title={ props.todoList.title }
                    changeItem={ changeTitle }
                    disabled={disable}
                />
                <IconButton onClick={ deleteTodoList } disabled={disable}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={ addTask } disabled={disable}/>
            <ul className={ "list-style" }>
                <TaskContainer todoListID={ todoList.id } filter={ todoList.filter }/>
            </ul>
            <div>
                <Button
                    data-filter="all"
                    color={ todoList.filter === "all" ? "secondary" : "primary" }
                    variant={ "outlined" }
                    size={ "small" }
                    onClick={ changeFilter }>All
                </Button>
                <Button
                    data-filter="active"
                    color={ todoList.filter === "active" ? "secondary" : "primary" }
                    variant={ "outlined" }
                    size={ "small" }
                    onClick={ changeFilter }>Active
                </Button>
                <Button
                    data-filter="completed"
                    color={ todoList.filter === "completed" ? "secondary" : "primary" }
                    variant={ "outlined" }
                    size={ "small" }
                    onClick={ changeFilter }>Completed
                </Button>
            </div>
        </div>
    </div>
})

export default TodoList;