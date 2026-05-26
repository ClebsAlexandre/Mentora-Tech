import Link from "next/link";

export default function TermosPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-50 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-blue-600 dark:text-blue-500 hover:underline mb-8 inline-block font-medium">
          &larr; Voltar para a Home
        </Link>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Termos de Uso</h1>
        <p className="text-zinc-500 mb-12">Última atualização: 26 de Maio de 2026</p>

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Aceitação dos Termos</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              Ao acessar e usar a plataforma Mentora Tech, você concorda em cumprir e ficar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não deverá usar nossos serviços.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Responsabilidades do Usuário</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              Os usuários comprometem-se a fornecer informações verdadeiras durante o cadastro e a manter um comportamento respeitoso e profissional durante as sessões de mentoria. É estritamente proibido o compartilhamento de conteúdo ofensivo, ilegal ou que viole direitos autorais.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Pagamentos e Reembolsos</h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              Os pagamentos são processados de forma segura. O cancelamento de mentorias com direito a reembolso integral deve ser feito com no mínimo 24 horas de antecedência do horário agendado.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}