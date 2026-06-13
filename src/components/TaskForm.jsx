import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('仕事');
  const [priority, setPriority] = useState('中');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAddTask({ title, category, priority });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 mb-6 flex flex-col md:flex-row gap-4 items-end transition-colors duration-300">
      <div className="flex-1 w-full">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">タスク名</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="新しいタスクを入力..."
          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white outline-none transition-all"
        />
      </div>
      <div className="w-full md:w-48">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">カテゴリ</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
        >
          <option value="仕事">仕事</option>
          <option value="プライベート">プライベート</option>
          <option value="学習">学習</option>
          <option value="その他">その他</option>
        </select>
      </div>
      <div className="w-full md:w-32">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">優先度</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
        >
          <option value="高">高</option>
          <option value="中">中</option>
          <option value="低">低</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={!title.trim()}
        className="w-full md:w-auto px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
      >
        <Plus size={20} />
        追加
      </button>
    </form>
  );
}