import React, {useEffect, useState} from 'react';
import {todoListAPI, TodoListAPIType} from "../api/TodoListAPI";

export default {
    title: "TODOLISTS API"
}

export const GetTodoLists = () => {
    const [state, setState] = useState<TodoListAPIType[] | null>(null)
    useEffect(() => {
        todoListAPI.getTodoLists()
            .then(res => {
                setState(res.data);
                console.log(res.data)
            })

    }, [])

    return (
        <>
            {
                state && state.map((s) => {
                    return(
                        <div>
                            <p>{s.title}</p>
                            <p>Todo List ID: {s.id}</p>
                            <hr/>
                        </div>
                    )
                })
            }
        </>
    )
}

export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListAPI.createTodoList("Some List")
            .then(res => {
                setState(res.data)
            })
    }, [])

    return (
        <div>{ JSON.stringify(state) }</div>
    )
}

export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListID = 'd546f89a-e570-40d6-b36b-c80b187a1527'
        todoListAPI.deleteTodoList(todoListID)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return (
        <div>{ JSON.stringify(state) }</div>
    )
}

export const UpdateTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListID = 'cbf5dbd0-597e-4db7-8859-12f20021852d'
        todoListAPI.updateTodoList(todoListID, "Some Title")
            .then(res => {
                setState(res.data)
            })
    }, [])

    return (
        <div>{ JSON.stringify(state) }</div>
    )
}