"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, Loader2, Briefcase, GraduationCap } from "lucide-react";

export default function CadastroPage() {
  const router = useRouter();
  
  // Estados do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoPerfil, setTipoPerfil] = useState<"aluno" | "mentor">("aluno");
  
  // Estados de UI
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErro("");

    try {
      const resposta = await fetch("http://localhost:3333/api/usuarios/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, senha, tipoPerfil }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.error || "Erro ao criar conta.");
      }

      // Se der sucesso, avisa o utilizador e manda-o para o login
      alert("Conta criada com sucesso! Faça o login para continuar.");
      router.push("/login");

    } catch (err: any) {
      setErro(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 font-bold text-white text-2xl shadow-[0_0_30px_rgba(37,99,235,0.4)]">
            M
          </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-white">
          Crie a sua conta
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-400">
          Junte-se à Mentora Tech e acelere a sua carreira
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
      >
        <div className="bg-[#0a0a0a] py-8 px-4 shadow-2xl border border-zinc-800/50 sm:rounded-3xl sm:px-10">
          <form className="space-y-6" onSubmit={handleCadastro}>
            
            {erro && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm font-medium text-center">
                {erro}
              </div>
            )}

            {/* Seleção de Tipo de Perfil */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setTipoPerfil("aluno")}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                  tipoPerfil === "aluno" 
                    ? "border-blue-500 bg-blue-500/10 text-blue-500" 
                    : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300"
                }`}
              >
                <GraduationCap size={24} className="mb-2" />
                <span className="text-sm font-bold">Sou Aluno</span>
              </button>

              <button
                type="button"
                onClick={() => setTipoPerfil("mentor")}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                  tipoPerfil === "mentor" 
                    ? "border-blue-500 bg-blue-500/10 text-blue-500" 
                    : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300"
                }`}
              >
                <Briefcase size={24} className="mb-2" />
                <span className="text-sm font-bold">Sou Mentor</span>
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300">
                Nome completo
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-zinc-500" />
                </div>
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="block w-full rounded-xl border border-zinc-800 bg-zinc-900/50 pl-10 pr-3 py-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-colors outline-none"
                  placeholder="Seu nome"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300">
                Endereço de e-mail
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-zinc-500" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-xl border border-zinc-800 bg-zinc-900/50 pl-10 pr-3 py-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-colors outline-none"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-300">
                Palavra-passe
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-zinc-500" />
                </div>
                <input
                  type="password"
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="block w-full rounded-xl border border-zinc-800 bg-zinc-900/50 pl-10 pr-3 py-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm transition-colors outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group flex w-full justify-center items-center gap-2 rounded-xl border border-transparent bg-blue-600 py-3.5 px-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:scale-[1.01] transition-all disabled:opacity-70 disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  A criar conta...
                </>
              ) : (
                <>
                  Criar Conta
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-400">
              Já tem uma conta?{" "}
              <Link href="/login" className="font-medium text-blue-500 hover:text-blue-400">
                Faça login aqui
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}