import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Analytics({ tasks, isDark }) {
  const chartColors = {
    text: isDark ? '#f1f5f9' : '#334155',
    grid: isDark ? '#334155' : '#e2e8f0',
    tooltipBg: isDark ? '#1e293b' : '#ffffff',
    tooltipBorder: isDark ? '#334155' : '#e2e8f0',
  };

  const { dailyData, categoryData, stats } = useMemo(() => {
    const completedTasks = tasks.filter(t => t.status === 'done');
    
    // 基本統計
    const total = tasks.length;
    const completed = completedTasks.length;
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

    // カテゴリ別集計
    const categoryCount = completedTasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {});
    
    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#6366f1', '#8b5cf6'];
    const catData = Object.keys(categoryCount).map((key, index) => ({
      name: key,
      value: categoryCount[key],
      color: COLORS[index % COLORS.length]
    }));

    // 直近7日間の日別完了数
    const last7Days = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      return {
        dateStr: `${d.getMonth() + 1}/${d.getDate()}`,
        timestamp: d.setHours(0, 0, 0, 0)
      };
    });

    const dayData = last7Days.map(day => {
      const count = completedTasks.filter(task => {
        if (!task.completedAt) return false;
        const taskDate = new Date(task.completedAt).setHours(0,0,0,0);
        return taskDate === day.timestamp;
      }).length;
      return { name: day.dateStr, 完了数: count };
    });

    return { dailyData: dayData, categoryData: catData, stats: { total, completed, completionRate } };
  }, [tasks]);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">総タスク数</h3>
          <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">{stats.total}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">完了済みタスク</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.completed}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">達成率</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.completionRate}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart: 直近7日間の完了数 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-6">直近7日間の完了タスク</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartColors.grid} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: chartColors.text, fontSize: 12 }} dy={10} />
                <YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{ fill: chartColors.text, fontSize: 12 }} />
                <RechartsTooltip 
                  cursor={{ fill: isDark ? '#334155' : '#f1f5f9' }}
                  contentStyle={{ backgroundColor: chartColors.tooltipBg, borderColor: chartColors.tooltipBorder, color: chartColors.text, borderRadius: '8px' }}
                />
                <Bar dataKey="完了数" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: カテゴリ別の完了割合 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-6">完了タスクのカテゴリ内訳</h3>
          <div className="h-72 flex items-center justify-center">
            {categoryData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: chartColors.tooltipBg, borderColor: chartColors.tooltipBorder, color: chartColors.text, borderRadius: '8px' }}
                    itemStyle={{ color: chartColors.text }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-slate-400 dark:text-slate-500">完了したタスクがありません</p>
            )}
          </div>
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {categoryData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                <span className="text-sm text-slate-600 dark:text-slate-300">{entry.name} ({entry.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}