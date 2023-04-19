import React from 'react';
import { MainPage } from './components/MainPage';
import './App.css';

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
}

function App() {

  const tasks1: Array<TaskType> = [
    { id: 1, title: 'CSS', isDone: true },
    { id: 2, title: 'HTML', isDone: false },
    { id: 3, title: 'React', isDone: true }
  ]

  const titles = ['What to learn', 'Movies']

  const tasks2: Array<TaskType> = [
    { id: 1, title: 'Muvy 43', isDone: false },
    { id: 2, title: 'Balto', isDone: true },
    { id: 3, title: 'Legends', isDone: true },
  ]
  const nextPage = titles.map((el, ind) => {
    return <MainPage title={el} key={ind} study={tasks1} movies={tasks2} />
  })
  return (
    <div className='App'>
      {nextPage}
    </div>
  )
}

export default App;
