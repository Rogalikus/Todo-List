import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { FilteredValuesType, TaskType } from "../App";
import { error } from "console";

type PropsType = {
   title: string;
   study: Array<TaskType>
   movies: Array<TaskType>
   removeTasks1: (id: string) => void
   changeFilter: (value: FilteredValuesType) => void
   addTask: (newTitle: string) => void
   changeStatus: (id: string, isDone: boolean) => void
   error: boolean
   setError: Dispatch<SetStateAction<boolean>>
}

export const MainPage = ({ title, study, movies, removeTasks1, changeFilter, addTask, changeStatus, error, setError }: PropsType) => {
   //UseState
   const [newTaskTitle, setNewTaskTitle] = useState('')

   //Handles
   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code === 'Enter') {
         addTask(newTaskTitle)
      }
   }

   const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      setError(false)
      setNewTaskTitle(e.currentTarget.value)
   }

   const handleAddTask = () => {
      if (newTaskTitle.trim() == '') {
         setError(true)
         return
      } else {

         return addTask(newTaskTitle.trim())
      }
   }

   const handleChangeFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (e.currentTarget.innerHTML === 'All') {
         return changeFilter('all')
      } else if (e.currentTarget.innerHTML === 'Active') {
         return changeFilter('active')
      } else {
         return changeFilter('complete')
      }
   }

   //Refactoring
   const listOfTasks = title === 'Movies'
      ? movies.map((el) => { return <li key={el.id}><input type='checkbox' checked={el.isDone} /><span>{el.title}</span><button>X</button></li> })
      : study.map((el) => {
         const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
            changeStatus(el.id, e.currentTarget.checked)
         }
         return <li key={el.id}><input type='checkbox' onChange={onChangeHandler} checked={el.isDone} /><span>{el.title}</span><button onClick={() => { removeTasks1(el.id) }}>X</button></li>
      })

   return (
      <div>
         <h3>{title}</h3>
         <div>
            <input className={error ? 'error' : ''} value={newTaskTitle} onChange={(e) => handleOnChange(e)} onKeyDown={(e) => handleKeyDown(e)} />
            <button onClick={handleAddTask}>+</button>
         </div>
         {error ? <span className="error-message">Field is required</span> : ''}
         <ul>
            {
               listOfTasks
            }
         </ul>
         <div>
            <button onClick={(e) => { handleChangeFilter(e) }}>All</button>
            <button onClick={(e) => { handleChangeFilter(e) }}>Active</button>
            <button onClick={(e) => { handleChangeFilter(e) }}>Completed</button>
         </div>
      </div>
   )
}