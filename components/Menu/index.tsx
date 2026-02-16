"use client";

import { ChevronDown, LogOut, PlusCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Menu({ setNewTaskModalOpen, name }: any) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("http://localhost:3333/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    router.push("/");
  }

  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4 flex flex-col">
      {/* Perfil do usuário */}
      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
            <img
              src={`https://ui-avatars.com/api/?name=${name}`}
              alt="Foto do usuário"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-medium text-gray-800 dark:text-gray-200">
            {name}
          </span>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-2 flex items-center gap-2 w-full px-4 py-2 text-sm text-gary-600 hover:bg-gray-100 hover:text-red-500 dark:hover:bg-gray-800 dark:hover:text-red-400 rounded-lg transition-colors"
      >
        <LogOut size={16} />
        Sair
      </button>

      {/* Menu */}
      <nav className="mt-8">
        <div
          className="flex items-center gap-3 p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
          onClick={() => setNewTaskModalOpen(true)}
        >
          <PlusCircleIcon
            size={22}
            className="text-green-600 dark:text-green-400"
          />
          <span className="font-medium">Adicionar tarefa</span>
        </div>
      </nav>
    </aside>
  );
}
