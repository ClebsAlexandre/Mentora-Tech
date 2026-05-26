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
  User,
  Save,
  Camera,
  DollarSign,
  Briefcase
} from "lucide-react";

  import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';

export default function MentorPerfilPage() {
  const [isLoading, setIsLoading] = useState(false);

  // Estados preenchidos com os dados da tabela usuarios e perfis_mentores
  const [nome, setNome] = useState("Leonardo Antonio da Silva");
  const [bio, setBio] = useState("Desenvolvedor Júnior Full Stack e Residente Tech no Porto Digital em Recife. Apaixonado por criar soluções escaláveis, documentação clara e arquiteturas bem estruturadas para a web.");
  const [precoHora, setPrecoHora] = useState<number>(85.00);
  const [githubUrl, setGithubUrl] = useState("https://github.com/leonardo");
  const [linkedinUrl, setLinkedinUrl] = useState("https://linkedin.com/in/leonardo");
  
  // Controle simples de especialidades (Array de strings como no seu Drizzle Schema)
  const [especialidades, setEspecialidades] = useState<string[]>(["JavaScript", "React", "Node.js", "Full Stack"]);
  const [novaEspecialidade, setNovaEspecialidade] = useState("");

  const handleAddEspecialidade = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && novaEspecialidade.trim() !== '') {
      e.preventDefault();
      if (!especialidades.includes(novaEspecialidade.trim())) {
        setEspecialidades([...especialidades, novaEspecialidade.trim()]);
      }
      setNovaEspecialidade("");
    }
  };

  const handleRemoveEspecialidade = (esp: string) => {
    setEspecialidades(especialidades.filter(e => e !== esp));
  };

  const handleSalvarPerfil = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simula o UPDATE nas tabelas 'usuarios' e 'perfis_mentores'
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert("Perfil atualizado com sucesso! Sua vitrine já está com os novos dados.");
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
          <Link href="/dashboard/mentor" className="flex items-center gap-3 rounded-xl text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200 px-4 py-3.5 text-sm font-medium transition-all group">
            <LayoutDashboard size={20} className="group-hover:text-blue-500 transition-colors" />
            Visão Geral
          </Link>
          <Link href="/dashboard/mentor/agenda" className="flex items-center gap-3 rounded-xl text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200 px-4 py-3.5 text-sm font-medium transition-all group">
            <CalendarDays size={20} className="group-hover:text-blue-500 transition-colors" />
            Minha Agenda
          </Link>
          <Link href="/dashboard/mentor/relatorios" className="flex items-center justify-between rounded-xl text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200 px-4 py-3.5 text-sm font-medium transition-all group">
            <div className="flex items-center gap-3">
              <FileText size={20} className="group-hover:text-blue-500 transition-colors" />
              Relatórios Pendentes
            </div>
            <span className="bg-red-500/10 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-500/20">
              2
            </span>
          </Link>
          <Link href="/dashboard/mentor/perfil" className="flex items-center gap-3 rounded-xl bg-blue-600/10 text-blue-500 px-4 py-3.5 text-sm font-semibold border border-blue-500/20">
            <User size={20} />
            Meu Perfil
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
            <h1 className="text-2xl font-bold tracking-tight">Configurações de Perfil</h1>
            <p className="text-zinc-500 text-sm mt-0.5">Gerencie suas informações públicas e sua vitrine de mentoria.</p>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-zinc-400 hover:text-white transition-colors">
              <Bell size={22} />
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

        <div className="p-10 max-w-4xl mx-auto w-full">
          <form onSubmit={handleSalvarPerfil} className="space-y-8">
            
            {/* Secção 1: Informações Básicas e Avatar */}
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0a0a0a] rounded-3xl border border-zinc-800/50 p-8 shadow-2xl">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
                <User size={20} className="text-blue-500" />
                Informações Públicas
              </h2>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative group cursor-pointer">
                    <img 
                      src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=150&h=150&q=80" 
                      alt="Avatar" 
                      className="w-32 h-32 rounded-full object-cover border-4 border-zinc-800 group-hover:border-blue-500/50 transition-colors"
                    />
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={24} className="text-white" />
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Alterar Foto</span>
                </div>

                <div className="flex-1 space-y-5 w-full">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-300">Nome de Exibição</label>
                    <input 
                      type="text" required value={nome} onChange={(e) => setNome(e.target.value)}
                      className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-300 flex justify-between">
                      Sua Biografia <span className="text-zinc-600 font-normal">{bio.length}/300</span>
                    </label>
                    <textarea 
                      required rows={4} maxLength={300} value={bio} onChange={(e) => setBio(e.target.value)}
                      placeholder="Conte um pouco sobre sua trajetória e o que você pode ensinar..."
                      className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Secção 2: Profissional e Preços */}
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#0a0a0a] rounded-3xl border border-zinc-800/50 p-8 shadow-2xl space-y-6">
              <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
                <Briefcase size={20} className="text-blue-500" />
                Carreira & Mentoria
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                    <DollarSign size={16} className="text-emerald-500" />
                    Valor da Mentoria (Hora)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">R$</span>
                    <input 
                      type="number" min="0" step="0.01" required value={precoHora} onChange={(e) => setPrecoHora(Number(e.target.value))}
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 pl-12 pr-4 py-3.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-zinc-300">Tags de Especialidade (Pressione Enter)</label>
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-2 flex flex-wrap gap-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-colors">
                    {especialidades.map((esp, idx) => (
                      <span key={idx} className="flex items-center gap-1 bg-blue-600/10 text-blue-400 px-3 py-1.5 rounded-lg text-sm font-semibold border border-blue-500/20">
                        {esp}
                        <button type="button" onClick={() => handleRemoveEspecialidade(esp)} className="hover:text-white ml-1">&times;</button>
                      </span>
                    ))}
                    <input 
                      type="text" value={novaEspecialidade} onChange={(e) => setNovaEspecialidade(e.target.value)} onKeyDown={handleAddEspecialidade}
                      placeholder="Ex: PostgreSQL..."
                      className="bg-transparent border-none outline-none text-sm text-white flex-1 min-w-[120px] px-2 py-1.5"
                    />
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Secção 3: Links Externos */}
            <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-[#0a0a0a] rounded-3xl border border-zinc-800/50 p-8 shadow-2xl space-y-6">
              <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
                Links Profissionais
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                    <IconBrandGithub size={16} /> URL do GitHub
                  </label>
                  <input 
                    type="url" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/seu-user"
                    className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                    <IconBrandLinkedin size={16} className="text-blue-500" /> URL do LinkedIn
                  </label>
                  <input 
                    type="url" required value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/seu-perfil"
                    className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3.5 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
              </div>
            </motion.section>

            {/* Ações Inferiores */}
            <div className="flex justify-end pt-4">
              <button 
                type="submit" disabled={isLoading}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-600/20 disabled:opacity-50"
              >
                <Save size={18} />
                {isLoading ? "A guardar alterações..." : "Guardar Perfil"}
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}