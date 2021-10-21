import React, {MouseEvent, useCallback} from 'react';
import '../../app/App.css'
import EditableSpan from "../../components/EditableSpan/EditableSpan";
import {Button, Tooltip} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {AddCircle, Delete} from "@material-ui/icons";
import TaskContainer from "./Task/TaskContainer";
import {TodoListDomainType} from "./todo-list-types";
import {changeModalStatus} from "../../utils/app-utils";
import {useAppDispatch} from "../../app/hooks";

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
    const dispatch = useAppDispatch();

    const {
        todoList,
        disable,
        removeTodoList,
        changeTodoListFilter,
        changeTodoListTitle,
    } = props

    const changeFilter = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        changeTodoListFilter(e.currentTarget.dataset.filter, todoList.id)
    }, [changeTodoListFilter, todoList.id])

    const deleteTodoList = useCallback(() => {
        removeTodoList(todoList.id)
    }, [removeTodoList, todoList.id])

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
                <Tooltip title={`Delete List: ${todoList.title}`}>
                    <IconButton onClick={ deleteTodoList } disabled={disable}>
                        <Delete/>
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Add Task"}>
                    <IconButton onClick={e => changeModalStatus(e, dispatch, todoList.id)}>
                        <AddCircle
                            fontSize={"medium"}
                            color={'primary'}
                            data-action={"add-task"}
                        />
                    </IconButton>
                </Tooltip>
            </h3>
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