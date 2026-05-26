"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  CalendarDays, 
  FileText, 
  LogOut, 
  Bell, 
  ChevronRight,
  Clock,
  Video
} from "lucide-react";

export default function MentorDashboard() {
  const [dataFiltro, setDataFiltro] = useState<string>("2026-05-26");

  const stats = {
    ganhosMes: 1250.0,
    avaliacoes: 4.9,
    sessoesRealizadas: 14,
    relatoriosPendentes: 2,
  };

  const agendamentos = [
    {
      id: "1",
      alunoNome: "Ana Silva",
      vagaAlvo: "Desenvolvedor Frontend - React",
      hora: "14:00 - 15:00",
      data: "2026-05-26",
      cor: "bg-blue-500"
    },
    {
      id: "2",
      alunoNome: "Carlos Eduardo",
      vagaAlvo: "Full Stack (Node.js & Next.js)",
      hora: "16:30 - 17:30",
      data: "2026-05-26",
      cor: "bg-indigo-500"
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#050505] text-zinc-100 font-sans">
      
      {/* Sidebar Lateral */}
      <aside className="w-72 border-r border-zinc-800/50 bg-[#0a0a0a] flex flex-col sticky top-0 h-screen">
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
          <Link href="#" className="flex items-center gap-3 rounded-xl bg-blue-600/10 text-blue-500 px-4 py-3.5 text-sm font-semibold border border-blue-500/20">
            <LayoutDashboard size={20} />
            Visão Geral
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-xl text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200 px-4 py-3.5 text-sm font-medium transition-all group">
            <CalendarDays size={20} className="group-hover:text-blue-500 transition-colors" />
            Minha Agenda
          </Link>
          <Link href="#" className="flex items-center justify-between rounded-xl text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200 px-4 py-3.5 text-sm font-medium transition-all group">
            <div className="flex items-center gap-3">
              <FileText size={20} className="group-hover:text-blue-500 transition-colors" />
              Relatórios Pendentes
            </div>
            <span className="bg-red-500/10 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-500/20">
              {stats.relatoriosPendentes}
            </span>
          </Link>
        </nav>

        <div className="p-6 border-t border-zinc-800/50">
          <button className="flex items-center gap-3 w-full rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-400/5 px-4 py-3 text-sm font-medium transition-all">
            <LogOut size={20} />
            Sair
          </button>
        </div>
      </aside>

      {/* Conteúdo Central */}
      <main className="flex-1">
        {/* Top Header */}
        <header className="flex items-center justify-between px-10 py-6 border-b border-zinc-800/50 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-20">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Olá, Leonardo</h1>
            <p className="text-zinc-500 text-sm mt-0.5">Residência Tech e Mentorias em dia. Aqui está o seu resumo.</p>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-zinc-400 hover:text-white transition-colors">
              <Bell size={22} />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#050505]"></span>
            </button>
            <div className="flex items-center gap-3 p-1 pr-4 rounded-full bg-zinc-900/50 border border-zinc-800/50">
              <img 
                src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=100&h=100&q=80" 
                className="w-8 h-8 rounded-full object-cover border border-zinc-700" 
                alt="Me" 
              />
              <ChevronRight size={14} className="text-zinc-600" />
            </div>
          </div>
        </header>

        <div className="p-10 space-y-10 max-w-[1400px] mx-auto">
          
          {/* Grid de Estatísticas */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl bg-[#0a0a0a] border border-zinc-800/50 shadow-sm transition-all">
              <p className="text-zinc-500 text-sm font-medium">Ganhos do Mês</p>
              <div className="flex items-baseline gap-2 mt-2">
                <h3 className="text-3xl font-bold">R$ {stats.ganhosMes.toFixed(2).replace('.', ',')}</h3>
                <span className="text-emerald-500 text-xs font-bold flex items-center">
                   <span className="mr-0.5">↗</span> +15%
                </span>
              </div>
              <p className="text-[11px] text-zinc-600 mt-2 uppercase tracking-wider font-bold">Em relação ao mês passado</p>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl bg-[#0a0a0a] border border-zinc-800/50 shadow-sm transition-all">
              <p className="text-zinc-500 text-sm font-medium">Avaliação Média</p>
              <div className="flex items-baseline gap-2 mt-2">
                <h3 className="text-3xl font-bold">{stats.avaliacoes}</h3>
                <span className="text-yellow-500 text-sm">★</span>
              </div>
              <p className="text-[11px] text-zinc-600 mt-2 uppercase tracking-wider font-bold">Baseado em {stats.sessoesRealizadas} sessões</p>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="p-6 rounded-2xl bg-[#0a0a0a] border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.05)] transition-all relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                <FileText size={40} className="text-red-500" />
              </div>
              <p className="text-red-500/80 text-sm font-bold">Ação Necessária</p>
              <h3 className="text-4xl font-black mt-2">{stats.relatoriosPendentes}</h3>
              <p className="text-[11px] text-zinc-600 mt-2 uppercase tracking-wider font-bold">Relatórios aguardando envio</p>
            </motion.div>
          </section>

          {/* Grade de Sessões */}
          <section className="bg-[#0a0a0a] rounded-3xl border border-zinc-800/50 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-zinc-800/50 flex flex-col sm:flex-row justify-between items-center gap-4 bg-[#0c0c0c]">
              <h2 className="text-xl font-bold">Sua Grade de Sessões</h2>
              <div className="flex items-center gap-4 bg-zinc-900/80 p-1.5 rounded-2xl border border-zinc-800">
                <span className="pl-3 text-xs font-bold text-zinc-500 uppercase tracking-widest">Filtrar por data:</span>
                <input 
                  type="date" 
                  value={dataFiltro}
                  onChange={(e) => setDataFiltro(e.target.value)}
                  className="bg-zinc-800 text-sm rounded-xl px-4 py-2 border border-zinc-700 outline-none focus:ring-2 ring-blue-500/20 transition-all [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="divide-y divide-zinc-800/50">
              {agendamentos.map((sessao) => (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={sessao.id} 
                  className="p-8 flex flex-col md:flex-row items-center justify-between group hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-6">
                    <div className={`h-14 w-14 rounded-full ${sessao.cor} flex items-center justify-center font-bold text-lg text-white shadow-inner`}>
                      {sessao.alunoNome.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold group-hover:text-blue-400 transition-colors">{sessao.alunoNome}</h4>
                      <p className="text-zinc-500 text-sm font-medium">{sessao.vagaAlvo}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-10 mt-6 md:mt-0">
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-2 text-zinc-300 font-semibold">
                        <Clock size={16} className="text-zinc-600" />
                        {sessao.hora}
                      </div>
                      <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest mt-1">Horário de Brasília</span>
                    </div>

                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-2xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-600/20">
                      <Video size={18} />
                      Entrar na Sala (Meet)
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}