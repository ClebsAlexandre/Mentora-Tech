"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function MentoradoDashboard() {
  // Dados simulados do aluno focados na jornada de evolução
  const stats = {
    mentoriasConcluidas: 4,
    feedbacksRecebidos: 4,
    proximaSessaoEm: "Amanhã, 14:00",
  };

  // Simulação de agendamentos (Futuros e Passados)
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
          <Link href="/dashboard/mentorado" className="flex items-center gap-3 rounded-lg bg-blue-600/10 text-blue-500 px-4 py-3 text-sm font-medium transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            Meu Progresso
          </Link>
          <Link href="/mentores" className="flex items-center gap-3 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-white px-4 py-3 text-sm font-medium transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            Encontrar Mentores
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-white px-4 py-3 text-sm font-medium transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Meus Feedbacks
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
            <h1 className="text-2xl font-bold">Olá, Leonardo 🚀</h1>
            <p className="text-sm text-zinc-400">Preparado para dar o próximo passo na sua carreira tech?</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-zinc-800 bg-blue-600 flex items-center justify-center text-white font-bold">
              L
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full">
          {/* Métricas do Aluno */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="text-zinc-400 text-sm font-medium mb-2">Mentorias Concluídas</div>
              <div className="text-3xl font-bold text-white">{stats.mentoriasConcluidas}</div>
              <div className="mt-2 text-xs text-zinc-500">Horas de puro aprendizado prático</div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="text-zinc-400 text-sm font-medium mb-2">Feedbacks Técnicos</div>
              <div className="text-3xl font-bold text-white">{stats.feedbacksRecebidos}</div>
              <div className="mt-2 text-xs text-zinc-500">Relatórios gerados pelos mentores</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="rounded-2xl border border-blue-900/30 bg-blue-900/10 p-6">
              <div className="text-blue-400 text-sm font-medium mb-2">Próxima Sessão</div>
              <div className="text-xl font-bold text-white mt-1">{stats.proximaSessaoEm}</div>
              <Link href="#proxima" className="mt-3 inline-block text-xs font-semibold text-blue-500 hover:text-blue-400">Ver detalhes &rarr;</Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Coluna Principal: Próxima Sessão e Buscador */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              
              {/* Destaque: Próxima Mentoria */}
              <section id="proxima" className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900/80 to-zinc-950 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none"></div>
                
                <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <span className="flex h-3 w-3 rounded-full bg-blue-500 animate-pulse"></span>
                  Sua Próxima Mentoria
                </h2>

                {proximasSessoes.map((sessao) => (
                  <div key={sessao.id} className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between z-10 relative">
                    <div className="flex items-center gap-5">
                      <img src={sessao.mentorAvatar} alt={sessao.mentorNome} className="w-16 h-16 rounded-full border-2 border-zinc-700 object-cover" />
                      <div>
                        <p className="text-sm text-zinc-400 mb-1">{sessao.dataHora}</p>
                        <h3 className="text-xl font-bold text-white">{sessao.foco}</h3>
                        <p className="text-sm text-blue-400 font-medium mt-1">com {sessao.mentorNome}</p>
                      </div>
                    </div>
                    
                    <a 
                      href={sessao.salaUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="w-full md:w-auto inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:-translate-y-0.5"
                    >
                      Acessar Sala (Meet)
                    </a>
                  </div>
                ))}
              </section>

              {/* Histórico e Relatórios (Tabela 'relatorio_entrevista') */}
              <section className="rounded-2xl border border-zinc-800 bg-zinc-900/30 overflow-hidden">
                <div className="p-6 border-b border-zinc-800">
                  <h2 className="text-lg font-bold text-white">Histórico de Feedbacks</h2>
                  <p className="text-sm text-zinc-400 mt-1">Acesse os relatórios das suas sessões passadas.</p>
                </div>

                <div className="flex flex-col divide-y divide-zinc-800/50">
                  {historicoSessoes.map((historico) => (
                    <div key={historico.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-zinc-800/30 transition-colors gap-4">
                      <div className="flex items-center gap-4">
                        <img src={historico.mentorAvatar} alt={historico.mentorNome} className="w-10 h-10 rounded-full border border-zinc-700 object-cover hidden sm:block" />
                        <div>
                          <p className="font-bold text-white text-sm">Simulado: {historico.vagaAlvo}</p>
                          <p className="text-xs text-zinc-500 mt-1">{historico.dataHora} • Mentor: {historico.mentorNome}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                          <p className="text-xs text-zinc-500">Nota Técnica</p>
                          <p className="font-bold text-white">{historico.notaTecnica} / 10</p>
                        </div>
                        <button className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 hover:border-zinc-600">
                          Ler Relatório
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Coluna Lateral: Ações Rápidas e Dicas */}
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
                <h3 className="font-bold text-white mb-4">Próximo Passo</h3>
                <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                  Agende uma nova mentoria focada em arquitetura ou revisão de código para continuar evoluindo.
                </p>
                <Link href="/mentores" className="flex w-full items-center justify-center rounded-xl bg-white text-black px-4 py-3 text-sm font-bold transition-colors hover:bg-zinc-200">
                  Buscar Novos Mentores
                </Link>
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <span>💡</span> Dica da Mentora Tech
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Antes de uma sessão de Simulado Técnico, certifique-se de enviar o link do seu portfólio (GitHub) ou currículo atualizado para o mentor pelo menos 24 horas antes do agendamento.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}