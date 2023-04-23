import React, { useState } from 'react';
import { MainPage } from './components/MainPage';
import './App.css';
import { v1 } from 'uuid';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
}

export type FilteredValuesType = 'all' | 'complete' | 'active';

function App() {

  //Local State
  let titles = ['What to learn', 'Movies']

  let iniTasks1: Array<TaskType> = [
    { id: v1(), title: 'CSS', isDone: true },
    { id: v1(), title: 'HTML', isDone: false },
    { id: v1(), title: 'React', isDone: true }
  ]


  let iniTasks2: Array<TaskType> = [
    { id: v1(), title: 'Muvy 43', isDone: false },
    { id: v1(), title: 'Balto', isDone: true },
    { id: v1(), title: 'Legends', isDone: true },
  ]

  //useState
  const [tasks1, setTasks1] = useState(iniTasks1)
  const [tasks2, setTasks2] = useState(iniTasks2)
  const [filter, setFilter] = useState<FilteredValuesType>('all')
  const [error, setError] = useState(false)

  //Future Action
  const removeTasks1 = (id: string) => {
    setTasks1(tasks1.filter((el) => el.id !== id))
  }
  const changeFilter = (value: FilteredValuesType) => {
    setFilter(value)
  }
  const changeStatus = (id: string, isDone: boolean) => {
    const findItem = tasks1.find((e) => e.id === id);
    if (findItem) {
      findItem.isDone = isDone
    }
    let copy = [...tasks1]
    setTasks1(copy)
  }
  const addTask = (newTitle: string) => {
    let newTask = { id: v1(), title: newTitle, isDone: false }
    let newTasks = [newTask, ...tasks1]
    setTasks1(newTasks)
  }

  let filteredTasks = tasks1

  if (filter === 'active') {
    filteredTasks = tasks1.filter(el => el.isDone === false)
  }
  if (filter === 'complete') {
    filteredTasks = tasks1.filter(el => el.isDone === true)
  }

  //Refactoring
  const MainComponent = titles.map((el, ind) => {
    return <MainPage error={error} setError={setError} changeStatus={changeStatus} removeTasks1={removeTasks1} title={el} addTask={addTask} changeFilter={changeFilter} key={ind} study={filteredTasks} movies={tasks2} />
  })

  return (
    <div className='App'>
      {MainComponent}
    </div>
  )
}

export default App;
