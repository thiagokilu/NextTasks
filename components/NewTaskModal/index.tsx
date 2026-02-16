import { useState } from "react";
import TextEditor from "../TextEditor";

interface NewTaskModalProps {
  newTaskModalOpen: boolean;
  setNewTaskModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setTasks: React.Dispatch<React.SetStateAction<any[]>>;
}

type NewTaskModalData = {
  title: string;
  description: string;
  dueDate: string;
};

export default function NewTaskModal({
  newTaskModalOpen,
  setNewTaskModalOpen,
  setTasks,
}: NewTaskModalProps) {
  if (!newTaskModalOpen) return null;
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");

  async function AddNewTask() {
    const res = await fetch("http://localhost:3333/users/newTask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        title: newTaskName,
        description: newTaskDescription,
        deadline: newTaskDueDate,
      }),
    });

    if (!res.ok) return;

    const newTask = await res.json();

    // 👇 ATUALIZA O ESTADO
    setTasks((prev: NewTaskModalData[]) => [...prev, newTask]);

    // 👇 fecha o modal
    setNewTaskModalOpen(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay com blur */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setNewTaskModalOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-auto bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 m-4">
        {/* Cabeçalho */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Nova Tarefa
        </h2>

        {/* Formulário */}
        <div className="space-y-5">
          {/* Nome da tarefa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nome da tarefa
            </label>
            <input
              type="text"
              placeholder="Digite o nome da tarefa"
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg
             focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent outline-none
             transition-all text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
            />
          </div>

          {/* Data de entrega */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Data de entrega
            </label>
            <input
              type="date"
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 
              focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent outline-none transition-all text-gray-900 dark:text-gray-100"
              value={newTaskDueDate}
              onChange={(e) => setNewTaskDueDate(e.target.value)}
            />
          </div>

          {/* Descrição (TextEditor) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Descrição
            </label>
            <div className="bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
              <TextEditor onChange={(value) => setNewTaskDescription(value)} />
            </div>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex items-center justify-end gap-3 mt-8 pt-4 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setNewTaskModalOpen(false)}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button
            className="px-5 py-2.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 
          rounded-lg shadow-lg hover:shadow-xl transition-all"
            onClick={AddNewTask}
          >
            Salvar tarefa
          </button>
        </div>
      </div>
    </div>
  );
}
