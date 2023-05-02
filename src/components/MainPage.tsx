import React, { ChangeEvent, useState } from "react";
import { FilteredValuesType, TaskType } from "../App";

type PropsType = {
   title: string;
   tasks: Array<TaskType>
   removeTasks: (id: string, taskId: string) => void
   changeFilter: (value: FilteredValuesType, id: string) => void
   addTask: (newTitle: string, todoListId: string) => void
   changeStatus: (id: string, isDone: boolean, todoListId: string) => void
   filter: FilteredValuesType
   taskListId: string
   removeTodoList: (taskListId: string) => void
}

export const MainPage = ({ title, tasks, removeTasks, changeFilter, addTask, changeStatus, removeTodoList, filter, taskListId }: PropsType) => {
   //UseState
   const [newTaskTitle, setNewTaskTitle] = useState('')
   const [error, setError] = useState<boolean>(false)


   //Handles
   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code === 'Enter' && e.currentTarget.value.trim() === '') {
         addTask(newTaskTitle, taskListId)
      }
   }

   const handleTaskOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      setError(false)
      setNewTaskTitle(e.currentTarget.value)
   }

   const handleAddTask = () => {
      if (newTaskTitle.trim() === '') {
         setError(true)
         return
      }
      return addTask(newTaskTitle.trim(), taskListId)
   }

   const handleChangeFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (e.currentTarget.innerHTML === 'All') {
         return changeFilter('all', taskListId)
      } else if (e.currentTarget.innerHTML === 'Active') {
         return changeFilter('active', taskListId)
      }
      return changeFilter('complete', taskListId)
   }

   const removeTodoListHandler = () => {
      removeTodoList(taskListId)
   }
   //Refactoring
   const listOfTasks = tasks.map((el) => {
      const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
         changeStatus(el.id, e.currentTarget.checked, taskListId)
      }
      return <li key={el.id}><input type='checkbox' onChange={onChangeHandler} checked={el.isDone} /><span>{el.title}</span><button onClick={() => { removeTasks(el.id, taskListId) }}>X</button></li>
   })

   return (

      <div>
         <h3>{title} <button onClick={removeTodoListHandler}>X</button></h3>
         <div>
            <input className={error ? 'error' : ''} value={newTaskTitle} onChange={(e) => handleTaskOnChange(e)} onKeyDown={(e) => handleKeyDown(e)} />
            <button onClick={handleAddTask}>+</button>
         </div>
         {error ? <span className="error-message">Field is required</span> : ''}
         <ul>
            {
               listOfTasks
            }
         </ul>
         <div>
            <button className={filter === 'all' ? 'active-filter' : ''} onClick={(e) => { handleChangeFilter(e) }}>All</button>
            <button className={filter === 'active' ? 'active-filter' : ''} onClick={(e) => { handleChangeFilter(e) }}>Active</button>
            <button className={filter === 'complete' ? 'active-filter' : ''} onClick={(e) => { handleChangeFilter(e) }}>Completed</button>
         </div>
      </div>
   )
}