"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Menu from "@/components/Menu";
import NewTaskModal from "@/components/NewTaskModal";
import Tasks from "@/components/Tasks";
import TaskModal from "@/components/TaskModal";

interface User {
  id: string;
  name: string;
}

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        console.log("Verificando autenticação...");
        const res = await fetch("https://apinexttasks.onrender.com/users/me", {
          credentials: "include",
        });

        console.log("Status da verificação:", res.status);

        if (!res.ok) {
          const errorData = await res.text();
          console.error("Usuário não autenticado:", errorData);
          router.push("/login");
          return;
        }

        const userData = await res.json();
        console.log("Usuário autenticado:", userData);
        setUser(userData);

        // Buscar tarefas do usuário
        const tasksRes = await fetch("https://apinexttasks.onrender.com/users/tasks", {
          credentials: "include",
        });

        if (tasksRes.ok) {
          const tasksData = await tasksRes.json();
          setTasks(tasksData);
        }
      } catch (error) {
        console.error("Erro na autenticação:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Redirecionando...
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Menu setNewTaskModalOpen={setNewTaskModalOpen} name={user.name} />

      <main className="flex-1 overflow-auto">
        <div className="p-8 max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Bem-vindo, {user.name}</h1>
          </div>

          <Tasks
            resTasks={tasks}
            onTaskClick={(task: any) => {
              setSelectedTask(task);
              setTaskModalOpen(true);
            }}
            setTasks={setTasks}
          />
          <NewTaskModal
            newTaskModalOpen={newTaskModalOpen}
            setNewTaskModalOpen={setNewTaskModalOpen}
            setTasks={setTasks}
          />
          <TaskModal
            taskModalOpen={taskModalOpen}
            setTaskModalOpen={setTaskModalOpen}
            task={selectedTask}
            setTasks={setTasks}
          />
        </div>
      </main>
    </div>
  );
}
