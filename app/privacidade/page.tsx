import Link from "next/link";

export default function PrivacidadePage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-50 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-blue-600 dark:text-blue-500 hover:underline mb-8 inline-block font-medium">
          &larr; Voltar para a Home
        </Link>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Política de Privacidade</h1>
        <p className="text-zinc-500 mb-12">Nós levamos os seus dados a sério.</p>

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Coleta de Informações</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              Coletamos informações pessoais que você nos fornece voluntariamente ao se registrar na plataforma, expressar interesse em obter informações sobre nós ou nossos produtos e serviços, ou ao entrar em contato conosco. Isso inclui nome, endereço de e-mail e dados de perfil profissional.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Uso dos Dados</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              Utilizamos suas informações exclusivamente para facilitar a conexão entre mentores e mentorados, processar pagamentos e melhorar a sua experiência na plataforma. Não vendemos seus dados para terceiros sob nenhuma circunstância.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Proteção e Segurança</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              Implementamos medidas técnicas e organizacionais de segurança adequadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}