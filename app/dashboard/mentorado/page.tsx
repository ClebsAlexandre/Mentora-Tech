"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Search, 
  MessageSquare, 
  LogOut, 
  Bell, 
  ChevronRight, 
  Clock, 
  Video, 
  Award,
  BookOpen,
  Lightbulb,
  ArrowUpRight
} from "lucide-react";

export default function MentoradoDashboard() {
  const stats = {
    mentoriasConcluidas: 4,
    feedbacksRecebidos: 4,
    proximaSessaoEm: "Amanhã, 14:00",
  };

  const proximasSessoes = [
    {
      id: "1",
      mentorNome: "Carlos Souza",
      mentorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80",
      vagaAlvo: "Desenvolvedor Júnior Full Stack",
      dataHora: "27 de Maio, 14:00 - 15:00",
      salaUrl: "https://meet.google.com/abc-defg-hij",
      foco: "Simulado de Entrevista (React & Node.js)",
    }
  ];

  const historicoSessoes = [
    {
      id: "2",
      mentorNome: "Ana Silva",
      mentorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
      vagaAlvo: "Estágio em Engenharia de Software",
      dataHora: "15 de Maio, 10:00",
      status: "concluido",
      temRelatorio: true,
      notaTecnica: 8,
    },
    {
      id: "3",
      mentorNome: "Diego Fernandes",
      mentorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80",
      vagaAlvo: "Desenvolvedor Júnior Full Stack",
      dataHora: "02 de Maio, 16:30",
      status: "concluido",
      temRelatorio: true,
      notaTecnica: 7,
    }
  ];

  return (
    <div className="flex min-h-screen bg-[#050505] text-zinc-100 font-sans">
      
      {/* Sidebar Lateral Premium */}
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
          <Link href="/login" className="flex items-center gap-3 w-full rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-400/5 px-4 py-3 text-sm font-medium transition-all">
            <LogOut size={20} />
            Sair
          </Link>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Top Header */}
        <header className="flex items-center justify-between px-10 py-6 border-b border-zinc-800/50 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-20">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Olá, Leonardo</h1>
            <p className="text-zinc-500 text-sm mt-0.5">Preparado para dar o próximo passo na sua carreira tech?</p>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-zinc-400 hover:text-white transition-colors">
              <Bell size={22} />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#050505]"></span>
            </button>
            <div className="flex items-center gap-3 p-1 pr-4 rounded-full bg-zinc-900/50 border border-zinc-800/50">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs border border-zinc-700">
                L
              </div>
              <ChevronRight size={14} className="text-zinc-600" />
            </div>
          </div>
        </header>

        <div className="p-10 space-y-10 max-w-[1400px] mx-auto w-full">
          {/* Grid de Estatísticas */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl bg-[#0a0a0a] border border-zinc-800/50 shadow-sm transition-all">
              <p className="text-zinc-500 text-sm font-medium">Mentorias Concluídas</p>
              <h3 className="text-3xl font-bold mt-2">{stats.mentoriasConcluidas}</h3>
              <p className="text-[11px] text-zinc-600 mt-2 uppercase tracking-wider font-bold">Horas de puro aprendizado prático</p>
            </motion.div>
            
            <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl bg-[#0a0a0a] border border-zinc-800/50 shadow-sm transition-all">
              <p className="text-zinc-500 text-sm font-medium">Feedbacks Técnicos</p>
              <h3 className="text-3xl font-bold mt-2">{stats.feedbacksRecebidos}</h3>
              <p className="text-[11px] text-zinc-600 mt-2 uppercase tracking-wider font-bold">Relatórios gerados por seniores</p>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl bg-[#0a0a0a] border border-blue-500/20 shadow-[0_0_30px_rgba(37,99,235,0.05)] transition-all relative overflow-hidden group">
              <p className="text-blue-500/80 text-sm font-bold">Próxima Sessão</p>
              <h3 className="text-xl font-bold text-white mt-2 truncate">{stats.proximaSessaoEm}</h3>
              <Link href="#proxima" className="mt-2 text-[11px] text-zinc-400 font-bold flex items-center gap-1 group-hover:text-blue-400 transition-colors uppercase tracking-wider">
                Ver detalhes <ArrowUpRight size={12} />
              </Link>
            </motion.div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Coluna Principal */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Card Destaque: Próxima Mentoria */}
              <section id="proxima" className="rounded-3xl border border-zinc-800/50 bg-gradient-to-br from-zinc-900/40 to-zinc-950 p-8 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none"></div>
                
                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2.5">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                  Sua Próxima Mentoria
                </h2>

                {proximasSessoes.map((sessao) => (
                  <div key={sessao.id} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between relative z-10">
                    <div className="flex items-center gap-5">
                      <img src={sessao.mentorAvatar} alt={sessao.mentorNome} className="w-14 h-14 rounded-full border-2 border-zinc-800 object-cover" />
                      <div>
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{sessao.dataHora}</p>
                        <h3 className="text-lg font-bold text-white mt-0.5">{sessao.foco}</h3>
                        <p className="text-sm text-blue-400 font-medium mt-0.5">com {sessao.mentorNome}</p>
                      </div>
                    </div>
                    
                    <a 
                      href={sessao.salaUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 text-sm font-bold shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.01]"
                    >
                      <Video size={18} />
                      Entrar na Sala (Meet)
                    </a>
                  </div>
                ))}
              </section>

              {/* Histórico e Relatórios */}
              <section className="bg-[#0a0a0a] rounded-3xl border border-zinc-800/50 overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-zinc-800/50 bg-[#0c0c0c]">
                  <h2 className="text-xl font-bold">Histórico de Feedbacks</h2>
                  <p className="text-zinc-500 text-sm mt-0.5">Acesse os relatórios e vereditos das suas sessões passadas.</p>
                </div>

                <div className="divide-y divide-zinc-800/50">
                  {historicoSessoes.map((historico) => (
                    <div key={historico.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-white/[0.01] transition-colors gap-4">
                      <div className="flex items-center gap-4">
                        <img src={historico.mentorAvatar} alt={historico.mentorNome} className="w-10 h-10 rounded-full border border-zinc-800 object-cover hidden sm:block" />
                        <div>
                          <p className="font-bold text-white text-base">Simulado: {historico.vagaAlvo}</p>
                          <p className="text-xs text-zinc-500 mt-1">{historico.dataHora} • Mentor: <span className="text-zinc-400 font-medium">{historico.mentorNome}</span></p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto border-t sm:border-none border-zinc-900 pt-4 sm:pt-0">
                        <div className="text-left sm:text-right">
                          <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-wider">Nota Técnica</p>
                          <p className="font-bold text-white mt-0.5">{historico.notaTecnica} / 10</p>
                        </div>
                        <button className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm font-bold text-zinc-200 transition-colors hover:bg-zinc-850 hover:text-white">
                          Ler Relatório
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Coluna Lateral */}
            <div className="flex flex-col gap-6 w-full">
              <div className="rounded-3xl border border-zinc-800/50 bg-[#0a0a0a] p-6 shadow-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 text-blue-500 mb-4 border border-blue-500/20">
                  <BookOpen size={20} />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">Próximo Passo</h3>
                <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                  Agende uma nova mentoria focada em arquitetura ou revisão de código para continuar evoluindo e subindo suas notas.
                </p>
                <Link href="/dashboard/mentorado/mentores" className="flex w-full items-center justify-center rounded-2xl bg-white text-black px-4 py-3.5 text-sm font-bold transition-all hover:bg-zinc-200 hover:scale-[1.01]">
                  Buscar Mentores
                </Link>
              </div>

              <div className="rounded-3xl border border-zinc-800/50 bg-[#0a0a0a] p-6 shadow-xl">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  <Lightbulb size={18} className="text-yellow-500" /> Dica da Plataforma
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  Antes de uma sessão de Simulado Técnico, certifique-se de preencher seus links de portfólio e GitHub para que o mentor possa avaliar seu perfil antes da chamada de vídeo.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}