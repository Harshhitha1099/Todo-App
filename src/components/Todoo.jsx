import "./CSS/Todoo.css"
import { useState } from 'react';
import { useRef } from'react';
import { useEffect } from "react";
import TodooItems from "./TodooItems";
let count=0;
const Todoo = () => {

    const [todos,settodos] = useState([]);
    const inputRef = useRef(null);

    const add = () => {
        settodos([...todos,{no:count++,text:inputRef.current.value,display:""}])
        inputRef.current.value="";   
        localStorage.setItem("todos_count",count);
    }

    useEffect ( () => {
        settodos(JSON.parse(localStorage.getItem("todos")));
        count=localStorage.getItem("todos_count")
    },[])
    
    useEffect(()=> {
        setTimeout ( () => {
            console.log(todos);
            localStorage.setItem("todos",JSON.stringify(todos))
        },100)
        
    },[todos])

  return (
    <div className='todo'>
        <div className='todo-header'>To-Do List</div>
        <div className="todo-add">
            <input ref ={inputRef} type='text' placeholder='Add your task ' className='todo-input'></input>
            <div onClick={()=> { add() }}className="todo-add-btn">ADD</div>
        </div>
        <div className="todo-list">
            {todos.map( (items, index) => {
                return <TodooItems key={index}  settodos={settodos} no={items.no} display={items.display} text={items.text}  />
            })}
        </div>

    </div>
  )
}

export default Todoo