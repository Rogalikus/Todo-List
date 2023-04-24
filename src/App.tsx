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

export type TaskListType = { id: string, title: string, filter: FilteredValuesType }

function App() {

  let todoListId1 = v1()
  let todoListId2 = v1()

  //useState
  const [todoList, setTodoList] = useState<Array<TaskListType>>([
    { id: todoListId1, title: 'What to learn', filter: 'active' },
    { id: todoListId2, title: 'What to did', filter: 'complete' }
  ])

  // let listId1 = todoList[0].id
  // let listId2 = todoList[1].id

  const [tasksList, setTasksList] = useState({
    [todoListId1]: [
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'HTML', isDone: false },
      { id: v1(), title: 'React', isDone: true }
    ],
    [todoListId2]: [
      { id: v1(), title: 'Social-Network', isDone: true },
      { id: v1(), title: 'CLothingStore', isDone: true },
      { id: v1(), title: 'TodoList', isDone: false }
    ]
  })

  //Future Action
  const removeTasks = (id: string, taskId: string) => {
    let filteredTasks = tasksList[taskId].filter((el) => el.id !== id)
    tasksList[taskId] = filteredTasks
    setTasksList({ ...tasksList })
  }

  const changeFilter = (value: FilteredValuesType, id: string) => {
    let taskList = todoList.find((el) => el.id === id)
    if (taskList) {
      taskList.filter = value
    }
    setTodoList([...todoList])
  }

  const removeTodoList = (taskListId: string) => {
    let filteredTodoList = todoList.filter((el) => el.id !== taskListId)
    setTodoList(filteredTodoList)
    delete tasksList[taskListId]
    setTasksList({ ...tasksList })
  }

  const changeStatus = (id: string, isDone: boolean, todoListId: string) => {
    let tasks = tasksList[todoListId]
    const findItem = tasks.find((e) => e.id === id);
    if (findItem) {
      findItem.isDone = isDone
      setTasksList({ ...tasksList })
    }
  }

  const addTask = (newTitle: string, todoListId: string) => {
    let newTask = { id: v1(), title: newTitle, isDone: false }

    let tasks = tasksList[todoListId]

    let newTasks = [newTask, ...tasks]
    tasksList[todoListId] = newTasks;
    setTasksList({ ...tasksList })
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
    <div className='App'>
      {MainComponent}
    </div>
  )
}

export default App;
