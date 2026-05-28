"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Search, 
  LogOut, 
  Bell, 
  ChevronRight,
  Star,
  Clock,
  Filter,
  ArrowRight,
  MessageSquare
} from "lucide-react";

// Mock de dados dos mentores (Simulando a tabela usuarios + perfis_mentores)
const MENTORES_MOCK = [
  {
    id: "m1",
    nome: "Carlos Souza",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80",
    cargo: "Senior Software Engineer",
    empresa: "Tech Global",
    precoHora: 120,
    avaliacao: 4.9,
    sessoes: 42,
    especialidades: ["React", "Node.js", "Arquitetura"],
    bio: "Especialista em ecossistema JavaScript. Posso te ajudar a estruturar projetos escaláveis em React e Node.js, além de preparar para entrevistas técnicas focadas em vagas de nível Júnior e Pleno.",
  },
  {
    id: "m2",
    nome: "Ana Beatriz Lima",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    cargo: "Cloud Architect & Tech Lead",
    empresa: "CloudOps Startups",
    precoHora: 150,
    avaliacao: 5.0,
    sessoes: 89,
    especialidades: ["AWS", "Docker", "PostgreSQL"],
    bio: "Foco em infraestrutura, deploy e banco de dados. Se você precisa entender como escalar uma aplicação com Docker, AWS Practitioner ou otimizar queries em PostgreSQL, marque uma sessão.",
  },
  {
    id: "m3",
    nome: "Diego Fernandes",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
    cargo: "Mobile Tech Lead",
    empresa: "App Masters",
    precoHora: 90,
    avaliacao: 4.8,
    sessoes: 27,
    especialidades: ["Flutter", "React Native", "UI/UX"],
    bio: "Desenvolvedor mobile há 8 anos. Ajudo residentes e desenvolvedores em início de carreira a tirar projetos mobile do papel e colocar nas lojas da Apple e Google com qualidade.",
  },
  {
    id: "m4",
    nome: "Juliana Costa",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
    cargo: "Engenheira de Qualidade (QA)",
    empresa: "CESAR Labs",
    precoHora: 80,
    avaliacao: 4.9,
    sessoes: 15,
    especialidades: ["QA", "Testes Automatizados", "Cypress"],
    bio: "Garanta que o seu código funciona antes de ir para produção. Ensino fundamentos de software testing, validação de funcionalidades e identificação de falhas para devs Full Stack.",
  }
];

const CATEGORIAS = ["Todos", "Frontend", "Backend", "Mobile", "Cloud & Infra", "QA"];

