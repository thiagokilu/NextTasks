"use client";

import { PenIcon, CheckIcon, XIcon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import DynamicTextEditor from "@/components/TextEditor/DynamicTextEditor";

interface TaskModalProps {
  taskModalOpen: boolean;
  setTaskModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  task: any;
  setTasks: React.Dispatch<React.SetStateAction<any[]>>;
}

type TaskModalData = {
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
  id: number;
};

export default function TaskModal({
  taskModalOpen,
  setTaskModalOpen,
  task,
  setTasks,
}: TaskModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // 🔄 Sincroniza quando trocar a task
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setIsEditing(false);
    }
  }, [task]);

  if (!taskModalOpen || !task) return null;

  async function handleSave() {
    try {
      const res = await fetch(
        `https://apinexttasks.onrender.com/users/tasks/${task.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            title,
            description,
            deadline: task.deadline,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Erro ao atualizar tarefa");
      }

      const newTask = await res.json();

      setTasks((prev: TaskModalData[]) =>
        prev.map((t) => (t.id === newTask.id ? newTask : t))
      );

      setIsEditing(false);
      setTaskModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete() {
    try {
      const res = await fetch(
        `https://apinexttasks.onrender.com/users/tasks/${task.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Erro ao deletar tarefa");
      }

      setTasks((prev: any[]) => prev.filter((t) => t.id !== task.id));
      setTaskModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setTaskModalOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-auto bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 m-4">
        {/* Ações */}
        <div className="absolute right-5 top-5 flex gap-2">
          {!isEditing ? (
            <PenIcon
              className="cursor-pointer"
              onClick={() => setIsEditing(true)}
            />
          ) : (
            <>
              <CheckIcon
                className="cursor-pointer text-green-600"
                onClick={handleSave}
              />
              <XIcon
                className="cursor-pointer text-red-500"
                onClick={() => {
                  setTitle(task.title);
                  setDescription(task.description);
                  setIsEditing(false);
                }}
              />
            </>
          )}

          <TrashIcon
            className="cursor-pointer text-red-500"
            onClick={handleDelete}
          />
        </div>

        {/* Título */}
        {isEditing ? (
          <input
            className="text-2xl font-bold mb-2 w-full bg-transparent border-b outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
        ) : (
          <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
        )}

        {/* Data */}
        <span className="text-sm text-gray-500">
          {task.deadline
            ? new Date(task.deadline).toLocaleDateString("pt-BR")
            : "Sem data"}
        </span>

        {/* Descrição */}
        {isEditing ? (
          <div className="mt-4">
            <DynamicTextEditor
              value={description}
              onChange={setDescription}
            />
          </div>
        ) : (
          <div
            className="mt-4 ql-editor prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: task.description }}
          />
        )}
      </div>
    </div>
  );
}