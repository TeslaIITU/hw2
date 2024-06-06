import React from 'react';
import TaskItem from '../TaskItem';

const TaskList = ({tasks, handleDeleteTask, toggleTask}) => {
  // Render TaskItems using TaskItem component
  // Filter tasks by status here

  
  return (
    <>
      {tasks.map((task, index) => (
        <TaskItem handleDeleteTask={handleDeleteTask} toggleTask={toggleTask} key={index} task={task} />
      ))}
    </>
  );
};

export default TaskList;
