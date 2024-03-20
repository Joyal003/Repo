import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterTodos, markAllcompleted } from '../redux/action';

const FilterButton = () => {
    const dispatch = useDispatch();
    const currentFilter = useSelector((state) => state.filter)

    const handleFilterChange = (filter) =>{
        dispatch(filterTodos(filter))
    }
  return (
    <div className='flex space-x-4 items-center'>

        <select 
        value={currentFilter}
        onChange={(e)=>handleFilterChange(e.target.value)}
        className='text-sm px-2 py-1 rounded border border-gray-300 focus:outline-none'>
            <option value="ALL">Default</option>
            <option value="COMPLETED">Completed</option>
            <option value="INCOMPLETE">Incomplete</option>
        </select>
            <button className='text-sm px-2 py-1 bg-blue-500 text-white ml-2 rounded'
            onClick={()=> dispatch(markAllcompleted())}
            >Mark All Completed</button>
    </div>
  )
}

export default FilterButton