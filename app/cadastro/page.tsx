"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type Role = "mentorado" | "mentor" | null;

export default function CadastroPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulação temporária
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert(`Cadastro de ${role} realizado! (Simulação)`);
    router.push("/login");
  };

  return (
    <main className="flex min-h-screen bg-[#0a0a0a] text-white">
      {/* Lado Esquerdo - Formulário Dinâmico */}
      <div className="relative flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16 xl:px-24">
        
        {/* Botão Voltar (Absoluto no canto superior esquerdo) */}
        <Link 
          href="/" 
          className="absolute top-8 left-6 sm:left-12 flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors z-10"
        >
          &larr; Voltar
        </Link>

        <div className="mx-auto w-full max-w-md mt-8 sm:mt-0">
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 font-bold text-white">
              M
            </div>
            <span className="text-xl font-bold tracking-tight">
              Mentora Tech
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Crie sua conta</h1>
            <p className="text-zinc-400">
              {!role ? "Como você deseja utilizar a plataforma?" : "Preencha seus dados para começar"}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {/* ETAPA 1: ESCOLHA DE PERFIL */}
            {!role && (
              <motion.div
                key="selection"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <button
                  onClick={() => setRole("mentorado")}
                  className="group flex flex-col items-start gap-4 p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-blue-500/50 transition-all text-left"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-2xl group-hover:scale-110 transition-transform">
                    🚀
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-blue-400 transition-colors">Quero Aprender</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">Busco mentores para evoluir minhas habilidades.</p>
                  </div>
                </button>

                <button
                  onClick={() => setRole("mentor")}
                  className="group flex flex-col items-start gap-4 p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-blue-500/50 transition-all text-left"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-2xl group-hover:scale-110 transition-transform">
                    💡
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-blue-400 transition-colors">Quero Ensinar</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">Quero compartilhar conhecimento e ajudar devs.</p>
                  </div>
                </button>
              </motion.div>
            )}

            {/* ETAPA 2: FORMULÁRIO */}
            {role && (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              >
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-zinc-300">Nome</label>
                      <input type="text" required className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="João" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-zinc-300">Sobrenome</label>
                      <input type="text" required className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="Silva" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-300">E-mail</label>
                    <input type="email" required className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="seu@email.com" />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-300">Senha</label>
                    <input type="password" required minLength={6} className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="Mínimo 6 caracteres" />
                  </div>

                  {/* Campos Exclusivos para Mentor */}
                  {role === "mentor" && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="flex flex-col gap-5 pt-2 border-t border-zinc-800/50 mt-2 overflow-hidden">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-zinc-300">URL do LinkedIn</label>
                        <input type="url" required className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors" placeholder="https://linkedin.com/in/seu-perfil" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-zinc-300">Especialidade Principal</label>
                        <select required className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors text-zinc-300">
                          <option value="">Selecione uma especialidade</option>
                          <option value="frontend">Front-end (React, Vue, etc)</option>
                          <option value="backend">Back-end (Node.js, Java, etc)</option>
                          <option value="fullstack">Full Stack</option>
                          <option value="mobile">Mobile (Flutter, React Native)</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  <div className="mt-2 flex flex-col gap-3">
                    <button type="submit" disabled={isLoading} className="w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-bold text-white transition-all hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0a] disabled:opacity-50">
                      {isLoading ? "Criando conta..." : "Criar minha conta"}
                    </button>
                    <button type="button" onClick={() => setRole(null)} className="w-full rounded-xl bg-transparent px-4 py-3.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors">
                      Voltar e escolher outro perfil
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-8 text-center text-sm text-zinc-500">
            Já tem uma conta? <Link href="/login" className="font-medium text-zinc-300 hover:text-white hover:underline transition-colors">Faça login</Link>
          </p>
        </div>
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
              "A mentoria me economizou meses de tutoriais aleatórios. Ter o código revisado por um sênior mudou o rumo da minha carreira."
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              {/* Foto de perfil */}
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