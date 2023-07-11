import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addIdTodoList } from "../redux/taskslist";
import { addTodoList } from "../redux/todoLists";
import { v1 } from "uuid";
import './AddTodoList.css'

export const AddTodoList = () => {
    //useState
    const [error, setError] = useState<boolean>(false)
    const [newListTitle, setNewListTitle] = useState('')
    //useDispatch
    const dispatch = useDispatch();
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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter' && newListTitle !== '') {
            let newIdTodoList = v1()
            dispatch(addIdTodoList(newIdTodoList))
            dispatch(addTodoList({ newListTitle: newListTitle.trim(), newIdTodoList }))
        } else {
            setError(true)
        }
    }

    return (
        <div>
            <div className='addTodo'>
                <input className={['addTodoInput', error ? 'error' : 'addInput'].join(' ')} onChange={(e) => handleListOnChange(e)} onKeyDown={(e) => handleKeyDown(e)} value={newListTitle}></input><button className="addTodoButton" onClick={addTodoListHandler}>+</button>
            </div>
            {error ? <span className="error-message">Field is required</span> : ''}
        </div>
    )
}