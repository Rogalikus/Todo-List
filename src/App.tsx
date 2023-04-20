import React, { useState } from 'react';
import { MainPage } from './components/MainPage';
import './App.css';

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
}

type FilteredValuesType = 'all' | 'complete' | 'active';

function App() {

  //Local State
  let iniTasks1: Array<TaskType> = [
    { id: 1, title: 'CSS', isDone: true },
    { id: 2, title: 'HTML', isDone: false },
    { id: 3, title: 'React', isDone: true }
  ]

  let titles = ['What to learn', 'Movies']

  let iniTasks2: Array<TaskType> = [
    { id: 1, title: 'Muvy 43', isDone: false },
    { id: 2, title: 'Balto', isDone: true },
    { id: 3, title: 'Legends', isDone: true },
  ]

  //useState
  const [tasks1, setTasks1] = useState([
    { id: 1, title: 'CSS', isDone: true },
    { id: 2, title: 'HTML', isDone: false },
    { id: 3, title: 'React', isDone: true }
  ])
  const [tasks2, setTasks2] = useState(iniTasks2)
  const [filter, setFilter] = useState<FilteredValuesType>('all')

  //Future Action
  const removeTasks1 = (id: number) => {
    setTasks1(tasks1.filter((el) => el.id !== id))
  }
  const changeFilter = (value: FilteredValuesType) => {
    setFilter(value)
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
    return <MainPage removeTasks1={removeTasks1} title={el} changeFilter={changeFilter} key={ind} study={filteredTasks} movies={tasks2} />
  })

  return (
    <div className='App'>
      {MainComponent}
    </div>
  )
}

export default App;
