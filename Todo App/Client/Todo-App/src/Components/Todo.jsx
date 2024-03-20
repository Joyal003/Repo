import React, { useState } from 'react'
import { BsPlus, BsSearch } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { addTodo, updateSearch } from '../redux/action';
import FilterButton from './FilterButton';
import TodoList from './TodoList';
const Todo = () => {
    const [newTodo,setNewTodo] = useState("");
    const [search,setSearch] = useState("");


    const dispatch = useDispatch();

    const handleAddTodo = (text)=>{
        dispatch(addTodo(text))
    }
    const handleAddTodoClick = () =>{
        if(newTodo.trim()!==""){
            handleAddTodo(newTodo.trim());
            setNewTodo("");
        }
    }

    const handleSearch = (value) =>{
        setSearch(value);
        console.log(value);
        dispatch(updateSearch(value))
    }

    // console.log(newTodo);
  return (
    <div className='max-w-4xl mx-auto sm:mt-8 p-4 bg-gray-100 rounded'>
        <h2 className='mt-3 mb-6 text-2xl font-bold text-center uppercase'>TODO APP</h2>

        {/* input text and btn */}
        <div className='flex items-center mb-4'>
            <input 
            type='text' 
            value={newTodo} 
            onChange ={(e) => setNewTodo(e.target.value)}
            name='addTodo' 
            id='addTodo' 
            placeholder='Enter notes....'
            className='flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500'/>

            <button className='ml-4 p-2 bg-blue-700 text-white rounded hover:bg-blue-600 focus:outline-none'
            onClick={handleAddTodoClick}><BsPlus/></button>
        </div>


        <div className='flex items-center justify-between'>

            <FilterButton/>
            <div className='flex items-center mb-4'>
            <input 
            type='text' 
            value={search} 
            onChange ={(e) =>handleSearch(e.target.value)} 
            name='search' id='search' 
            placeholder='search'
            className='flex-grow p-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500'/>
            <button className='ml-4 p-2 bg-blue-700 text-white rounded hover:bg-blue-600 focus:outline-none'><BsSearch/></button>
            </div>
        </div>
    <TodoList/>
    </div>
  )
}

export default Todo