export default function MentoradoMentoresPage() {
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");

  // Lógica de Filtro Simples
  const mentoresFiltrados = MENTORES_MOCK.filter(mentor => {
    const matchBusca = mentor.nome.toLowerCase().includes(busca.toLowerCase()) || 
                       mentor.especialidades.some(esp => esp.toLowerCase().includes(busca.toLowerCase()));
    
    if (categoriaAtiva === "Todos") return matchBusca;
    if (categoriaAtiva === "Frontend") return matchBusca && mentor.especialidades.some(e => ["React", "UI/UX"].includes(e));
    if (categoriaAtiva === "Backend") return matchBusca && mentor.especialidades.some(e => ["Node.js", "PostgreSQL", "Arquitetura"].includes(e));
    if (categoriaAtiva === "Mobile") return matchBusca && mentor.especialidades.some(e => ["Flutter", "React Native"].includes(e));
    if (categoriaAtiva === "Cloud & Infra") return matchBusca && mentor.especialidades.some(e => ["AWS", "Docker"].includes(e));
    if (categoriaAtiva === "QA") return matchBusca && mentor.especialidades.some(e => ["QA", "Testes Automatizados", "Cypress"].includes(e));
    
    return matchBusca;
  });

  return (
    <div className="flex min-h-screen bg-[#050505] text-zinc-100 font-sans">
      
      {/* Sidebar Lateral (Visão Aluno) */}
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
          <Link href="/dashboard/mentorado" className="flex items-center gap-3 rounded-xl text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200 px-4 py-3.5 text-sm font-medium transition-all group">
            <LayoutDashboard size={20} className="group-hover:text-blue-500 transition-colors" />
            Meu Progresso
          </Link>
          <Link href="/dashboard/mentorado/mentores" className="flex items-center gap-3 rounded-xl bg-blue-600/10 text-blue-500 px-4 py-3.5 text-sm font-semibold border border-blue-500/20">
            <Search size={20} />
            Encontrar Mentores
          </Link>
          <Link href="#" className="flex items-center gap-3 rounded-xl text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200 px-4 py-3.5 text-sm font-medium transition-all group">
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

      {/* Conteúdo Central */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Top Header */}
        <header className="flex items-center justify-between px-10 py-6 border-b border-zinc-800/50 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-20">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Mentores Disponíveis</h1>
            <p className="text-zinc-500 text-sm mt-0.5">Encontre o especialista ideal para guiar a sua carreira e projetos.</p>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-zinc-400 hover:text-white transition-colors">
              <Bell size={22} />
            </button>
            <div className="flex items-center gap-3 p-1 pr-4 rounded-full bg-zinc-900/50 border border-zinc-800/50">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs border border-zinc-700">
                L
              </div>
              <ChevronRight size={14} className="text-zinc-600" />
            </div>
          </div>
        </header>

        <div className="p-10 max-w-[1400px] mx-auto w-full space-y-8">
          
          {/* Barra de Busca e Filtros */}
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-center bg-[#0a0a0a] p-6 rounded-3xl border border-zinc-800/50 shadow-lg">
            
            <div className="relative w-full lg:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={20} className="text-zinc-500" />
              </div>
              <input
                type="text"
                placeholder="Busque por nome, tecnologia (ex: React, AWS)..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full bg-zinc-900/50 border border-zinc-800 text-white rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-zinc-600"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 hide-scrollbar">
              <div className="flex items-center gap-2 text-zinc-500 mr-2">
                <Filter size={18} />
                <span className="text-sm font-semibold">Filtros:</span>
              </div>
              {CATEGORIAS.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoriaAtiva(cat)}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    categoriaAtiva === cat 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                      : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Vitrine de Mentores */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
            <AnimatePresence>
              {mentoresFiltrados.length > 0 ? (
                mentoresFiltrados.map((mentor) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    key={mentor.id}
                    className="bg-[#0a0a0a] rounded-3xl border border-zinc-800/50 overflow-hidden hover:border-blue-500/30 transition-colors flex flex-col group"
                  >
                    <div className="p-8 flex-1">
                      <div className="flex flex-col sm:flex-row gap-6 items-start">
                        <img 
                          src={mentor.avatar} 
                          alt={mentor.nome} 
                          className="w-24 h-24 rounded-2xl object-cover border-2 border-zinc-800 group-hover:border-blue-500/50 transition-colors"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{mentor.nome}</h2>
                              <p className="text-sm text-zinc-400 mt-0.5">{mentor.cargo} @ {mentor.empresa}</p>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-lg font-bold text-white bg-zinc-900/50 px-3 py-1.5 rounded-lg border border-zinc-800">
                                R$ {mentor.precoHora}<span className="text-xs text-zinc-500 font-normal">/h</span>
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center gap-1.5 bg-yellow-500/10 px-2 py-1 rounded-md border border-yellow-500/20">
                              <Star size={14} className="text-yellow-500 fill-yellow-500" />
                              <span className="text-xs font-bold text-yellow-500">{mentor.avaliacao}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-medium">
                              <Clock size={14} />
                              {mentor.sessoes} mentorias realizadas
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="mt-6 text-sm text-zinc-400 leading-relaxed line-clamp-3">
                        {mentor.bio}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {mentor.especialidades.map(esp => (
                          <span key={esp} className="bg-blue-600/10 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-lg text-xs font-semibold">
                            {esp}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 border-t border-zinc-800/50 bg-[#0c0c0c]">
                      <button className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all hover:scale-[1.01] active:scale-95 shadow-lg shadow-white/5">
                        Agendar Sessão
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
                  <div className="bg-zinc-900 p-4 rounded-full mb-4">
                    <Search size={32} className="text-zinc-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Nenhum mentor encontrado</h3>
                  <p className="text-zinc-500 max-w-md">Não conseguimos encontrar nenhum especialista com o termo "{busca}" ou na categoria selecionada. Tente limpar os filtros.</p>
                  <button 
                    onClick={() => { setBusca(""); setCategoriaAtiva("Todos"); }}
                    className="mt-6 text-blue-500 hover:text-blue-400 font-bold text-sm"
                  >
                    Limpar todos os filtros
                  </button>
                </div>
              )}
            </AnimatePresence>
          </div>
          
        </div>
      </main>
    </div>
  );
}