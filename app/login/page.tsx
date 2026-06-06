"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { Mail, Lock, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Estados de UI
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErro("");

    try {
      // 1. Fazer o POST para a nossa API Node.js real
      const resposta = await fetch("http://localhost:3333/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        // Se a API retornar erro (400, 401, etc.), mostramos ao utilizador
        throw new Error(dados.error || "Erro ao fazer login.");
      }

      // 2. Sucesso! Guardar o Token num Cookie (válido por 1 dia)
      Cookies.set("mentora_tech_token", dados.token, { expires: 1 });

      // Opcional: Guardar os dados básicos do utilizador para usar na UI
      localStorage.setItem("mentora_user", JSON.stringify(dados.usuario));

      // 3. Redirecionar para o Dashboard correto com base no tipo de perfil
      if (dados.usuario.tipoPerfil === "mentor") {
        router.push("/dashboard/mentor");
      } else {
        router.push("/dashboard/mentorado");
      }

    } catch (err: any) {
      setErro(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans relative">
      
      {/* Botão de Voltar ao Início */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors group z-10"
      >
        <div className="p-2 bg-zinc-900/50 rounded-full border border-zinc-800 group-hover:bg-zinc-800 transition-colors">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        </div>
        <span className="hidden sm:inline">Voltar ao início</span>
      </Link>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 font-bold text-white text-2xl shadow-[0_0_30px_rgba(37,99,235,0.4)]">
            M
          </div>
        </div>
        <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-white">
          Bem-vindo de volta
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-400">
          Acelere a sua carreira tech com a Mentora Tech
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="bg-[#0a0a0a] py-8 px-4 shadow-2xl border border-zinc-800/50 sm:rounded-3xl sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>

            {/* Mensagem de Erro da API */}
            {erro && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-sm font-medium text-center">
                {erro}
              </div>
            )}

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

            <div className="flex items-center justify-end">
              <Link href="#" className="text-sm font-medium text-blue-500 hover:text-blue-400">
                Esqueceu a palavra-passe?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group flex w-full justify-center items-center gap-2 rounded-xl border border-transparent bg-blue-600 py-3.5 px-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:scale-[1.01] transition-all disabled:opacity-70 disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  A autenticar...
                </>
              ) : (
                <>
                  Entrar na Plataforma
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-[#0a0a0a] px-2 text-zinc-500">Ou continue com</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition-colors">
              <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24"><path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" /><path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" /><path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" /><path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.26538 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" /></svg>
              Google
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition-colors">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
              GitHub
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}