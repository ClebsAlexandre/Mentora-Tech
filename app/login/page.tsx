"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulação temporária
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push("/");
  };

  return (
    <main className="flex min-h-screen bg-[#0a0a0a] text-white">
      {/* Lado Esquerdo - Formulário */}
      <div className="relative flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24">
        
        {/* Botão Voltar */}
        <Link 
          href="/" 
          className="absolute top-8 left-6 sm:left-12 flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
        >
          &larr; Voltar
        </Link>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mx-auto w-full max-w-sm mt-8 sm:mt-0"
        >
          <Link href="/" className="flex items-center gap-2 mb-12">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 font-bold text-white">
              M
            </div>
            <span className="text-xl font-bold tracking-tight">
              Mentora Tech
            </span>
          </Link>

          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Bem-vindo de volta
          </h1>
          <p className="text-zinc-400 mb-8">
            Insira suas credenciais para acessar seu painel.
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-300"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="nome@exemplo.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-zinc-300"
                >
                  Senha
                </label>
                <Link
                  href="#"
                  className="text-sm font-medium text-blue-500 hover:text-blue-400 transition-colors"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-bold text-white transition-all hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] disabled:opacity-50"
            >
              {isLoading ? "Autenticando..." : "Entrar na plataforma"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-zinc-400">
            Ainda não tem uma conta?{" "}
            <Link
              href="/cadastro"
              className="font-semibold text-white hover:text-blue-400 transition-colors"
            >
              Criar conta grátis
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Lado Direito - Imagem/Branding (Oculto no Mobile) */}
      <div className="relative hidden w-1/2 lg:block bg-zinc-900 overflow-hidden border-l border-zinc-800">
        {/* Efeitos de Luz */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center z-10">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold mb-4">
              Acelere seu desenvolvimento
            </h2>
            <p className="text-lg text-zinc-400 leading-relaxed">
              "A mentoria me economizou meses de tutoriais aleatórios. Ter o
              código revisado por um sênior mudou o rumo da minha carreira."
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              {/* Foto de perfil inserida aqui */}
              <img 
                src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=100&h=100&q=80" 
                alt="Foto de perfil do desenvolvedor" 
                className="w-12 h-12 rounded-full border-2 border-zinc-700 object-cover"
              />
              <div className="text-left">
                <p className="text-sm font-bold text-white">
                  Desenvolvedor Júnior
                </p>
                <p className="text-xs text-zinc-400">
                  Mentorado contratado em 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}