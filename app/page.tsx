import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-blue-600/20">M</div>
          <span className="text-xl font-bold tracking-tight">Mentora Tech</span>
        </div>
        <nav className="hidden sm:flex items-center gap-8 text-sm font-medium">
          <Link href="#mentores" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Mentores</Link>
          <Link href="#como-funciona" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Como Funciona</Link>
          <Link href="#beneficios" className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Benefícios</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hidden sm:block">Entrar</Link>
          <Link href="/cadastro" className="text-sm font-medium bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30">
            Começar
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24">
        <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold text-blue-700 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 mb-8 ring-1 ring-inset ring-blue-600/20 transition-all hover:ring-blue-600/40 cursor-default">
          <span className="mr-2">🚀</span> O futuro da sua carreira tech começa aqui
        </div>
        
        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500">
          Evolua sua carreira com quem <span className="text-blue-600 dark:text-blue-500">já chegou lá</span>
        </h1>
        
        <p className="max-w-2xl text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
          Conecte-se com engenheiros seniores, tech leads e especialistas das maiores empresas de tecnologia para acelerar o seu desenvolvimento profissional.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/mentores" className="flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5">
            Encontrar um Mentor
          </Link>
          <Link href="/ser-mentor" className="flex items-center justify-center px-8 py-4 text-base font-semibold text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-full transition-all">
            Quero ser Mentor
          </Link>
        </div>

        {/* Features Preview */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl w-full pt-12 border-t border-zinc-200 dark:border-zinc-800/50 text-left">
          <div className="flex flex-col gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2 transition-transform group-hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">Mentoria 1:1</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">Sessões personalizadas por vídeo focadas nos seus objetivos, carreira e desafios atuais do dia a dia.</p>
          </div>
          <div className="flex flex-col gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-2 transition-transform group-hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </div>
            <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">Code Review e Pair</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">Evolua sua técnica com dicas práticas, pair programming e revisões minuciosas de especialistas.</p>
          </div>
          <div className="flex flex-col gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-2 transition-transform group-hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
            </div>
            <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">Carreira e Soft Skills</h3>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">Preparação para entrevistas técnicas, negociação salarial e desenvolvimento de liderança.</p>
          </div>
        </div>
      </main>
      
      <footer className="mt-20 border-t border-zinc-200 dark:border-zinc-800/50 py-10 flex flex-col items-center justify-center gap-4 text-sm text-zinc-500 dark:text-zinc-500">
        <div className="flex items-center gap-2">
           <div className="w-6 h-6 rounded bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-zinc-500 dark:text-zinc-400 text-xs">M</div>
           <span className="font-medium">Mentora Tech</span>
        </div>
        <p>© 2026 Mentora Tech. Construído para impulsionar carreiras.</p>
      </footer>
    </div>
  );
}
