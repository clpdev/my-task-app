import React from 'react';
import TaskCard from './TaskCard';

export default function KanbanBoard({ tasks, onUpdateStatus, onDelete }) {
  const columns = [
    { id: 'todo', title: '未着手', color: 'border-slate-300 dark:border-slate-600' },
    { id: 'in-progress', title: '進行中', color: 'border-blue-400 dark:border-blue-500' },
    { id: 'done', title: '完了', color: 'border-green-400 dark:border-green-500' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map(column => {
        const columnTasks = tasks.filter(task => task.status === column.id);
        
        return (
          <div key={column.id} className="flex flex-col h-full">
            <div className={`flex items-center justify-between mb-4 pb-2 border-b-2 ${column.color}`}>
              <h2 className="font-semibold text-slate-700 dark:text-slate-200">{column.title}</h2>
              <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 py-0.5 px-2.5 rounded-full text-xs font-bold">
                {columnTasks.length}
              </span>
            </div>
            
            <div className="flex-1 bg-slate-100/50 dark:bg-slate-800/30 rounded-xl p-3 flex flex-col gap-3 min-h-[500px]">
              {columnTasks.length === 0 ? (
                <div className="text-center text-sm text-slate-400 dark:text-slate-500 py-10 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                  タスクはありません
                </div>
              ) : (
                columnTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onUpdateStatus={onUpdateStatus}
                    onDelete={onDelete}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}