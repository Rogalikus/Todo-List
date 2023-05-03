import React, { ChangeEvent, useState } from 'react';
import { MainPage } from './components/MainPage';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { addTodoList, changeFilter, removeTodoList, todoListSelector } from './redux/todoLists';
import { addIdTodoList, addTask, changeStatus, removeIdTodoList, removeTasks, tasksListSelector } from './redux/taskslist';
import { v1 } from 'uuid';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
}

export type FilteredValuesType = 'all' | 'complete' | 'active';

export type TaskListType = { id: string, title: string, filter: FilteredValuesType }

function App() {

  //useDispatch
  const dispatch = useDispatch()
  //useState
  const [error, setError] = useState<boolean>(false)
  const [newListTitle, setNewListTitle] = useState('')
  //useSelectors
  const { todoList } = useSelector(todoListSelector)
  const { tasksList } = useSelector(tasksListSelector)
  //Handlers
  const handleListOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setNewListTitle(e.currentTarget.value)
  }
  const addTodoListHandler = () => {
    if (newListTitle.trim() === '') {
      setError(true)
      return
    } else {
      let newIdTodoList = v1()
      dispatch(addIdTodoList(newIdTodoList))
      dispatch(addTodoList({ newListTitle: newListTitle.trim(), newIdTodoList }))
    }
  }

  //Refactoring
  const MainComponent = todoList.map((el) => {
    let filteredTasks = tasksList[el.id]

    if (el.filter === 'active') {
      filteredTasks = tasksList[el.id].filter(el => el.isDone === false)
    }
    if (el.filter === 'complete') {
      filteredTasks = tasksList[el.id].filter(el => el.isDone === true)
    }

    return <MainPage
      taskListId={el.id}
      removeTodoList={removeTodoList}
      removeIdTodoList={removeIdTodoList}
      filter={el.filter}
      changeStatus={changeStatus}
      removeTasks={removeTasks}
      title={el.title}
      addTask={addTask}
      changeFilter={changeFilter}
      key={el.id}
      tasks={filteredTasks}
    />
  })

  return (
    <div>
      <div>
        <input className={error ? 'error' : ''} onChange={(e) => handleListOnChange(e)} value={newListTitle}></input><button onClick={addTodoListHandler}>+</button>
      </div>
      <div className='App'>
        {MainComponent}
      </div>
    </div>
  )
}

export default App;
