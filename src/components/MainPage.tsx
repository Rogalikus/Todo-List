import React from "react";
import { TaskType } from "../App";

type PropsType = {
   title: string;
   study: Array<TaskType>
   movies: Array<TaskType>
}

export const MainPage = ({ title, study, movies }: PropsType) => {

   const listOfTasks = title == 'Movies'
      ? movies.map((el) => { return <li>{el.title} <input type='checkbox' checked={el.isDone} /></li> })
      : study.map((el) => { return <li>{el.title} <input type='checkbox' checked={el.isDone} /></li> })

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
            <button>All</button>
            <button>Active</button>
            <button>Completed</button>
         </div>
      </div>
   )
}