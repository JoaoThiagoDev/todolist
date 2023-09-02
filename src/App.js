import React, { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate, faListCheck, faPlusCircle, faSquareCheck, faTrash } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj = { id: uuidv4(), text: newTask, completed: false };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  const completeTask = (taskId) => {
    const taskToComplete = tasks.find(task => task.id === taskId);
    if (taskToComplete) {
      taskToComplete.completed = true;
      setCompletedTasks([...completedTasks, taskToComplete]);
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
    }
  };




  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    const updatedCompletedTasks = completedTasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    setCompletedTasks(updatedCompletedTasks);
  };

  const noTasks = tasks.length === 0;
  const noCompletedTasks = completedTasks.length === 0;

  const moveTaskBack = (taskId) => {
    const taskToMoveBack = completedTasks.find(task => task.id === taskId);
    if (taskToMoveBack) {
      taskToMoveBack.completed = false;
      setTasks([...tasks, taskToMoveBack]);
      const updatedCompletedTasks = completedTasks.filter(task => task.id !== taskId);
      setCompletedTasks(updatedCompletedTasks);
    }
  };


  return (
    <div className="App">
      <div className="navbar">
        <h1>
          <FontAwesomeIcon icon={faListCheck} /> Todo List
        </h1>
      </div>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button id="addBtn" onClick={addTask}><FontAwesomeIcon icon={faPlusCircle} size="3x" /></button>
      </div>
      <div className="task-container">
        {noTasks && <p id="noTasks">No active tasks.</p>}
        {!noTasks && (
          <h2>Current tasks</h2>
        )}
        <ul className={`task-list ${noCompletedTasks ? 'centered' : 'left'}`}>
          {tasks.map(task => (
            <li key={task.id} className="task-item">
              <div>
                <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                  <FontAwesomeIcon icon={faSquareCheck} onClick={() => completeTask(task.id)} /> {task.text}
                </span>
              </div>
              <div className="trash-icon" onClick={() => deleteTask(task.id, false)}>
                <FontAwesomeIcon icon={faTrash} color='#ffff' />
              </div>
            </li>
          ))}
        </ul>

        {!noCompletedTasks && (
          <div>
            <h2>Completed tasks</h2>
            <ul className="completed-task-list">
              {completedTasks.map(task => (
                <li key={task.id} className="completed-task">
                  <div>
                    <span className="task-text">
                      <FontAwesomeIcon icon={faArrowsRotate} color='#ffff' onClick={() => moveTaskBack(task.id)} /> {task.text}
                    </span>
                  </div>
                  <div className="trash-icon" onClick={() => deleteTask(task.id)}>
                    <FontAwesomeIcon icon={faTrash} color='#ffff' onClick={() => deleteTask(task.id, true)} />
                  </div>
                </li>
              ))}



            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
