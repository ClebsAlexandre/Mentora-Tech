import Link from "next/link";
import { db } from '@/db';
import { usuarios, perfisMentores } from '@/db/schema';
import { eq } from 'drizzle-orm';

// Força o Next.js a sempre renderizar a página dinamicamente para mostrar novos cadastros instantaneamente
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Buscar mentores fazendo JOIN entre as tabelas usuarios e perfis_mentores
  const mentores = await db.select({
    id: usuarios.id,
    nome: usuarios.nome,
    avatarUrl: usuarios.avatarUrl,
    bio: perfisMentores.bio,
    especialidades: perfisMentores.especialidades,
    precoHora: perfisMentores.precoHora,
  })
  .from(usuarios)
  .innerJoin(perfisMentores, eq(usuarios.id, perfisMentores.usuarioId))
  .where(eq(usuarios.tipoPerfil, 'mentor'));

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
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 w-full max-w-7xl mx-auto">
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
          <Link href="#mentores" className="flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5">
            Encontrar um Mentor
          </Link>
          <Link href="/cadastro" className="flex items-center justify-center px-8 py-4 text-base font-semibold text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-full transition-all">
            Quero ser Mentor
          </Link>
        </div>

        {/* Vitrine de Mentores Dinâmica */}
        <div id="mentores" className="mt-32 w-full pt-12 border-t border-zinc-200 dark:border-zinc-800/50">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Nossos Mentores</h2>
            <p className="text-zinc-600 dark:text-zinc-400">Escolha o especialista perfeito para guiar o seu próximo passo na carreira.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentores.map((mentor) => (
              <div key={mentor.id} className="flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow text-left">
                <div className="p-6 flex flex-col items-center text-center gap-4 flex-1">
                  {mentor.avatarUrl && (
                    <img src={mentor.avatarUrl} alt={`Foto de ${mentor.nome}`} className="w-24 h-24 rounded-full border-4 border-zinc-50 dark:border-zinc-800 shadow-sm object-cover" />
                  )}
                  <div>
                    <h3 className="font-bold text-xl">{mentor.nome}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mt-1">
                      {mentor.precoHora ? `R$ ${mentor.precoHora} / hora` : 'Valor a combinar'}
                    </p>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3">
                    {mentor.bio}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center mt-auto pt-4">
                    {mentor.especialidades?.map((esp, i) => (
                      <span key={i} className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-xs rounded-full font-medium text-zinc-700 dark:text-zinc-300">
                        {esp}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
                  <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors">
                    Agendar Mentoria
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {mentores.length === 0 && (
             <p className="text-center text-zinc-500 py-10">Nenhum mentor encontrado. Rode a rota de seed ou cadastre um novo!</p>
          )}
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
