import React, { ChangeEvent, useState } from "react";
import { useDispatch } from 'react-redux';
import { FilteredValuesType, TaskType } from "../App";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

type PropsType = {
   title: string;
   tasks: Array<TaskType>
   removeTasks: ActionCreatorWithPayload<{ id: string, taskId: string }>
   changeFilter: ActionCreatorWithPayload<{ value: FilteredValuesType, id: string }>
   addTask: ActionCreatorWithPayload<{ newTitle: string, todoListId: string }>
   changeStatus: ActionCreatorWithPayload<{ id: string, isDone: boolean, todoListId: string }>
   filter: FilteredValuesType
   taskListId: string
   removeTodoList: ActionCreatorWithPayload<string>
   removeIdTodoList: ActionCreatorWithPayload<string>
}

export const MainPage = ({ title, tasks, removeTasks, changeFilter, addTask, changeStatus, removeTodoList, removeIdTodoList, filter, taskListId }: PropsType) => {
   const dispatch = useDispatch()
   //UseState
   const [newTaskTitle, setNewTaskTitle] = useState('')
   const [error, setError] = useState<boolean>(false)


   //Handles
   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.code === 'Enter' && e.currentTarget.value.trim() === '') {
         dispatch(addTask({ newTitle: newTaskTitle, todoListId: taskListId }))
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
      return dispatch(addTask({ newTitle: newTaskTitle.trim(), todoListId: taskListId }))
   }

   const handleChangeFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (e.currentTarget.innerHTML === 'All') {
         return dispatch(changeFilter({ value: 'all', id: taskListId }))
      } else if (e.currentTarget.innerHTML === 'Active') {
         return dispatch(changeFilter({ value: 'active', id: taskListId }))
      }
      return dispatch(changeFilter({ value: 'complete', id: taskListId }))
   }

   const removeTodoListHandler = () => {
      dispatch(removeTodoList(taskListId))
      dispatch(removeIdTodoList(taskListId))
   }
   //Refactoring
   const listOfTasks = tasks.map((el) => {
      const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
         dispatch(changeStatus({ id: el.id, isDone: e.currentTarget.checked, todoListId: taskListId }))
      }
      return <li key={el.id}><input type='checkbox' onChange={onChangeHandler} checked={el.isDone} /><span>{el.title}</span><button onClick={() => { dispatch(removeTasks({ id: el.id, taskId: taskListId })) }}>X</button></li>
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