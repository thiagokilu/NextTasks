"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

/* =========================
   ZOD SCHEMA
========================= */
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type LoginFormData = z.infer<typeof loginSchema>;

/* =========================
   COMPONENT
========================= */
export default function Page() {
  const router = useRouter();
  const [loginError, setLoginError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin: SubmitHandler<LoginFormData> = async (data) => {
    setLoginError(false); // limpa erro anterior

    console.log("Tentando login com:", data.email);

    const res = await fetch("https://apinexttasks.onrender.com/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    console.log("Status do login:", res.status);
    
    if (!res.ok) {
      const errorData = await res.text();
      console.error("Erro no login:", errorData);
      setLoginError(true);
      return;
    }

    const responseData = await res.json();
    console.log("Login sucesso:", responseData);
    router.push("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 text-black">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-8">
          Login
        </h1>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          {/* EMAIL */}
          <input
            type="email"
            placeholder="Digite seu email"
            {...register("email")}
            className="w-full p-3 border rounded-lg"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Digite sua senha"
            {...register("password")}
            className="w-full p-3 border rounded-lg"
          />

          {/* ERRO GENÉRICO */}
          {loginError && (
            <p className="text-red-500 text-center">Email ou senha inválidos</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-3 rounded-lg disabled:opacity-50"
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>

          <p className="text-center text-sm mt-4">
            Não tem conta?{" "}
            <Link href="/signup" className="text-green-700 font-semibold">
              cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
