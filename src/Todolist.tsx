import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addNewTask: (title: string) => void
}

export function Todolist(props: TodolistPropsType) {

    let [newTaskTitle, setNewTaskTitle] = useState("")

    const onNewTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13) {
            props.addNewTask(newTaskTitle)
            setNewTaskTitle("")
        }
    }

    const addTask = () => {
        props.addNewTask(newTaskTitle)
        setNewTaskTitle("")
    }

    const onAllClickHandler = () => {
        props.changeFilter("All")
    }

    const onActiveClickHandler = () => {
        props.changeFilter("Active")
    }

    const onCompletedClickHandler = () => {
        props.changeFilter("Completed")
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onNewTitleChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.map(el => {
                    const onRemoveHandler = () => {
                        props.removeTask((el.id))
                    }
                    return <li key={el.id}>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                        <button onClick={onRemoveHandler}>✖️</button>
                    </li>
                })}
            </ul>

            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    )
}