"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function MentorDashboard() {
  // Simulando a data atual para o filtro de agendamentos
  const [dataFiltro, setDataFiltro] = useState<string>("2026-05-26");

  // Dados simulados do mentor (serão substituídos pelos dados do banco)
  const stats = {
    ganhosMes: 1250.0,
    avaliacoes: 4.9,
    sessoesRealizadas: 14,
    relatoriosPendentes: 2,
  };

  // Simulação de agendamentos que respondem ao filtro de data
  const agendamentosMocados = [
    {
      id: "1",
      alunoNome: "Ana Silva",
      vagaAlvo: "Desenvolvedor Frontend - React",
      hora: "14:00 - 15:00",
      status: "confirmado",
      data: "2026-05-26",
      salaUrl: "https://meet.google.com/abc-defg-hij",
    },
    {
      id: "2",
      alunoNome: "Carlos Eduardo",
      vagaAlvo: "Full Stack (Node.js & Next.js)",
      hora: "16:30 - 17:30",
      status: "confirmado",
      data: "2026-05-26",
      salaUrl: "https://meet.google.com/xyz-uvw-rst",
    },
    {
      id: "3",
      alunoNome: "Beatriz Lima",
      vagaAlvo: "Estágio em Engenharia de Software",
      hora: "10:00 - 11:00",
      status: "confirmado",
      data: "2026-05-27", // Dia seguinte
      salaUrl: "#",
    },
  ];

  // Filtra os registros com base na data específica selecionada pelo usuário
  const agendamentosFiltrados = agendamentosMocados.filter(
    (ag) => ag.data === dataFiltro
  );

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Sidebar Lateral */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-950 p-6 hidden md:flex flex-col">
        <div className="flex items-center gap-2 mb-12">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 font-bold text-white">
            M
          </div>
          <span className="text-xl font-bold tracking-tight">Mentora Tech</span>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <Link href="/dashboard/mentor" className="flex items-center gap-3 rounded-lg bg-blue-600/10 text-blue-500 px-4 py-3 text-sm font-medium transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            Visão Geral
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-white px-4 py-3 text-sm font-medium transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Minha Agenda
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-white px-4 py-3 text-sm font-medium transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Relatórios Pendentes
            {stats.relatoriosPendentes > 0 && (
              <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-red-500/20 text-xs text-red-500 font-bold">
                {stats.relatoriosPendentes}
              </span>
            )}
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-zinc-800">
          <Link href="#" className="flex items-center gap-3 rounded-lg text-zinc-400 hover:text-white px-4 py-2 text-sm font-medium transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            Sair
          </Link>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Header do Dashboard */}
        <header className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950/50 px-8 py-5 backdrop-blur-sm sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold">Olá, Leonardo 👋</h1>
            <p className="text-sm text-zinc-400">Residência Tech e Mentorias em dia. Aqui está o seu resumo.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-red-500"></span>
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-zinc-800 bg-zinc-800 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=100&h=100&q=80" alt="Avatar do Mentor" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full">
          {/* Métricas (Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="text-zinc-400 text-sm font-medium mb-2">Ganhos do Mês</div>
              <div className="text-3xl font-bold text-white">R$ {stats.ganhosMes.toFixed(2).replace('.', ',')}</div>
              <div className="mt-2 text-xs text-green-400 flex items-center gap-1">
                <span>↗</span> +15% em relação ao mês passado
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="text-zinc-400 text-sm font-medium mb-2">Avaliação Média</div>
              <div className="text-3xl font-bold text-white flex items-end gap-2">
                {stats.avaliacoes} <span className="text-lg text-yellow-500">⭐</span>
              </div>
              <div className="mt-2 text-xs text-zinc-500">Baseado em {stats.sessoesRealizadas} sessões</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl border border-red-900/30 bg-red-900/10 p-6">
              <div className="text-red-400 text-sm font-medium mb-2">Ação Necessária</div>
              <div className="text-3xl font-bold text-white">{stats.relatoriosPendentes}</div>
              <div className="mt-2 text-xs text-zinc-400">Relatórios de entrevista aguardando envio</div>
            </motion.div>
          </div>

          {/* Seção de Agendamentos */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-zinc-800 gap-4">
              <h2 className="text-lg font-bold text-white">Sua Grade de Sessões</h2>
              
              {/* Filtro de Data Dinâmico */}
              <div className="flex items-center gap-3">
                <label htmlFor="dataFiltro" className="text-sm text-zinc-400 font-medium">Filtrar por data:</label>
                <input
                  type="date"
                  id="dataFiltro"
                  value={dataFiltro}
                  onChange={(e) => setDataFiltro(e.target.value)}
                  className="rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="p-0">
              {agendamentosFiltrados.length > 0 ? (
                <div className="flex flex-col divide-y divide-zinc-800/50">
                  {agendamentosFiltrados.map((agendamento) => (
                    <div key={agendamento.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-zinc-800/30 transition-colors gap-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600/10 text-blue-500 font-bold text-lg ring-1 ring-blue-600/20">
                          {agendamento.alunoNome.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-white">{agendamento.alunoNome}</p>
                          <p className="text-sm text-zinc-400">{agendamento.vagaAlvo}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:items-end gap-2">
                        <div className="flex items-center gap-2 text-sm text-zinc-300">
                          <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          {agendamento.hora}
                        </div>
                        <a 
                          href={agendamento.salaUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                        >
                          Entrar na Sala (Meet)
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-zinc-500 flex flex-col items-center">
                  <svg className="w-12 h-12 text-zinc-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <p className="text-lg font-medium">Nenhuma mentoria agendada para este dia.</p>
                  <p className="text-sm mt-1">Altere o filtro de data acima para buscar outras sessões.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}