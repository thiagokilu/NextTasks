"use client";

import { useState } from "react";
import Menu from "@/components/Menu";
import NewTaskModal from "@/components/NewTaskModal";
import Tasks from "@/components/Tasks";
import TaskModal from "@/components/TaskModal";

interface HomeClientProps {
  user: {
    id: string;
    name: string;
  };
  tasks: any[]; // 👈 TODO: remover
}

export default function HomeClient({ user, tasks }: HomeClientProps) {
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [tasksState, setTasksState] = useState(tasks);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Menu setNewTaskModalOpen={setNewTaskModalOpen} name={user.name} />

      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Bem-vindo, {user.name}</h1>
          </div>

          <Tasks
            resTasks={tasksState}
            onTaskClick={(task: any) => {
              setSelectedTask(task);
              setTaskModalOpen(true);
            }}
            setTasks={setTasksState} // 👈 passa setter
          />
          <NewTaskModal
            newTaskModalOpen={newTaskModalOpen}
            setNewTaskModalOpen={setNewTaskModalOpen}
            setTasks={setTasksState} // 👈 passa setter
          />
          <TaskModal
            taskModalOpen={taskModalOpen}
            setTaskModalOpen={setTaskModalOpen}
            task={selectedTask}
            setTasks={setTasksState} // 👈 passa setter
          />
        </div>
      </main>
    </div>
  );
}
