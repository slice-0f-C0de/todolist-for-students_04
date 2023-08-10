import React, {useState} from 'react';
import './App.css';
import {Todolist, TasksType} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "All" | "Active" | "Completed"


function App() {

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JavaScript", isDone: false},
        {id: v1(), title: "React", isDone: false}
    ])

    function addNewTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: true}
        let addTask = [newTask, ...tasks]
        setTasks(addTask)
    }

    let [filter, setFilter] = useState<FilterValuesType>("All")

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(el => el.id !== id)
        setTasks(filteredTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks(tasks)
    }

    let TasksForTodolist = tasks

    if (filter === "Active") {
        TasksForTodolist = tasks.filter((el) => el.isDone === false)
    }
    if (filter === "Completed") {
        TasksForTodolist = tasks.filter((el) => el.isDone === true)
    }


    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={TasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addNewTask={addNewTask}/>
        </div>
    );
}

export default App;
