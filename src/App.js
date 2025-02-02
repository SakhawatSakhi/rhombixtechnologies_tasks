import React from 'react';
import './App.css';
import { useState } from 'react';
import { FaEdit, FaTimes, FaTrash, FaCheck } from 'react-icons/fa';

function App() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);

    const addTask = () => {
        if (task.trim() !== '') {
            const newTask = {
                text: task,
                status: 'Pending',
                timestamp: new Date().toLocaleString()
            };
            setTasks([...tasks, newTask]);
            setTask('');
        }
    };

    const toggleStatus = (index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].status = updatedTasks[index].status === 'Pending' ? 'Done' : 'Pending';
        setTasks(updatedTasks);
    };

    const editTask = (index) => {
        setTask(tasks[index].text);
        setEditingIndex(index);
    };

    const updateTask = () => {
        if (editingIndex !== null && task.trim() !== '') {
            const updatedTasks = [...tasks];
            updatedTasks[editingIndex].text = task;
            setTasks(updatedTasks);
            setTask('');
            setEditingIndex(null);
        }
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    return (
        <div className='app'>
       
            <div className='todo_container'>
                <div className='todo_header'>
                    <h1>To-Do List</h1>
                    <div className='todo_input'>
                        <input 
                            type='text' 
                            value={task} 
                            onChange={(e) => setTask(e.target.value)} 
                            placeholder='Enter a task...' 
                        />
                        {editingIndex !== null ? (
                            <button onClick={updateTask}>Update</button>
                        ) : (
                            <button onClick={addTask}>Add</button>
                        )}
                    </div>
                </div>
                <div className='task_list'>
                    {tasks.map((t, index) => (
                        <div key={index} className='task_card'>
                            <div className='task_info'>
                                <small>{t.timestamp}</small>
                                <span className={t.status === 'Done' ? 'done' : 'pending'}>
                                    {t.status}
                                </span>
                            </div>
                            <p>{t.text}</p>
                            <div className='icons'>
                                {t.status === 'Done' ? (
                                    <FaTimes className='icon' onClick={() => toggleStatus(index)} />
                                ) : (
                                    <FaCheck className='icon' onClick={() => toggleStatus(index)} />
                                )}
                                <FaEdit className='icon' onClick={() => editTask(index)} />
                                <FaTrash className='icon delete' onClick={() => deleteTask(index)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
           
        </div>
    );
}

export default App;
