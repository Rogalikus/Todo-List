import React from 'react';
import { MainPage } from './components/MainPage';
import './App.css';
import { useSelector } from 'react-redux';
import { changeFilter, removeTodoList, todoListSelector } from './redux/todoLists';
import { addTask, changeStatus, removeIdTodoList, removeTasks, tasksListSelector } from './redux/taskslist';
import { AddTodoList } from './components/AddTodoList';



function App() {
  //useSelectors
  const { todoList } = useSelector(todoListSelector)
  const { tasksList } = useSelector(tasksListSelector)

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
    <div className='App'>
      <div className='header'>
        <h1 className='top'>ToDoList</h1>
        <AddTodoList />
      </div>
      <div className='MainComp'>
        {MainComponent}
      </div>
    </div>
  )
}

export default App;
