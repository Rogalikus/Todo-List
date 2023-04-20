import React from "react";
import { TaskType } from "../App";

type PropsType = {
   title: string;
   study: Array<TaskType>
   movies: Array<TaskType>
   removeTasks1: Function
   changeFilter: Function
}

export const MainPage = ({ title, study, movies, removeTasks1, changeFilter }: PropsType) => {
   const listOfTasks = title === 'Movies'
      ? movies.map((el) => { return <li><input key={el.id} type='checkbox' checked={el.isDone} /><span>{el.title}</span><button>X</button></li> })
      : study.map((el) => { return <li><input key={el.id} type='checkbox' checked={el.isDone} /><span>{el.title}</span><button onClick={() => { removeTasks1(el.id) }}>X</button></li> })

   return (
      <div>
         <h3>{title}</h3>
         <div>
            <input />
            <button>+</button>
         </div>
         <ul>
            {
               listOfTasks
            }
         </ul>
         <div>
            <button onClick={() => { changeFilter('all') }}>All</button>
            <button onClick={() => { changeFilter('active') }}>Active</button>
            <button onClick={() => { changeFilter('complete') }}>Completed</button>
         </div>
      </div>
   )
}