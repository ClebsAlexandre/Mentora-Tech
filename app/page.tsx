import Link from "next/link";
import { db } from "@/db";
import { usuarios, perfisMentores } from "@/db/schema";
import { eq } from "drizzle-orm";

// Força o Next.js a sempre renderizar a página dinamicamente para mostrar novos cadastros instantaneamente
export const dynamic = "force-dynamic";

export default async function Home() {
  // Buscar mentores fazendo JOIN entre as tabelas usuarios e perfis_mentores
  const mentores = await db
    .select({
      id: usuarios.id,
      nome: usuarios.nome,
      avatarUrl: usuarios.avatarUrl,
      bio: perfisMentores.bio,
      especialidades: perfisMentores.especialidades,
      precoHora: perfisMentores.precoHora,
    })
    .from(usuarios)
    .innerJoin(perfisMentores, eq(usuarios.id, perfisMentores.usuarioId))
    .where(eq(usuarios.tipoPerfil, "mentor"));

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] font-sans text-zinc-900 dark:text-zinc-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-[#0a0a0a]/70 border-b border-zinc-200 dark:border-zinc-800/50">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl w-full mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-blue-600/20">
              M
            </div>
            <span className="text-xl font-bold tracking-tight">
              Mentora Tech
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link
              href="#mentores"
              className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Mentores
            </Link>
            <Link
              href="#como-funciona"
              className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Como Funciona
            </Link>
            <Link
              href="#beneficios"
              className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Benefícios
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hidden sm:block"
            >
              Entrar
            </Link>
            <Link
              href="/cadastro"
              className="text-sm font-medium bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30"
            >
              Começar
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center w-full">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 w-full max-w-7xl mx-auto mb-32">
          {/* Efeito de brilho de fundo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

          <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold text-blue-700 bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 mb-8 ring-1 ring-inset ring-blue-600/20 transition-all hover:ring-blue-600/40 cursor-default">
            <span className="mr-2">🚀</span> O futuro da sua carreira tech
            começa aqui
          </div>

          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500">
            Evolua sua carreira com quem{" "}
            <span className="text-blue-600 dark:text-blue-500">
              já chegou lá
            </span>
          </h1>

          <p className="max-w-2xl text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed">
            Conecte-se com engenheiros seniores, tech leads e especialistas das
            maiores empresas de tecnologia para acelerar o seu desenvolvimento
            profissional.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="#mentores"
              className="flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5"
            >
              Encontrar um Mentor
            </Link>
            <Link
              href="/cadastro"
              className="flex items-center justify-center px-8 py-4 text-base font-semibold text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-full transition-all"
            >
              Quero ser Mentor
            </Link>
          </div>
        </section>

        {/* Como Funciona Section */}
        <section
          id="como-funciona"
          className="w-full bg-zinc-100 dark:bg-zinc-900/50 py-24 border-y border-zinc-200 dark:border-zinc-800/50"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Como Funciona?
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Em apenas três passos você estará conectado com profissionais
                que podem transformar a sua jornada no desenvolvimento de
                software.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {[
                {
                  step: "1",
                  title: "Escolha seu Mentor",
                  desc: "Navegue pela nossa vitrine e encontre especialistas que dominam as tecnologias e os desafios que você quer superar.",
                },
                {
                  step: "2",
                  title: "Agende uma Sessão",
                  desc: "Selecione um horário na agenda do mentor que se encaixe perfeitamente na sua rotina.",
                },
                {
                  step: "3",
                  title: "Evolua na Prática",
                  desc: "Tenha chamadas de vídeo focadas, receba feedback real e trace um plano de ação para a sua carreira.",
                },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-500 flex items-center justify-center text-2xl font-bold mb-6 ring-1 ring-blue-600/20">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefícios Section */}
        <section
          id="beneficios"
          className="w-full py-24 max-w-7xl mx-auto px-6"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              O que você vai aprender
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Uma mentoria bem direcionada economiza meses de estudo solitário.
              Focamos nos pilares reais que o mercado exige.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "💻",
                title: "Code Review",
                desc: "Tenha seu código JavaScript, React ou Node.js revisado por olhos experientes.",
              },
              {
                icon: "🎯",
                title: "Entrevistas",
                desc: "Simule entrevistas técnicas para vagas de Júnior ou Estágio e receba feedback imediato.",
              },
              {
                icon: "🏗️",
                title: "Arquitetura",
                desc: "Aprenda a estruturar bancos de dados em PostgreSQL e escalar aplicações com AWS e Docker.",
              },
              {
                icon: "🚀",
                title: "Plano de Carreira",
                desc: "Descubra o próximo passo certo, seja na sua residência atual ou em novas vagas no mercado.",
              },
            ].map((ben, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 transition-colors text-left"
              >
                <div className="text-3xl mb-4">{ben.icon}</div>
                <h3 className="font-bold text-lg mb-2">{ben.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {ben.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Vitrine de Mentores Dinâmica */}
        <section
          id="mentores"
          className="w-full bg-zinc-100 dark:bg-zinc-900/30 py-24 border-t border-zinc-200 dark:border-zinc-800/50"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Nossos Mentores
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Escolha o especialista perfeito para guiar o seu próximo passo
                na carreira.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mentores.map((mentor) => (
                <div
                  key={mentor.id}
                  className="flex flex-col bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 text-left group"
                >
                  <div className="p-6 flex flex-col items-center text-center gap-4 flex-1">
                    {mentor.avatarUrl && (
                      <img
                        src={mentor.avatarUrl}
                        alt={`Foto de ${mentor.nome}`}
                        className="w-24 h-24 rounded-full border-4 border-zinc-50 dark:border-zinc-800 shadow-sm object-cover group-hover:border-blue-500/30 transition-colors"
                      />
                    )}
                    <div>
                      <h3 className="font-bold text-xl">{mentor.nome}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mt-1">
                        {mentor.precoHora
                          ? `R$ ${mentor.precoHora} / hora`
                          : "Valor a combinar"}
                      </p>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3">
                      {mentor.bio}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center mt-auto pt-4">
                      {mentor.especialidades?.map((esp, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-xs rounded-full font-medium text-zinc-700 dark:text-zinc-300"
                        >
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
              <div className="text-center bg-white dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl py-12">
                <p className="text-zinc-500">
                  Nenhum mentor encontrado. Rode a rota de seed ou cadastre um
                  novo!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section (O toque final de SaaS) */}
        <section className="w-full bg-blue-600 dark:bg-blue-600 py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Pronto para acelerar sua carreira?
            </h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Junte-se a desenvolvedores que já estão evoluindo com a ajuda dos
              nossos mentores. O próximo passo da sua jornada tech começa aqui.
            </p>
            <Link
              href="/cadastro"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-blue-600 bg-white rounded-full transition-all shadow-lg hover:shadow-2xl hover:-translate-y-1"
            >
              Criar minha conta gratuita
            </Link>
          </div>
        </section>
      </main>

      {/* Footer Profissional */}
      <footer className="w-full border-t border-zinc-200 dark:border-zinc-800/50 bg-white dark:bg-[#0a0a0a] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Coluna 1: Marca e Sobre */}
            <div className="col-span-1 md:col-span-1 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-blue-600/20">
                  M
                </div>
                <span className="text-xl font-bold tracking-tight">
                  Mentora Tech
                </span>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm max-w-sm leading-relaxed mb-6">
                A ponte entre o seu talento e as melhores oportunidades do
                mercado de tecnologia. Conecte-se, aprenda e evolua com quem já
                chegou lá.
              </p>

              {/* Ícones de Redes Sociais */}
              <div className="flex items-center gap-4 text-zinc-400">
                <a
                  href="#"
                  className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                  aria-label="GitHub"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                  aria-label="Twitter"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Coluna 2: Plataforma */}
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                Plataforma
              </h3>
              <ul className="flex flex-col gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  <Link
                    href="#mentores"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Encontrar Mentores
                  </Link>
                </li>
                <li>
                  <Link
                    href="#como-funciona"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Como Funciona
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cadastro"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Quero ser Mentor
                  </Link>
                </li>
                <li>
                  <Link
                    href="#beneficios"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Benefícios
                  </Link>
                </li>
              </ul>
            </div>

            {/* Coluna 3: Suporte & Legal */}
            <div>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                Suporte
              </h3>
              <ul className="flex flex-col gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <li>
                  <Link
                    href="/ajuda"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Central de Ajuda
                  </Link>
                </li>
                <li>
                  <Link
                    href="/termos"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacidade"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contato"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Linha Inferior */}
          <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              © {new Date().getFullYear()} Mentora Tech. Todos os direitos
              reservados.
            </p>
            <div className="text-sm text-zinc-500 dark:text-zinc-500 flex items-center gap-1">
              Feito com <span className="text-blue-500">♥</span> para
              impulsionar a sua carreira
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}