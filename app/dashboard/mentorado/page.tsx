"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Search, LogOut, Bell, ChevronRight,
  MessageSquare, Loader2, Calendar, Clock, Video, FileText
} from "lucide-react";

// Tipagem baseada na resposta da nossa API de Agendamentos
type AgendamentoAPI = {
  id: string;
  dataHoraInicio: string;
  vagaAlvo: string;
  status: string;
  mentor: {
    nome: string;
    avatarUrl: string | null;
    email: string;
  };
};

export default function MentoradoDashboardPage() {
  const router = useRouter();
  
  // Estados
  const [agendamentos, setAgendamentos] = useState<AgendamentoAPI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usuarioNome, setUsuarioNome] = useState("");
  
  // Estado para o filtro de data específica (Padrão: data de hoje no formato YYYY-MM-DD)
  const [dataFiltro, setDataFiltro] = useState(() => {
    const hoje = new Date();
    return hoje.toISOString().split('T')[0];
  });

  useEffect(() => {
    const token = Cookies.get("mentora_tech_token");
    if (!token) {
      router.push("/login");
      return;
    }

    const userStr = localStorage.getItem("mentora_user");
    let alunoId = "";
    if (userStr) {
      const aluno = JSON.parse(userStr);
      setUsuarioNome(aluno.nome);
      alunoId = aluno.id;
    }

    // Busca os agendamentos passando o alunoId e a data específica para o back-end
    const fetchAgendamentos = async () => {
      setIsLoading(true);
      try {
        const url = new URL("http://localhost:3333/api/agendamentos");
        url.searchParams.append("alunoId", alunoId);
        
        // Aplica o filtro da data selecionada pelo utilizador
        if (dataFiltro) {
          url.searchParams.append("data", dataFiltro);
        }

        const resposta = await fetch(url.toString(), {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (!resposta.ok) throw new Error("Falha ao buscar agendamentos.");
        
        const dados = await resposta.json();
        setAgendamentos(dados);
      } catch (error) {
        console.error("Erro na API:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (alunoId) {
      fetchAgendamentos();
    }
  }, [router, dataFiltro]); // Refaz o fetch sempre que a dataFiltro mudar

  // Formatação de data e hora para exibição
  const formatarHora = (dataIso: string) => {
    return new Date(dataIso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmado': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'cancelado': return 'bg-red-500/10 text-red-500 border-red-500/20';
      default: return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050505] text-zinc-100 font-sans">
      
      {/* Sidebar Lateral */}
      <aside className="w-72 border-r border-zinc-800/50 bg-[#0a0a0a] flex flex-col sticky top-0 h-screen hidden md:flex">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:scale-105 transition-transform">
              M
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              Mentora Tech
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <Link href="/dashboard/mentorado" className="flex items-center gap-3 rounded-xl bg-blue-600/10 text-blue-500 px-4 py-3.5 text-sm font-semibold border border-blue-500/20">
            <LayoutDashboard size={20} />
            Meu Progresso
          </Link>
          <Link href="/dashboard/mentorado/mentores" className="flex items-center gap-3 rounded-xl text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200 px-4 py-3.5 text-sm font-medium transition-all group">
            <Search size={20} className="group-hover:text-blue-500 transition-colors" />
            Encontrar Mentores
          </Link>
          <Link href="/dashboard/mentorado/feedbacks" className="flex items-center gap-3 rounded-xl text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200 px-4 py-3.5 text-sm font-medium transition-all group">
            <MessageSquare size={20} className="group-hover:text-blue-500 transition-colors" />
            Meus Feedbacks
          </Link>
        </nav>

        <div className="p-6 border-t border-zinc-800/50">
          <button 
            onClick={() => {
              Cookies.remove("mentora_tech_token");
              localStorage.removeItem("mentora_user");
              router.push("/login");
            }}
            className="flex items-center gap-3 w-full rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-400/5 px-4 py-3 text-sm font-medium transition-all"
          >
            <LogOut size={20} />
            Sair
          </button>
        </div>
      </aside>

      {/* Conteúdo Central */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        <header className="flex items-center justify-between px-10 py-6 border-b border-zinc-800/50 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-20">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Olá, {usuarioNome.split(' ')[0]} 👋</h1>
            <p className="text-zinc-500 text-sm mt-0.5">Acompanhe as suas sessões e evolução.</p>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-zinc-400 hover:text-white transition-colors">
              <Bell size={22} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 p-1 pr-4 rounded-full bg-zinc-900/50 border border-zinc-800/50">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs border border-zinc-700">
                {usuarioNome ? usuarioNome.charAt(0).toUpperCase() : "U"}
              </div>
              <ChevronRight size={14} className="text-zinc-600" />
            </div>
          </div>
        </header>

        <div className="p-10 max-w-[1400px] mx-auto w-full space-y-8">
          
          {/* Seção de Filtro de Data */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0a0a0a] p-6 rounded-3xl border border-zinc-800/50 shadow-lg">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Calendar size={20} className="text-blue-500" />
                Sua Agenda
              </h2>
              <p className="text-sm text-zinc-400 mt-1">Filtre os seus agendamentos por uma data específica.</p>
            </div>
            
            <div className="relative">
              <input
                type="date"
                value={dataFiltro}
                onChange={(e) => setDataFiltro(e.target.value)}
                className="rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors css-color-scheme-dark shadow-inner min-w-[200px]"
              />
            </div>
          </div>

          {/* Lista de Agendamentos */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex w-full items-center justify-center py-20 text-blue-500">
                <Loader2 size={32} className="animate-spin" />
              </div>
            ) : agendamentos.length > 0 ? (
              <AnimatePresence>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {agendamentos.map((agendamento) => {
                    const avatarFallback = agendamento.mentor.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(agendamento.mentor.nome)}&background=2563eb&color=fff`;
                    
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key={agendamento.id}
                        className="bg-[#0a0a0a] rounded-3xl border border-zinc-800/50 p-6 hover:border-zinc-700 transition-colors group"
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className={`px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${getStatusColor(agendamento.status)}`}>
                            {agendamento.status}
                          </div>
                          <div className="flex items-center gap-2 text-zinc-400 bg-zinc-900/50 px-3 py-1.5 rounded-lg border border-zinc-800">
                            <Clock size={16} className="text-blue-500" />
                            <span className="text-sm font-semibold text-white">{formatarHora(agendamento.dataHoraInicio)}</span>
                          </div>
                        </div>

                        <div className="flex gap-4 items-center mb-6">
                          <img src={avatarFallback} alt={agendamento.mentor.nome} className="w-16 h-16 rounded-2xl object-cover border-2 border-zinc-800" />
                          <div>
                            <h3 className="text-lg font-bold text-white">{agendamento.mentor.nome}</h3>
                            <p className="text-sm text-zinc-400">{agendamento.mentor.email}</p>
                          </div>
                        </div>

                        <div className="bg-zinc-900/50 rounded-2xl p-4 border border-zinc-800/50 mb-6">
                          <div className="flex items-center gap-2 text-zinc-400 text-sm mb-2">
                            <FileText size={16} />
                            <span className="font-medium">Foco da Sessão:</span>
                          </div>
                          <p className="text-white font-semibold">{agendamento.vagaAlvo}</p>
                        </div>

                        <div className="flex gap-3">
                          <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-600/20">
                            <Video size={18} />
                            Acessar Sala
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </AnimatePresence>
            ) : (
              <div className="bg-[#0a0a0a] border border-zinc-800/50 rounded-3xl p-12 text-center flex flex-col items-center">
                <div className="bg-zinc-900 p-4 rounded-full mb-4">
                  <Calendar size={32} className="text-zinc-600" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Nenhum agendamento para esta data</h3>
                <p className="text-zinc-500 max-w-md mb-6">Você não possui sessões marcadas para o dia selecionado. Experimente alterar a data ou encontre um mentor para agendar.</p>
                <Link href="/dashboard/mentorado/mentores" className="bg-white text-black hover:bg-zinc-200 px-6 py-3 rounded-xl font-bold text-sm transition-all">
                  Explorar Mentores
                </Link>
              </div>
            )}
          </div>
          
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .css-color-scheme-dark::-webkit-calendar-picker-indicator {
          filter: invert(1);
          cursor: pointer;
        }
      `}} />
    </div>
  );
}