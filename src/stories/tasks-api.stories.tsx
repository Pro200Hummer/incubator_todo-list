import React, {useEffect, useState} from 'react';
import {TaskAPIType, tasksAPI} from "../api/TaskAPI";

export default {
    title: "TASKS API"
}

export const GetTasks = () => {
    const [state, setState] = useState<TaskAPIType | null>(null)
    useEffect(() => {
        const todoListID = '13c6b00d-6b35-42b6-84c5-84a5f311209f'
        tasksAPI.getTasks(todoListID)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return (
        <>
            { state && state.items.map((s) => {
                return(
                    <div>
                        <p>{s.title}</p>
                        <p>Todo List ID: {s.todoListId}</p>
                        <p>Task ID: {s.id}</p>
                        <p>{s.status}</p>
                        <hr/>
                    </div>
                )
            })}
        </>
    )
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListID = '13c6b00d-6b35-42b6-84c5-84a5f311209f'
        tasksAPI.createTask(todoListID, "to game")
            .then(res => {
                setState(res.data)
            })
    }, [])

    return (
        <div>{ JSON.stringify(state) }</div>
    )
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListID = '13c6b00d-6b35-42b6-84c5-84a5f311209f'
        const taskID = 'df47ea34-e933-440a-9bb3-93041d9de102'
        tasksAPI.deleteTask(todoListID, taskID)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return (
        <div>{ JSON.stringify(state) }</div>
    )
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListID = '13c6b00d-6b35-42b6-84c5-84a5f311209f'
        const taskID = 'ce4d65ad-0cd5-4c47-a766-f7fe69998d61'
        tasksAPI.updateTask(todoListID, taskID, "REACT>>>>")
            .then(res => {
                setState(res.data)
            })
    }, [])

    return (
        <div>{ JSON.stringify(state) }</div>
    )
}