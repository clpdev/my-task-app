import { useState, useEffect } from 'react';

export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('task-dashboard-data');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('task-dashboard-data', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskDetails) => {
    const newTask = {
      ...taskDetails,
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      status: 'todo',
      createdAt: Date.now(),
      completedAt: null,
    };
    setTasks([...tasks, newTask]);
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const completedAt = newStatus === 'done' ? Date.now() : (task.status === 'done' ? null : task.completedAt);
        return { ...task, status: newStatus, completedAt };
      }
      return task;
    }));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return { tasks, addTask, updateTaskStatus, deleteTask };
}