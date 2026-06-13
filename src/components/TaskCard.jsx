import React from 'react';
import { ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';

export default function TaskCard({ task, onUpdateStatus, onDelete }) {
  const priorityColors = {
    高: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800/50',
    中: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/50',
    低: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800/50',
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-slate-900 dark:text-slate-100 break-words">{task.title}</h3>
        <button
          onClick={() => onDelete(task.id)}
          className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
          aria-label="タスクを削除"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full">
          {task.category}
        </span>
        <span className={`px-2.5 py-1 text-xs font-medium border rounded-full ${priorityColors[task.priority]}`}>
          優先度: {task.priority}
        </span>
      </div>

      <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/50">
        <button
          onClick={() => onUpdateStatus(task.id, task.status === 'done' ? 'in-progress' : 'todo')}
          disabled={task.status === 'todo'}
          className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${
            task.status === 'todo' 
              ? 'opacity-0 cursor-default' 
              : 'bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-300'
          }`}
        >
          <ArrowLeft size={16} />
        </button>
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
        <button
          onClick={() => onUpdateStatus(task.id, task.status === 'todo' ? 'in-progress' : 'done')}
          disabled={task.status === 'done'}
          className={`p-1.5 rounded-md flex items-center justify-center transition-colors ${
            task.status === 'done'
              ? 'opacity-0 cursor-default'
              : 'bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:hover:bg-blue-800/50 dark:text-blue-400'
          }`}
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}