"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Search, 
  MessageSquare, 
  LogOut, 
  Bell, 
  ChevronRight,
  ArrowLeft,
  Star,
  Award,
  ThumbsUp,
  Target,
  Briefcase
} from "lucide-react";

// Tipagem e Mock baseados na tabela relatorio_entrevista
type Feedback = {
  id: string;
  mentorNome: string;
  mentorAvatar: string;
  vagaAlvo: string;
  data: string;
  notaTecnica: number;
  notaSoftSkills: number;
  pontosFortes: string;
  pontosMelhoria: string;
  veredito: "contrataria" | "talvez" | "nao_contrataria";
};

export default function MentoradoFeedbacksPage() {
  const [feedbackSelecionado, setFeedbackSelecionado] = useState<Feedback | null>(null);

  const feedbacks: Feedback[] = [
    {
      id: "f1",
      mentorNome: "Carlos Souza",
      mentorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80",
      vagaAlvo: "Desenvolvedor Júnior Full Stack",
      data: "20 de Maio de 2026",
      notaTecnica: 8,
      notaSoftSkills: 9,
      pontosFortes: "Excelente domínio de React Hooks e componentização. Boa comunicação durante o pair programming e raciocínio lógico rápido ao resolver o desafio de algoritmos.",
      pontosMelhoria: "Precisa aprofundar os conhecimentos em testes automatizados (Jest/Testing Library). Senti um pouco de insegurança ao lidar com o setup inicial do banco de dados no Node.js.",
      veredito: "contrataria"
    },
    {
      id: "f2",
      mentorNome: "Ana Silva",
      mentorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
      vagaAlvo: "Estágio em Engenharia de Software",
      data: "15 de Maio de 2026",
      notaTecnica: 6,
      notaSoftSkills: 8,
      pontosFortes: "Muita vontade de aprender, fez perguntas excelentes sobre a cultura da empresa e tem uma base sólida de HTML, CSS e JavaScript puro.",
      pontosMelhoria: "Ainda está muito preso a tutoriais. Precisa começar a construir projetos próprios do zero para entender o fluxo completo de uma aplicação, desde o front até o deploy.",
      veredito: "talvez"
    }
  ];

  // Helper para renderizar o selo do veredito
  const renderVereditoBadge = (veredito: string) => {
    switch (veredito) {
      case "contrataria":
        return <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2"><ThumbsUp size={16} /> Aprovado / Contrataria</span>;
      case "talvez":
        return <span className="bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 px-3 py-1.5 rounded-lg text-sm font-bold flex items-center gap-2"><Target size={16} /> Talvez / Segunda Fase</span>;
      default:
        return <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg text-sm font-bold">Reprovado no Momento</span>;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050505] text-zinc-100 font-sans">
      
      {/* Sidebar Lateral Premium */}
      <aside className="w-72 border-r border-zinc-800/50 bg-[#0a0a0a] flex flex-col sticky top-0 h-screen hidden md:flex">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:scale-105 transition-transform">M</div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">Mentora Tech</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <Link href="/dashboard/mentorado" className="flex items-center gap-3 rounded-xl text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200 px-4 py-3.5 text-sm font-medium transition-all group">
            <LayoutDashboard size={20} className="group-hover:text-blue-500 transition-colors" />
            Meu Progresso
          </Link>
          <Link href="/dashboard/mentorado/mentores" className="flex items-center gap-3 rounded-xl text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200 px-4 py-3.5 text-sm font-medium transition-all group">
            <Search size={20} className="group-hover:text-blue-500 transition-colors" />
            Encontrar Mentores
          </Link>
          <Link href="/dashboard/mentorado/feedbacks" className="flex items-center gap-3 rounded-xl bg-blue-600/10 text-blue-500 px-4 py-3.5 text-sm font-semibold border border-blue-500/20">
            <MessageSquare size={20} />
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
            <h1 className="text-2xl font-bold tracking-tight">Meus Feedbacks</h1>
            <p className="text-zinc-500 text-sm mt-0.5">Leia os relatórios técnicos deixados pelos seus mentores.</p>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-zinc-400 hover:text-white transition-colors">
              <Bell size={22} />
            </button>
            <div className="flex items-center gap-3 p-1 pr-4 rounded-full bg-zinc-900/50 border border-zinc-800/50">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs border border-zinc-700">L</div>
              <ChevronRight size={14} className="text-zinc-600" />
            </div>
          </div>
        </header>

        <div className="p-10 max-w-5xl mx-auto w-full">
          <AnimatePresence mode="wait">
            
            {/* VISTA 1: LISTA DE FEEDBACKS */}
            {!feedbackSelecionado ? (
              <motion.div key="lista" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                <div className="bg-[#0a0a0a] rounded-3xl border border-zinc-800/50 overflow-hidden shadow-2xl divide-y divide-zinc-800/50">
                  {feedbacks.length > 0 ? (
                    feedbacks.map((fb) => (
                      <div key={fb.id} className="p-8 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-white/[0.01] transition-colors gap-6">
                        <div className="flex items-center gap-5">
                          <img src={fb.mentorAvatar} alt={fb.mentorNome} className="w-14 h-14 rounded-full border-2 border-zinc-800 object-cover" />
                          <div>
                            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{fb.data}</p>
                            <h3 className="text-lg font-bold text-zinc-100 mt-0.5">{fb.vagaAlvo}</h3>
                            <p className="text-sm text-zinc-400 mt-0.5">Sessão com <span className="text-white font-medium">{fb.mentorNome}</span></p>
                          </div>
                        </div>

                        <div className="flex items-center gap-8 w-full md:w-auto border-t md:border-none border-zinc-800/50 pt-4 md:pt-0">
                          <div className="flex gap-6">
                            <div className="text-center">
                              <p className="text-[10px] uppercase font-bold text-zinc-500">Técnica</p>
                              <p className="font-bold text-blue-400 text-lg">{fb.notaTecnica}<span className="text-xs text-zinc-600">/10</span></p>
                            </div>
                            <div className="text-center">
                              <p className="text-[10px] uppercase font-bold text-zinc-500">Soft Skills</p>
                              <p className="font-bold text-yellow-500 text-lg">{fb.notaSoftSkills}<span className="text-xs text-zinc-600">/10</span></p>
                            </div>
                          </div>

                          <button 
                            onClick={() => setFeedbackSelecionado(fb)}
                            className="bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md hover:scale-[1.02]"
                          >
                            Ler Relatório
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-12 text-center text-zinc-500 flex flex-col items-center">
                      <MessageSquare size={44} className="text-zinc-700 mb-4" />
                      <p className="text-lg font-medium text-zinc-300">Nenhum feedback recebido ainda.</p>
                      <p className="text-sm mt-1">Realize sua primeira sessão de mentoria para receber relatórios.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              
              /* VISTA 2: RELATÓRIO DETALHADO */
              <motion.div key="detalhe" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <button 
                  onClick={() => setFeedbackSelecionado(null)}
                  className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors mb-2"
                >
                  <ArrowLeft size={16} /> Voltar para a lista
                </button>

                {/* Cabeçalho do Relatório */}
                <div className="bg-[#0a0a0a] rounded-3xl border border-zinc-800/50 p-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Briefcase size={120} />
                  </div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                      <span className="text-xs uppercase tracking-widest font-bold text-blue-500 mb-2 block">Relatório de Desempenho</span>
                      <h2 className="text-2xl font-bold">{feedbackSelecionado.vagaAlvo}</h2>
                      <div className="flex items-center gap-3 mt-3 text-sm text-zinc-400">
                        <img src={feedbackSelecionado.mentorAvatar} alt="Mentor" className="w-6 h-6 rounded-full border border-zinc-700" />
                        Avaliado por {feedbackSelecionado.mentorNome} • {feedbackSelecionado.data}
                      </div>
                    </div>
                    <div>
                      {renderVereditoBadge(feedbackSelecionado.veredito)}
                    </div>
                  </div>

                  {/* Notas */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-zinc-800/50 relative z-10">
                    <div className="bg-zinc-900/50 rounded-2xl p-5 border border-zinc-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Award size={20} /></div>
                        <span className="font-semibold text-zinc-300">Nota Técnica</span>
                      </div>
                      <span className="text-2xl font-black text-white">{feedbackSelecionado.notaTecnica}<span className="text-sm text-zinc-600 font-medium">/10</span></span>
                    </div>

                    <div className="bg-zinc-900/50 rounded-2xl p-5 border border-zinc-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500"><Star size={20} /></div>
                        <span className="font-semibold text-zinc-300">Soft Skills</span>
                      </div>
                      <span className="text-2xl font-black text-white">{feedbackSelecionado.notaSoftSkills}<span className="text-sm text-zinc-600 font-medium">/10</span></span>
                    </div>
                  </div>
                </div>

                {/* Textos de Feedback */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#0a0a0a] rounded-3xl border border-zinc-800/50 p-8 shadow-xl">
                    <h3 className="text-lg font-bold text-emerald-400 mb-4 flex items-center gap-2">
                      <ThumbsUp size={18} /> Pontos Fortes
                    </h3>
                    <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                      {feedbackSelecionado.pontosFortes}
                    </p>
                  </div>

                  <div className="bg-[#0a0a0a] rounded-3xl border border-zinc-800/50 p-8 shadow-xl">
                    <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                      <Target size={18} /> O que focar nos estudos
                    </h3>
                    <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                      {feedbackSelecionado.pontosMelhoria}
                    </p>
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}