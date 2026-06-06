"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

// Tipagens
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

// Variantes de Animação (Framer Motion)
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  const [mentores, setMentores] = useState<MentorAPI[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Fetch de dados da API
  useEffect(() => {
    const fetchMentores = async () => {
      try {
        const res = await fetch("http://localhost:3333/api/mentores");
        if (res.ok) {
          const dados = await res.json();
          setMentores(dados);
        }
      } catch (error) {
        console.error("Erro ao buscar mentores:", error);
      }
    };
    fetchMentores();
  }, []);

  // Bloquear scroll quando o menu mobile está aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-[#050505] font-sans text-zinc-900 dark:text-zinc-50 overflow-hidden">
      
      {/* Header Responsivo */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/80 dark:bg-[#050505]/80 border-b border-zinc-200 dark:border-zinc-800/50 transition-all">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl w-full mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group z-50">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:scale-105 transition-transform">
              M
            </div>
            <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400">
              Mentora Tech
            </span>
          </Link>

          {/* Nav Desktop */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="#mentores" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Mentores
            </Link>
            <Link href="#como-funciona" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Como Funciona
            </Link>
            <Link href="#beneficios" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Benefícios
            </Link>
          </nav>

          {/* Botões Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Entrar
            </Link>
            <Link href="/cadastro" className="text-sm font-bold bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-0.5">
              Começar
            </Link>
          </div>

          {/* Botão Hamburger Mobile */}
          <button 
            className="md:hidden p-2 text-zinc-600 dark:text-zinc-300 z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Mobile Fullscreen */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 w-full h-screen bg-white dark:bg-[#050505] flex flex-col items-center justify-center gap-8 md:hidden px-6"
            >
              <Link href="#mentores" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Mentores
              </Link>
              <Link href="#como-funciona" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Como Funciona
              </Link>
              <Link href="#beneficios" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold text-zinc-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Benefícios
              </Link>
              <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800/50 my-4" />
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-4 text-lg font-bold text-zinc-900 dark:text-white border-2 border-zinc-200 dark:border-zinc-800 rounded-full">
                Entrar na Conta
              </Link>
              <Link href="/cadastro" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center py-4 text-lg font-bold text-white bg-blue-600 rounded-full shadow-lg shadow-blue-600/20">
                Criar Conta Gratuita
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1 flex flex-col items-center w-full pt-20">
        
        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative flex flex-col items-center justify-center text-center px-6 mt-16 md:mt-32 w-full max-w-7xl mx-auto mb-20 md:mb-32"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/20 dark:bg-blue-500/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none -z-10"></div>

          <motion.div variants={fadeUp} className="inline-flex items-center rounded-full px-4 py-1.5 text-xs md:text-sm font-bold text-blue-700 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 mb-8 border border-blue-600/20">
            <span className="mr-2">🚀</span> O futuro da sua carreira tech começa aqui
          </motion.div>

          <motion.h1 variants={fadeUp} className="max-w-4xl text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500">
            Evolua sua carreira com quem <span className="text-blue-600 dark:text-blue-500">já chegou lá</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="max-w-2xl text-base md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed font-medium">
            Conecte-se com engenheiros seniores, tech leads e especialistas das maiores empresas de tecnologia para acelerar o seu desenvolvimento.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
            <Link href="#mentores" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-lg shadow-blue-600/25 hover:-translate-y-1">
              Encontrar um Mentor
            </Link>
            <Link href="/cadastro" className="flex items-center justify-center w-full sm:w-auto px-8 py-4 text-base font-bold text-zinc-900 dark:text-white bg-transparent border-2 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-full transition-all">
              Quero ser Mentor
            </Link>
          </motion.div>
        </motion.section>

        {/* Como Funciona Section */}
        <section id="como-funciona" className="w-full bg-white dark:bg-[#0a0a0a] py-20 md:py-32 border-y border-zinc-200 dark:border-zinc-800/50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="text-center mb-16 md:mb-20"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-zinc-900 dark:text-white">Como Funciona?</h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-base md:text-lg">
                Em apenas três passos você estará conectado com profissionais que podem transformar a sua jornada.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center"
            >
              {[
                { step: "1", title: "Escolha seu Mentor", desc: "Navegue pela nossa vitrine e encontre especialistas que dominam as tecnologias e os desafios que você quer superar." },
                { step: "2", title: "Agende uma Sessão", desc: "Selecione um horário na agenda do mentor que se encaixe perfeitamente na sua rotina." },
                { step: "3", title: "Evolua na Prática", desc: "Tenha chamadas de vídeo focadas, receba feedback real e trace um plano de ação para a sua carreira." },
              ].map((item, index) => (
                <motion.div variants={fadeUp} key={index} className="flex flex-col items-center bg-zinc-50 dark:bg-[#050505] p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800/50">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-blue-600/10 text-blue-600 dark:text-blue-500 flex items-center justify-center text-2xl md:text-3xl font-black mb-6 md:mb-8 border border-blue-600/20">
                    {item.step}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-zinc-900 dark:text-white">{item.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium text-sm md:text-base">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Vitrine de Mentores Dinâmica */}
        <section id="mentores" className="w-full bg-zinc-50 dark:bg-[#0c0c0c] py-20 md:py-32 border-t border-zinc-200 dark:border-zinc-800/50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="text-center mb-16 md:mb-20"
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-zinc-900 dark:text-white">Nossos Mentores</h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg">
                Escolha o especialista perfeito para guiar o seu próximo passo na carreira.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {mentores.map((mentor) => {
                const especialidades = mentor.perfilMentor?.especialidades || [];
                const preco = mentor.perfilMentor?.precoHora ? Number(mentor.perfilMentor.precoHora).toFixed(2) : null;
                const bio = mentor.perfilMentor?.bio || "Mentoria especializada em tecnologia e desenvolvimento de carreira.";
                const avatarFallback = mentor.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.nome)}&background=2563eb&color=fff`;

                return (
                  <motion.div variants={fadeUp} key={mentor.id} className="flex flex-col bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800/80 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all hover:-translate-y-1 md:hover:-translate-y-2 text-left group shadow-sm hover:shadow-xl">
                    <div className="p-6 md:p-8 flex flex-col items-center text-center gap-4 md:gap-5 flex-1">
                      <img
                        src={avatarFallback}
                        alt={`Foto de ${mentor.nome}`}
                        className="w-24 h-24 md:w-28 md:h-28 rounded-full border-4 border-zinc-50 dark:border-[#050505] shadow-lg object-cover group-hover:border-blue-500/30 transition-colors"
                      />
                      <div>
                        <h3 className="font-bold text-xl md:text-2xl text-zinc-900 dark:text-white">{mentor.nome}</h3>
                        <p className="text-blue-600 dark:text-blue-400 font-bold text-xs md:text-sm mt-2 inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20">
                          {preco ? `R$ ${preco} / hora` : "Valor a combinar"}
                        </p>
                      </div>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3 font-medium leading-relaxed">
                        {bio}
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center mt-auto pt-4 md:pt-6">
                        {especialidades.slice(0, 3).map((esp, i) => (
                          <span key={i} className="px-2 md:px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-[10px] md:text-xs rounded-lg font-bold text-zinc-700 dark:text-zinc-300">
                            {esp}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-4 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50 dark:bg-[#050505]">
                      <Link href="/cadastro" className="w-full flex items-center justify-center py-3 md:py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-colors text-sm md:text-base">
                        Agendar Sessão
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {mentores.length === 0 && (
              <div className="text-center bg-white dark:bg-[#0a0a0a] border-2 border-dashed border-zinc-300 dark:border-zinc-800 rounded-3xl py-16 md:py-20 mx-4 md:mx-0">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white mb-2">Nenhum mentor disponível</h3>
                <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto text-sm md:text-base px-4">
                  Os nossos especialistas estão com a agenda cheia. Faça o seu registo para ser avisado!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full bg-blue-600 py-20 md:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="max-w-4xl mx-auto px-6 text-center relative z-10"
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 md:mb-8 tracking-tight leading-tight">
              Pronto para acelerar a sua carreira?
            </h2>
            <p className="text-blue-100 text-base md:text-xl mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              Junte-se a desenvolvedores que já estão a evoluir com a ajuda dos nossos mentores.
            </p>
            <Link href="/cadastro" className="inline-flex items-center justify-center w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 text-base md:text-lg font-black text-blue-600 bg-white rounded-full transition-all shadow-2xl hover:scale-105 hover:shadow-white/20 active:scale-95">
              Criar a minha conta gratuita
            </Link>
          </motion.div>
        </section>
      </main>

      {/* Footer Profissional */}
      <footer className="w-full border-t border-zinc-200 dark:border-zinc-800/50 bg-white dark:bg-[#050505] pt-16 md:pt-20 pb-8 md:pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-12 mb-12 md:mb-16 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start max-w-sm">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-blue-600/20">M</div>
                <span className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">Mentora Tech</span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed font-medium">
                A ponte entre o seu talento e as melhores oportunidades do mercado de tecnologia.
              </p>
            </div>
            
            <div className="flex gap-4 text-zinc-400">
               {/* Ícones Genéricos de Redes Sociais */}
               <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">In</div>
               <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">Gh</div>
               <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">Tw</div>
            </div>
          </div>
          <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-xs md:text-sm font-medium text-zinc-500">© {new Date().getFullYear()} Mentora Tech. Todos os direitos reservados.</p>
            <div className="text-xs md:text-sm font-medium text-zinc-500 flex items-center gap-1">
              Feito com <span className="text-blue-500">♥</span> para impulsionar a sua carreira
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}