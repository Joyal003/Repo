import React, { useState } from 'react';
import { FaCheck, FaRegEdit, FaTimes, FaToggleOff, FaToggleOn, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { removeTodo, toggleTodo, markCompleted, markIncompleted } from '../redux/action';
import {  deleteTaskService, editTask } from '../Services/services';
import Modal from './Modal';

const TodoItem = ({ todo, index ,refreshTasks}) => {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [todoTask, setTodoTask] = useState({ id: '',description: '', completed: false, status: '' });
    const deleteTask = (id) => {
        dispatch(removeTodo(id));
        deleteTaskService(id).then((response) => {
            console.log("deleted with id ",id);
            refreshTasks(); // Refresh the task list after deletion
        });
    }
    const completeTask = (id) => {
        dispatch(markCompleted(id));
        let todo ={ completed: true };
        editTask(id,todo).then((response) => {
            refreshTasks(); // Refresh the task list after deletion
        });
    }
    const inCompleteTask = (id) => {
        dispatch(markIncompleted(id));
        let todo ={ completed: false };
        editTask(id,todo).then((response) => {
            refreshTasks(); // Refresh the task list after deletion
        });
    }
    const editModal = (id,description,completed,status) =>{
        setTodoTask({ id, description, completed, status });
        setShowModal(true);
    }
    return (
        <li className='flex flex-col sm:flex-row sm:items-center justify-between border-b-2 py-1 gap-4'>
            <div className='flex items-center'>
                <span className='mr-4 text-gray-500'>{index + 1}</span>
                <span className={`mr-4 ${todo?.completed ? "line-through text-red-500" : ""}`}>{todo?.description}</span>
            </div>
            <div className='space-x-3 ml-8'>
                
                <button onClick={() => deleteTask(todo?._id)} className='mr-2 text-sm bg-red-500 text-white 
                sm:px-2 py-1 px-1 rounded'><FaTrash /></button>
                <button className="mr-2 text-sm bg-green-500 text-blue sm:px-2 py-1 px-1 rounded"
                 onClick={() => editModal(todo?._id, todo?.description,todo?.completed,todo?.status)}><FaRegEdit /></button>
                 <Modal showModal={showModal} task={todoTask} setShowModal={setShowModal} refreshTasks={refreshTasks} />

                {!todo.completed && (
                    <button onClick={() => completeTask(todo?._id)} className='mr-2 text-sm bg-blue-500 text-white 
                    sm:px-2 py-1 px-1 rounded'><FaCheck /></button>
                )}

                {todo.completed && (
                    <button onClick={() => inCompleteTask(todo?._id)} className='mr-2 text-sm bg-yellow-500 text-white 
                    sm:px-2 py-1 px-1 rounded'><FaTimes /></button>
                )}
            </div>
            
            </li>
    );
}

export default TodoItem;
