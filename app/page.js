'use client'
import Image from 'next/image';
import TaskList from './components/TaskList';
import { useEffect, useState } from 'react';




export default function Home () {
  
  const [newTask,setNewTask] = useState('');
  const [tasks, setTasks] = useState([]); // rewrite using states
  const [filteredTasks, setFilteredTasks] = useState([]); // Хранение отфильтрованных заданий
  const [filter, setFilter] = useState('all');


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('tasks.json');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);
  useEffect(() => {
    handleFilterChange(filter); // Вызываем обновление списка задач при изменении фильтра
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, tasks]);

  const handleAddTask = () => {
    // Implement add task logic here
    updateTask(newTask);
    setNewTask('');
  };
  const updateTask = ( newTask) => {
    
        const newArray = [...tasks, {id: tasks.length +1, text: newTask, completed: false}]
        setTasks(newArray);
      
    
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  

  const handleDeleteTask = (id) => {
      // Implement delete task logic here
      
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
  };    
  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    if (selectedFilter === 'all') {
      setFilteredTasks(tasks); // Если выбран фильтр "Все", показываем все задания
    } else if (selectedFilter === 'completed') {
      const completedTasks = tasks.filter(task => task.completed);
      setFilteredTasks(completedTasks); // Фильтруем выполненные задания
    } else if (selectedFilter === 'active') {
      const activeTasks = tasks.filter(task => !task.completed);
      setFilteredTasks(activeTasks); // Фильтруем невыполненные задания
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>
        
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do ?"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <div className="bg-gray-800 rounded p-4">
        {/* Medium level: extract todo's listing to TaskList component */}
        {/* Basic level: map through tasks state by using this code: */}
        <ul>
        <TaskList handleDeleteTask={handleDeleteTask} toggleTask={toggleTask} tasks={filteredTasks} />
          
        </ul>
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span> 'n' items left</span>  {/* show how many uncompleted items left */}
          <div>
            <button onClick={() => handleFilterChange('all')} className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}>All</button>
            <button onClick={() => handleFilterChange('active')} className={`mr-2 ${filter === 'active' ? 'text-white' : ''}`}>Active</button>
            <button onClick={() => handleFilterChange('completed')} className={`${filter === 'completed' ? 'text-white' : ''}`}>Completed</button>
          </div>
          <button
            onClick={() => alert("Clear completed tasks")}
            className="text-gray-400 hover:text-white"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}
