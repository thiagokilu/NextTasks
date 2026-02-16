"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

/* =========================
   ZOD SCHEMA
========================= */
const signupSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "A senha deve conter no mínimo 8 caracteres"),
});

type SignupFormData = z.infer<typeof signupSchema>;

/* =========================
   COMPONENT
========================= */
export default function Page() {
  const router = useRouter();
  const [signupError, setSignupError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const handleSignup: SubmitHandler<SignupFormData> = async (data) => {
    setSignupError(null);

    const res = await fetch("https://apinexttasks.onrender.com/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json(); // 👈 IMPORTANTE

    if (!res.ok) {
      setSignupError(result.message || "Erro ao criar conta");
      return;
    }

    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 px-4 text-black">
      <div className="bg-white w-full max-w-md p-10 rounded-2xl shadow-2xl border border-green-200">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-8">
          Criar Conta
        </h1>

        <form onSubmit={handleSubmit(handleSignup)} className="space-y-5">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              Nome
            </label>
            <input
              type="text"
              placeholder="Digite seu nome"
              {...register("name")}
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Digite seu email"
              {...register("email")}
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              placeholder="Digite sua senha"
              {...register("password")}
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* ERRO DA API */}
          {signupError && (
            <p className="text-red-600 text-center">{signupError}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Criando..." : "Criar Conta"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Já tem conta?{" "}
          <Link
            href="/login"
            className="text-green-700 font-semibold hover:underline"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
