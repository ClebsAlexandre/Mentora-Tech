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
  Plus,
  Trash2,
  Save,
  Info,
  User,
} from "lucide-react";

// Tipagem para os horários
type Horario = { id: string; inicio: string; fim: string };
type Agenda = { [dia: string]: Horario[] };

export default function MentorAgendaPage() {
  const [isLoading, setIsLoading] = useState(false);

  // Estado inicial simulando horários já cadastrados
  const [agenda, setAgenda] = useState<Agenda>({
    "Segunda-feira": [{ id: "1", inicio: "14:00", fim: "18:00" }],
    "Terça-feira": [],
    "Quarta-feira": [
      { id: "2", inicio: "09:00", fim: "12:00" },
      { id: "3", inicio: "14:00", fim: "16:00" },
    ],
    "Quinta-feira": [],
    "Sexta-feira": [{ id: "4", inicio: "14:00", fim: "18:00" }],
    Sábado: [],
    Domingo: [],
  });

  const adicionarHorario = (dia: string) => {
    const novoHorario = {
      id: Math.random().toString(),
      inicio: "09:00",
      fim: "10:00",
    };
    setAgenda({ ...agenda, [dia]: [...agenda[dia], novoHorario] });
  };

  const removerHorario = (dia: string, id: string) => {
    setAgenda({ ...agenda, [dia]: agenda[dia].filter((h) => h.id !== id) });
  };

  const atualizarHorario = (
    dia: string,
    id: string,
    campo: "inicio" | "fim",
    valor: string,
  ) => {
    setAgenda({
      ...agenda,
      [dia]: agenda[dia].map((h) =>
        h.id === id ? { ...h, [campo]: valor } : h,
      ),
    });
  };

  const salvarAgenda = async () => {
    setIsLoading(true);
    // Simula o salvamento no banco de dados
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert("Sua disponibilidade foi atualizada com sucesso!");
  };

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
          {/* Link Visão Geral (Inativo nesta tela) */}
          <Link
            href="/dashboard/mentor"
            className="flex items-center gap-3 rounded-xl text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200 px-4 py-3.5 text-sm font-medium transition-all group"
          >
            <LayoutDashboard
              size={20}
              className="group-hover:text-blue-500 transition-colors"
            />
            Visão Geral
          </Link>
          {/* Link Minha Agenda (ATIVO nesta tela) */}
          <Link
            href="/dashboard/mentor/agenda"
            className="flex items-center gap-3 rounded-xl bg-blue-600/10 text-blue-500 px-4 py-3.5 text-sm font-semibold border border-blue-500/20"
          >
            <CalendarDays size={20} />
            Minha Agenda
          </Link>
          {/* Link Relatórios Pendentes (Inativo nesta tela) */}
          <Link
            href="/dashboard/mentor/relatorios"
            className="flex items-center justify-between rounded-xl text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200 px-4 py-3.5 text-sm font-medium transition-all group"
          >
            <div className="flex items-center gap-3">
              <FileText
                size={20}
                className="group-hover:text-blue-500 transition-colors"
              />
              Relatórios Pendentes
            </div>
            <span className="bg-red-500/10 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-red-500/20">
              2
            </span>
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
          <Link
            href="/login"
            className="flex items-center gap-3 w-full rounded-xl text-zinc-500 hover:text-red-400 hover:bg-red-400/5 px-4 py-3 text-sm font-medium transition-all"
          >
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
            <h1 className="text-2xl font-bold tracking-tight">
              Disponibilidade
            </h1>
            <p className="text-zinc-500 text-sm mt-0.5">
              Defina os dias e horários que você estará livre para mentorias.
            </p>
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

        <div className="p-10 max-w-[1400px] mx-auto w-full space-y-8">
          {/* Banner de Aviso/Regras */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-blue-600/5 border border-blue-500/20 p-8 rounded-3xl gap-6">
            <div className="flex gap-4">
              <div className="hidden sm:flex mt-1">
                <Info size={24} className="text-blue-500" />
              </div>
              <div>
                <h2 className="font-bold text-blue-400 text-lg">
                  Regras de Agendamento
                </h2>
                <p className="text-zinc-400 text-sm mt-1 leading-relaxed max-w-2xl">
                  As sessões têm duração padrão de 1 hora. Bloqueamos
                  automaticamente a sua agenda assim que um aluno reserva e paga
                  por um horário. Você receberá um e-mail com o link da sala.
                </p>
              </div>
            </div>
            <button
              onClick={salvarAgenda}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-600/20 disabled:opacity-50 min-w-[200px]"
            >
              <Save size={18} />
              {isLoading ? "Salvando alterações..." : "Salvar Agenda"}
            </button>
          </div>

          {/* Grade Principal da Agenda */}
          <div className="bg-[#0a0a0a] rounded-3xl border border-zinc-800/50 overflow-hidden shadow-2xl divide-y divide-zinc-800/50">
            {Object.keys(agenda).map((dia) => (
              <div
                key={dia}
                className="p-8 flex flex-col md:flex-row md:items-start gap-8 hover:bg-white/[0.01] transition-colors"
              >
                {/* Coluna do Dia */}
                <div className="w-56 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-zinc-200">{dia}</h3>
                    {agenda[dia].length === 0 && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 bg-zinc-900 px-3 py-1.5 rounded-lg border border-zinc-800">
                        Indisponível
                      </span>
                    )}
                  </div>
                </div>

                {/* Coluna dos Horários (Inputs) */}
                <div className="flex-1 space-y-4">
                  <AnimatePresence>
                    {agenda[dia].map((horario) => (
                      <motion.div
                        key={horario.id}
                        initial={{ opacity: 0, height: 0, scale: 0.95 }}
                        animate={{ opacity: 1, height: "auto", scale: 1 }}
                        exit={{ opacity: 0, height: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-4 overflow-hidden"
                      >
                        <div className="flex items-center gap-3 bg-zinc-900/80 p-2 rounded-2xl border border-zinc-800/80 shadow-inner">
                          <input
                            type="time"
                            value={horario.inicio}
                            onChange={(e) =>
                              atualizarHorario(
                                dia,
                                horario.id,
                                "inicio",
                                e.target.value,
                              )
                            }
                            className="bg-transparent text-sm font-semibold text-zinc-200 outline-none px-3 py-1.5 focus:ring-2 ring-blue-500/20 rounded-lg transition-all [color-scheme:dark]"
                          />
                          <span className="text-zinc-600 font-medium text-sm">
                            até
                          </span>
                          <input
                            type="time"
                            value={horario.fim}
                            onChange={(e) =>
                              atualizarHorario(
                                dia,
                                horario.id,
                                "fim",
                                e.target.value,
                              )
                            }
                            className="bg-transparent text-sm font-semibold text-zinc-200 outline-none px-3 py-1.5 focus:ring-2 ring-blue-500/20 rounded-lg transition-all [color-scheme:dark]"
                          />
                        </div>
                        <button
                          onClick={() => removerHorario(dia, horario.id)}
                          className="p-3 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                          title="Remover intervalo"
                        >
                          <Trash2 size={18} />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <button
                    onClick={() => adicionarHorario(dia)}
                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-500 hover:text-blue-400 hover:bg-blue-500/10 px-4 py-2.5 rounded-xl transition-all mt-2"
                  >
                    <Plus size={18} />
                    Adicionar intervalo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
