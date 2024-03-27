import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import { Tasklist } from '../Services/services';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const filter = useSelector(state => state.filter);
    const search = useSelector(state => state.search);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await Tasklist(); // Wait for the promise to resolve
                // Filter tasks based on the filter and search
                const filteredTasks = response.filter(todo => {
                    const matchesFilter = (filter === "COMPLETED" && todo.completed) ||
                                          (filter === "INCOMPLETE" && !todo.completed) ||
                                          (filter === "ALL");

                    const matchSearch = (todo.text?.toLowerCase() || '').includes((search?.toLowerCase() || ''));

                    return matchesFilter && matchSearch;
                });
                setTasks(filteredTasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [filter, search]); // Re-run effect when filter or search changes

    const refreshTasks = async () => {
        try {
            const response = await Tasklist();
            const filteredTasks = response.filter(todo => {
                const matchesFilter = (filter === "COMPLETED" && todo.completed) ||
                                      (filter === "INCOMPLETE" && !todo.completed) ||
                                      (filter === "ALL");

                const matchSearch = (todo.text?.toLowerCase() || '').includes((search?.toLowerCase() || ''));

                return matchesFilter && matchSearch;
            });
            setTasks(filteredTasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    return (
        <ul>
            <li className='my-2 text-sm italic'>All your notes...</li>
            {tasks.map((todo, index) => (
                <TodoItem key={index} todo={todo} index={index} refreshTasks={refreshTasks} />
            ))}
        </ul>

    );
}

export default TodoList;
