import React, { useState } from 'react';
import './Task.css'; // Import the CSS file
import './Sidebarr.css';
import Sidebarr from './Sidebarr';
import Nav from './Nav';
import './Nav';

function Task() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ name: '', assignedTo: '', dueDate: '', priority: '', description: '' });

    const handleAddTask = () => {
        setTasks([...tasks, { ...newTask, id: tasks.length + 1, status: 'Pending' }]);
        setNewTask({ name: '', assignedTo: '', dueDate: '', priority: '', description: '' });
    };

    return (
        <div className="main-wrapper">
        <Sidebarr />
        <div className="main-wrapper_n">
        <Nav/>
        <div>
            <div className="tasks-section">
                <h2>Tasks</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Task ID</th>
                            <th>Task Name</th>
                            <th>Assigned To</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Priority</th>
                            {/* <th>Actions</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.name}</td>
                                <td>{task.assignedTo}</td>
                                <td>{task.dueDate}</td>
                                <td>{task.status}</td>
                                <td>{task.priority}</td>
                                <td>
                                    {/* Add buttons for editing and deleting */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h3>Add New Task</h3>
                <input type="text" placeholder="Task Name" value={newTask.name} onChange={e => setNewTask({ ...newTask, name: e.target.value })} />
                <input type="text" placeholder="Assigned To" value={newTask.assignedTo} onChange={e => setNewTask({ ...newTask, assignedTo: e.target.value })} />
                <input type="date" value={newTask.dueDate} onChange={e => setNewTask({ ...newTask, dueDate: e.target.value })} />
                <select value={newTask.priority} onChange={e => setNewTask({ ...newTask, priority: e.target.value })}>
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <textarea placeholder="Description" value={newTask.description} onChange={e => setNewTask({ ...newTask, description: e.target.value })} />
                <button onClick={handleAddTask}>Add Task</button>
            </div>
        </div>
    </div>
    </div>
    );
}

export default Task;
