import React, { useState } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import KanbanBoard from './components/KanbanBoard';
import Analytics from './components/Analytics';
import { useTasks } from './hooks/useTasks';
import { useDarkMode } from './hooks/useDarkMode';

function App() {
  const { isDark, toggleTheme } = useDarkMode();
  const { tasks, addTask, updateTaskStatus, deleteTask } = useTasks();
  const [currentTab, setCurrentTab] = useState('board'); // 'board' | 'analytics'

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-300">
      <Header 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
      />
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === 'board' ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <TaskForm onAddTask={addTask} />
            <KanbanBoard 
              tasks={tasks} 
              onUpdateStatus={updateTaskStatus} 
              onDelete={deleteTask}
            />
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Analytics tasks={tasks} isDark={isDark} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;