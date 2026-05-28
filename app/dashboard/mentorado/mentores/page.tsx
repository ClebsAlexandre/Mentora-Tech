"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
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
  MessageSquare,
  Loader2
} from "lucide-react";

// Tipagem baseada na resposta da nossa API (Prisma)
type PerfilMentor = {
  bio: string | null;
  precoHora: string | number | null;
  especialidades: string[];
};

type MentorAPI = {
  id: string;
  nome: string;
  avatarUrl: string | null;
  perfilMentor: PerfilMentor | null;
};

const CATEGORIAS = ["Todos", "Frontend", "Backend", "Mobile", "Cloud & Infra", "QA"];

export default function MentoradoMentoresPage() {
  const router = useRouter();
  
  // Estados da página
  const [busca, setBusca] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todos");
  const [mentores, setMentores] = useState<MentorAPI[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Efeito de Autenticação e Fetching
  useEffect(() => {
    // 1. Verificação de Segurança (Proteção de Rota)
    const token = Cookies.get("mentora_tech_token");
    if (!token) {
      router.push("/login");
      return;
    }

    // 2. Busca de Dados da API
    const fetchMentores = async () => {
      try {
        const resposta = await fetch("http://localhost:3333/api/mentores", {
          headers: {
            "Authorization": `Bearer ${token}` // Boa prática de segurança
          }
        });

        if (!resposta.ok) {
          throw new Error("Falha ao buscar mentores.");
        }

        const dados = await resposta.json();
        setMentores(dados);
      } catch (error) {
        console.error("Erro na API:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMentores();
  }, [router]);

  // Lógica de Filtro Interativo
  const mentoresFiltrados = mentores.filter(mentor => {
    const especialidades = mentor.perfilMentor?.especialidades || [];
    
    const matchBusca = mentor.nome.toLowerCase().includes(busca.toLowerCase()) || 
                       especialidades.some(esp => esp.toLowerCase().includes(busca.toLowerCase()));
    
    if (categoriaAtiva === "Todos") return matchBusca;
    
    // Filtros genéricos baseados nas palavras-chave (ajuste conforme necessário)
    if (categoriaAtiva === "Frontend") return matchBusca && especialidades.some(e => e.toLowerCase().includes("react") || e.toLowerCase().includes("front"));
    if (categoriaAtiva === "Backend") return matchBusca && especialidades.some(e => e.toLowerCase().includes("node") || e.toLowerCase().includes("back") || e.toLowerCase().includes("postgres"));
    if (categoriaAtiva === "Mobile") return matchBusca && especialidades.some(e => e.toLowerCase().includes("flutter") || e.toLowerCase().includes("react native"));
    if (categoriaAtiva === "Cloud & Infra") return matchBusca && especialidades.some(e => e.toLowerCase().includes("aws") || e.toLowerCase().includes("docker"));
    if (categoriaAtiva === "QA") return matchBusca && especialidades.some(e => e.toLowerCase().includes("qa") || e.toLowerCase().includes("teste"));
    
    return matchBusca;
  });

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#050505] text-blue-500">
        <Loader2 size={48} className="animate-spin" />
      </div>
    );
  }

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
          <Link href="/dashboard/mentorado/feedbacks" className="flex items-center gap-3 rounded-xl text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200 px-4 py-3.5 text-sm font-medium transition-all group">
            <MessageSquare size={20} className="group-hover:text-blue-500 transition-colors" />
            Meus Feedbacks
          </Link>
        </nav>

        <div className="p-6 border-t border-zinc-800/50">
          <button 
            onClick={() => {
              Cookies.remove("mentora_tech_token");
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

          {/* Vitrine de Mentores Dinâmica */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
            <AnimatePresence>
              {mentoresFiltrados.length > 0 ? (
                mentoresFiltrados.map((mentor) => {
                  const especialidades = mentor.perfilMentor?.especialidades || [];
                  const preco = mentor.perfilMentor?.precoHora ? Number(mentor.perfilMentor.precoHora).toFixed(2) : "A combinar";
                  const bio = mentor.perfilMentor?.bio || "Este mentor ainda não atualizou a sua biografia. Entre em contacto para saber mais!";
                  // Fallback para caso o mentor ainda não tenha foto configurada
                  const avatarFallback = mentor.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.nome)}&background=2563eb&color=fff`;

                  return (
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
                            src={avatarFallback} 
                            alt={mentor.nome} 
                            className="w-24 h-24 rounded-2xl object-cover border-2 border-zinc-800 group-hover:border-blue-500/50 transition-colors"
                          />
                          <div className="flex-1 w-full">
                            <div className="flex justify-between items-start gap-4">
                              <div>
                                <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{mentor.nome}</h2>
                                <p className="text-sm text-zinc-400 mt-0.5">Especialista Tech</p>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-lg font-bold text-white bg-zinc-900/50 px-3 py-1.5 rounded-lg border border-zinc-800 whitespace-nowrap">
                                  {preco !== "A combinar" ? `R$ ${preco}` : preco}
                                  {preco !== "A combinar" && <span className="text-xs text-zinc-500 font-normal">/h</span>}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 mt-3">
                              <div className="flex items-center gap-1.5 bg-yellow-500/10 px-2 py-1 rounded-md border border-yellow-500/20">
                                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                <span className="text-xs font-bold text-yellow-500">Novo</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-zinc-500 text-xs font-medium">
                                <Clock size={14} />
                                Disponível
                              </div>
                            </div>
                          </div>
                        </div>

                        <p className="mt-6 text-sm text-zinc-400 leading-relaxed line-clamp-3">
                          {bio}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {especialidades.map(esp => (
                            <span key={esp} className="bg-blue-600/10 text-blue-400 border border-blue-500/20 px-3 py-1.5 rounded-lg text-xs font-semibold">
                              {esp}
                            </span>
                          ))}
                          {especialidades.length === 0 && (
                            <span className="text-xs text-zinc-600 italic">Especialidades não informadas</span>
                          )}
                        </div>
                      </div>

                      <div className="p-4 border-t border-zinc-800/50 bg-[#0c0c0c]">
                        <button className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all hover:scale-[1.01] active:scale-95 shadow-lg shadow-white/5">
                          Agendar Sessão
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })
              ) : (
                <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
                  <div className="bg-zinc-900 p-4 rounded-full mb-4">
                    <Search size={32} className="text-zinc-600" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Nenhum mentor encontrado</h3>
                  <p className="text-zinc-500 max-w-md">Ainda não existem mentores com estes critérios ou não foi retornado nenhum dado da API.</p>
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