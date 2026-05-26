"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Função de validação simulada (Mock)
  const handleMockLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simula o tempo de resposta de um servidor (1.5 segundos)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Validação estática sem usar o banco de dados
    if (email === "teste@mentoratech.com" && password === "123456") {
      // Sucesso! Redireciona para o painel (ou home)
      alert("Login efetuado com sucesso! (Simulação)");
      router.push("/"); 
    } else {
      // Falha
      setError("E-mail ou senha incorretos. Tente: teste@mentoratech.com / 123456");
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-black p-6 text-white">
      {/* Container do Card */}
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#0a0a0a] p-8 shadow-2xl">
        
        {/* Logo "Mentora Tech" (Recriado em CSS para combinar com a imagem) */}
        <div className="mb-8 flex flex-col items-center justify-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 font-bold text-white">
              M
            </div>
            <span className="text-xl font-bold tracking-tight">Mentora Tech</span>
          </Link>
          
          <div className="text-center mt-2">
            <h1 className="text-2xl font-bold">Bem-vindo de volta</h1>
            <p className="mt-2 text-sm text-zinc-400">
              Faça login para continuar sua evolução
            </p>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleMockLogin} className="flex flex-col gap-5">
          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400 text-center">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium text-zinc-300">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-zinc-300">
                Senha
              </label>
              <Link href="#" className="text-xs font-medium text-blue-500 hover:text-blue-400 hover:underline transition-colors">
                Esqueceu a senha?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          {/* Botão em formato "Pill" igual ao da Landing Page */}
          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 flex w-full items-center justify-center rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-zinc-400">
          Ainda não tem uma conta?{" "}
          <Link href="/cadastro" className="font-semibold text-blue-500 hover:text-blue-400 hover:underline transition-colors">
            Cadastre-se
          </Link>
        </div>
      </div>
    </main>
  );
}