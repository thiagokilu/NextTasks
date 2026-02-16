"use client";

import { useState } from "react";

interface TasksProps {
  resTasks: any[];
  onTaskClick: (task: any) => void;
  setTasks: React.Dispatch<React.SetStateAction<any[]>>;
}

type TaskData = {
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  id: number;
};

export default function Tasks({ resTasks, onTaskClick, setTasks }: TasksProps) {
  const [compleTask, setCompleTask] = useState(false);

  async function handleCompleteTask(taskId: number) {
    const res = await fetch(
      `http://localhost:3333/users/tasks/${taskId}/complete`,
      {
        method: "PATCH",
        credentials: "include", // auth por cookie
        // 🔥 NÃO mande Content-Type
      },
    );

    const data = await res.json();

    setTasks((prev: TaskData[]) =>
      prev.map((task) => (task.id === data.id ? data : task)),
    );

    if (!res.ok) {
      alert(data.message);
      return;
    }
  }
  const completedTasks = resTasks.filter((task: TaskData) => task.completed);
  const activeTasks = resTasks.filter((task: TaskData) => !task.completed);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Tarefas Ativas
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {activeTasks?.length || 0} tarefas
        </span>
      </div>

      {/* Lista de tarefas */}
      <div className="space-y-3">
        {activeTasks?.length > 0 ? (
          activeTasks.map((task: any) => (
            <div
              key={task.id}
              className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md 
              transition-all duration-200 hover:border-green-300 dark:hover:border-green-700"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCompleteTask(task.id)}
                className="w-5 h-5 text-green-600 dark:text-green-400 rounded border-gray-300 dark:border-gray-600 
  focus:ring-green-500 dark:focus:ring-green-400 cursor-pointer"
              />

              <div
                className="flex flex-row gap-5 items-center ml-3 flex-1"
                onClick={() => onTaskClick(task)}
              >
                <h3
                  className={`text-lg font-medium text-gray-800 dark:text-gray-200 truncate ${task.completed ? "line-through" : ""}`}
                >
                  {task.title}
                </h3>
                <span>
                  {new Date(task.deadline).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              Nenhuma tarefa encontrada
            </p>
          </div>
        )}
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Tarefas concluídas
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {completedTasks?.length || 0} tarefas
        </span>
      </div>

      {/* Lista de tarefas */}
      <div className="space-y-3">
        {completedTasks?.length > 0 ? (
          completedTasks.map((task: any) => (
            <div
              key={task.id}
              className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md 
              transition-all duration-200 hover:border-green-300 dark:hover:border-green-700"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCompleteTask(task.id)}
                className="w-5 h-5 text-green-600 dark:text-green-400 rounded border-gray-300 dark:border-gray-600 
  focus:ring-green-500 dark:focus:ring-green-400 cursor-pointer"
              />

              <div
                className="flex flex-row gap-5 items-center ml-3 flex-1"
                onClick={() => onTaskClick(task)}
              >
                <h3
                  className={`text-lg font-medium text-gray-800 dark:text-gray-200 truncate ${task.completed ? "line-through" : ""}`}
                >
                  {task.title}
                </h3>
                <span>
                  {new Date(task.deadline).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              Nenhuma tarefa encontrada
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
