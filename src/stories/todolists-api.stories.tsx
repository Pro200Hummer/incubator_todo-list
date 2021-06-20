import React, {ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useState} from 'react';
import {TextField} from "@material-ui/core";
import {TaskAPIType, todoListApi, TodoListType} from "../api/Todo-list-api";


export default {
    title: "Todo-list-API"
}


export const TodoListsAPI = () => {
    /* States for TodoList, and input handlers */
    const [todoLists, setTodoLists] = useState<TodoListType[] | null>(null)
    const [addList, setAddList] = useState<string>("")

    /* Retrieving lists on page load */
    useEffect(() => {
        todoListApi.getTodoLists()
            .then(res => {
                setTodoLists(res.data);
            })
    }, []);


    /* Input handlers */
    const onChangeAddListHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAddList(e.currentTarget.value)
    }

    /* Buttons handlers */
    const onClickAddListHandler = (e: MouseEvent<HTMLButtonElement>) => {
        todoListApi.createTodoList(addList)
            .then(res => {
                if (res.data.resultCode === 1) {
                    setAddList(res.data.messages[0])
                }
            })
        setAddList("")
    }
    const onClickDeleteListHandler = (todoListID: string) => {
        todoListApi.deleteTodoList(todoListID)
            .then(res => {
                // Error handler
            })
    }

    const changeListTitle = (todoListID: string, newTitle: string) => {
        todoListApi.updateTodoList(todoListID, newTitle)
            .then(res => {
                // Error handler
            })
    }

    /* UI */
    return (
        <div>
            <input type="text" value={ addList } onChange={ onChangeAddListHandler }/>
            <button onClick={ onClickAddListHandler }>Add List</button>
            {
                todoLists && todoLists.map((s) => {
                    const deleteList = (e: MouseEvent<HTMLButtonElement>) => {
                        onClickDeleteListHandler(s.id)
                    }
                    const changeItem = (title: string) => {
                        changeListTitle(s.id, title)
                    }
                    return (
                        <div>
                            <EditableSpan title={ s.title } changeItem={ changeItem }/>
                            <button onClick={ deleteList }>X</button>
                            <TasksAPI todoListID={ s.id }/>
                            <hr/>
                        </div>
                    )
                })
            }
        </div>
    )
};


/* Tasks Component */
type TasksAPIPropsType = {
    todoListID: string
}
const TasksAPI = (props: TasksAPIPropsType) => {
    const {
        todoListID
    } = props

    /* States for Tasks and input handlers */
    const [tasks, setTasks] = useState<TaskAPIType | null>(null)
    const [addTask, setAddTask] = useState<string>("")

    /* Retrieving lists on page load */
    useEffect(() => {
        todoListApi.getTasks(todoListID)
            .then(res => {
                setTasks(res.data);
            })

    }, []);

    /* Input handlers */
    const onChangeAddTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAddTask(e.currentTarget.value)
    }

    /* Buttons handlers */
    const onClickAddTaskHandler = (e: MouseEvent<HTMLButtonElement>) => {
        todoListApi.createTask(todoListID, addTask)
            .then(res => {
                // Error handler
            })
        setAddTask("")
    }
    const onClickDeleteTaskHandler = (taskID: string) => {
        todoListApi.deleteTask(todoListID, taskID)
            .then(res => {
                // Error handler
            })
    }
    const changeTaskTitle = (todoListID: string, taskID: string, newTitle: string) => {
        todoListApi.updateTask(todoListID, taskID, {
            title: newTitle
        })
            .then(res => {
                // Error handler
            })
    }

    /* UI */
    return (
        <div>
            <input type="text" value={ addTask } onChange={ onChangeAddTaskHandler }/>
            <button onClick={ onClickAddTaskHandler }>Add Task</button>
            <ul>
                {
                    tasks && tasks.items.map((s) => {
                        const deleteTask = () => {
                            onClickDeleteTaskHandler(s.id)
                        }
                        const changeItem = (title: string) => {
                            changeTaskTitle(s.todoListId, s.id, title)
                        }
                        return (
                            <>
                                <li><EditableSpan title={s.title} changeItem={changeItem}/></li>
                                <button onClick={ deleteTask }>X</button>
                                <hr/>
                            </>
                        )
                    })
                }
            </ul>

        </div>
    )
}

/* Component to change some title */
type EditableSpanPropsType = {
    title: string
    changeItem: (title: string) => void
}

const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log("EditSpan clicked")
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => {
        setEditMode(true)
    }

    const offEditMode = () => {
        setEditMode(false)
        props.changeItem(title)
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") offEditMode()
    }

    return (
        editMode ?
            <TextField
                value={ title }
                autoFocus={ true }
                onBlur={ offEditMode }
                onChange={ changeTitle }
                onKeyPress={ onKeyPressEditMode! }
            /> :
            <span onDoubleClick={ onEditMode }>{ props.title }</span>
    );
})

/*------------------------------------------------------------------------------------*/
