"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  CalendarDays, 
  FileText, 
  LogOut, 
  Bell, 
  ChevronRight,
  ArrowLeft,
  Star,
  Award,
  CheckCircle2,
  User
} from "lucide-react";

// Tipagem para simular as sessões que precisam de relatório
type SessaoPendente = {
  id: string;
  alunoNome: string;
  vagaAlvo: string;
  data: string;
};

export default function MentorRelatoriosPage() {
  const [sessaoSelecionada, setSessaoSelecionada] = useState<SessaoPendente | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Estados do Formulário baseados estritamente no seu Schema
  const [notaTecnica, setNotaTecnica] = useState<number>(5);
  const [notaSoftSkills, setNotaSoftSkills] = useState<number>(5);
  const [pontosFortes, setPontosFortes] = useState("");
  const [pontosMelhoria, setPontosMelhoria] = useState("");
  const [vereditoSimulado, setVereditoSimulado] = useState("");

  // Dados simulados de sessões concluídas que aguardam relatório
  const [sessoesPendentes, setSessoesPendentes] = useState<SessaoPendente[]>(
    [
      { id: "ag-101", alunoNome: "Ana Silva", vagaAlvo: "Desenvolvedor Frontend - React", data: "25/05/2026" },
      { id: "ag-102", alunoNome: "Carlos Eduardo", vagaAlvo: "Full Stack (Node.js & Next.js)", data: "24/05/2026" }
    ]
  );

  const handleEnviarRelatorio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!vereditoSimulado) {
      alert("Por favor, selecione um veredito simulado.");
      return;
    }

    setIsLoading(true);
    // Simula o INSERT na tabela 'relatorio_entrevista' e UPDATE no status do agendamento
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    // Remove a sessão da lista de pendentes após o envio com sucesso
    setSessoesPendentes(sessoesPendentes.filter(s => s.id !== sessaoSelecionada?.id));
    alert("Relatório de entrevista enviado com sucesso para o aluno!");
    
    // Reseta o formulário e volta para a lista
    setSessaoSelecionada(null);
    setPontosFortes("");
    setPontosMelhoria("");
    setVereditoSimulado("");
  };

  return (
    <div className="flex min-h-screen bg-[#050505] text-zinc-100 font-sans">
      
      {/* Sidebar Lateral (Com 'Relatórios Pendentes' ativo) */}
      <aside className="w-72 border-r border-zinc-800/50 bg-[#0a0a0a] flex flex-col sticky top-0 h-screen hidden md:flex">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]">M</div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">Mentora Tech</span>
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
          <Link href="/dashboard/mentor/relatorios" className="flex items-center justify-between rounded-xl bg-blue-600/10 text-blue-500 px-4 py-3.5 text-sm font-semibold border border-blue-500/20">
            <div className="flex items-center gap-3">
              <FileText size={20} />
              Relatórios Pendentes
            </div>
            {sessoesPendentes.length > 0 && (
              <span className="bg-red-500/10 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-500/20">
                {sessoesPendentes.length}
              </span>
            )}
          </Link>
            <Link
            href="/dashboard/mentor/perfil"
            className="flex items-center gap-3 rounded-xl text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200 px-4 py-3.5 text-sm font-medium transition-all group"
          >
            <User
              size={20}
              className="group-hover:text-blue-500 transition-colors"
            />
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
            <h1 className="text-2xl font-bold tracking-tight">Avaliações Técnicas</h1>
            <p className="text-zinc-500 text-sm mt-0.5">Forneça feedbacks construtivos para guiar os seus mentorados.</p>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-zinc-400 hover:text-white transition-colors">
              <Bell size={22} />
            </button>
            <div className="flex items-center gap-3 p-1 pr-4 rounded-full bg-zinc-900/50 border border-zinc-800/50">
              <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=100&h=100&q=80" className="w-8 h-8 rounded-full object-cover border border-zinc-700" alt="Me" />
              <ChevronRight size={14} className="text-zinc-600" />
            </div>
          </div>
        </header>

        <div className="p-10 max-w-4xl mx-auto w-full">
          <AnimatePresence mode="wait">
            
            {/* VISTA 1: LISTA DE PENDENTES */}
            {!sessaoSelecionada ? (
              <motion.div key="lista" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                <div className="bg-zinc-900/20 border border-zinc-800 p-6 rounded-2xl">
                  <h2 className="text-lg font-bold">Aguardando Avaliação ({sessoesPendentes.length})</h2>
                  <p className="text-zinc-400 text-sm mt-1">Sessões simuladas concluídas que necessitam do relatório de feedback para libertar a nota do aluno.</p>
                </div>

                <div className="bg-[#0a0a0a] rounded-3xl border border-zinc-800/50 overflow-hidden shadow-2xl divide-y divide-zinc-800/50">
                  {sessoesPendentes.length > 0 ? (
                    sessoesPendentes.map((sessao) => (
                      <div key={sessao.id} className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4 hover:bg-white/[0.01] transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 font-bold">
                            {sessao.alunoNome.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-bold text-base text-zinc-100">{sessao.alunoNome}</h3>
                            <p className="text-zinc-500 text-sm">{sessao.vagaAlvo} • <span className="text-zinc-600 text-xs">{sessao.data}</span></p>
                          </div>
                        </div>
                        <button 
                          onClick={() => setSessaoSelecionada(sessao)}
                          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md hover:scale-[1.01]"
                        >
                          Preencher Relatório
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-12 text-center text-zinc-500 flex flex-col items-center">
                      <CheckCircle2 size={44} className="text-emerald-500/30 mb-4" />
                      <p className="text-lg font-medium text-zinc-300">Tudo em dia!</p>
                      <p className="text-sm mt-1">Nenhum relatório pendente no momento.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              
              <motion.div key="formulario" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                {/* VISTA 2: FORMULÁRIO DE SELECIONADO */}
                <button 
                  onClick={() => setSessaoSelecionada(null)}
                  className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors mb-4"
                >
                  <ArrowLeft size={16} /> Voltar para a lista
                </button>

                <div className="bg-[#0a0a0a] border border-zinc-800 p-6 rounded-2xl flex justify-between items-center">
                  <div>
                    <span className="text-xs uppercase tracking-widest font-bold text-blue-500">Formulário de Feedback</span>
                    <h2 className="text-xl font-bold mt-1">Candidato: {sessaoSelecionada.alunoNome}</h2>
                    <p className="text-zinc-500 text-sm mt-0.5">Vaga: {sessaoSelecionada.vagaAlvo}</p>
                  </div>
                </div>

                <form onSubmit={handleEnviarRelatorio} className="bg-[#0a0a0a] rounded-3xl border border-zinc-800/50 p-8 shadow-2xl space-y-6">
                  
                  {/* Slider de Notas */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 bg-zinc-900/20 p-6 rounded-2xl border border-zinc-800/50">
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2"><Award size={16} className="text-blue-500" /> Nota Técnica (Hard Skills)</label>
                        <span className="text-base font-bold text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-md border border-blue-500/20">{notaTecnica} / 10</span>
                      </div>
                      <input type="range" min="0" max="10" value={notaTecnica} onChange={(e) => setNotaTecnica(Number(e.target.value))} className="w-full accent-blue-600 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer" />
                    </div>

                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2"><Star size={16} className="text-yellow-500" /> Soft Skills (Comunicação)</label>
                        <span className="text-base font-bold text-yellow-500 bg-yellow-500/10 px-2.5 py-0.5 rounded-md border border-yellow-500/20">{notaSoftSkills} / 10</span>
                      </div>
                      <input type="range" min="0" max="10" value={notaSoftSkills} onChange={(e) => setNotaSoftSkills(Number(e.target.value))} className="w-full accent-yellow-500 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer" />
                    </div>
                  </div>

                  {/* Campos de Texto */}
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-300">Pontos Fortes do Candidato</label>
                    <textarea 
                      required rows={4} value={pontosFortes} onChange={(e) => setPontosFortes(e.target.value)}
                      placeholder="Quais as tecnologias ou competências que o aluno dominou bem durante o simulado?"
                      className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none leading-relaxed"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-zinc-300">Pontos de Melhoria (O que focar nos estudos)</label>
                    <textarea 
                      required rows={4} value={pontosMelhoria} onChange={(e) => setPontosMelhoria(e.target.value)}
                      placeholder="Onde o aluno falhou ou demonstrou insegurança? Indique caminhos concretos."
                      className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none leading-relaxed"
                    />
                  </div>

                  {/* Veredito da Entrevista Simulada */}
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium text-zinc-300">Veredito Simulado do Processo Seletivo</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { value: "contrataria", label: "Aprovado / Contrataria", corActive: "bg-emerald-600/10 border-emerald-500/40 text-emerald-400" },
                        { value: "talvez", label: "Talvez / Segunda Fase", corActive: "bg-yellow-600/10 border-yellow-500/40 text-yellow-400" },
                        { value: "nao_contrataria", label: "Reprovado no Momento", corActive: "bg-red-600/10 border-red-500/40 text-red-400" }
                      ].map((v) => (
                        <button
                          key={v.value} type="button" onClick={() => setVereditoSimulado(v.value)}
                          className={`p-4 rounded-xl border text-sm font-semibold transition-all text-center ${
                            vereditoSimulado === v.value 
                              ? v.corActive 
                              : "border-zinc-800 bg-zinc-900/20 text-zinc-400 hover:bg-zinc-900"
                          }`}
                        >
                          {v.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Botão de Submissão */}
                  <div className="pt-4 border-t border-zinc-800/50 flex justify-end">
                    <button
                      type="submit" disabled={isLoading}
                      className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all hover:scale-[1.01] active:scale-95 shadow-lg shadow-blue-600/20 disabled:opacity-50"
                    >
                      {isLoading ? "A submeter avaliação..." : "Enviar Avaliação do Candidato"}
                    </button>
                  </div>

                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}