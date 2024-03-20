import React from 'react'
import { useSelector } from 'react-redux'
import TodoItem from './TodoItem';

const TodoList = () => {
    const filteredTodos = useSelector((state) => {
        const todos = state?.todos;
        const filter = state?.filter;
        const search = state?.search;

        return todos.filter((todo) =>{
            const matchsFilter = (filter === "COMPLETED" && todo.completed) || (filter === "INCOMPLETE" && 
            !todo.completed) || (filter === "ALL");

            const matchSearch = todo?.text?.toLowerCase()?.includes(search);

            return matchsFilter && matchSearch;
        })
    })
    // console.log('filterewd:',filteredTodos);
    return (
        <ul>
            <li className='my-2 text-sm italic'>All your notes...</li>
            {
                filteredTodos.map((todo,index) => (
                    <TodoItem key={index} todo={todo} index={index}/>
                ))
            }
        </ul>
  )
}

export default TodoList