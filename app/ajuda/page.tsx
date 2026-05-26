import Link from "next/link";

export default function AjudaPage() {
  const faqs = [
    {
      pergunta: "Como funciona a mentoria?",
      resposta: "Você escolhe um mentor na nossa plataforma, agenda um horário disponível na agenda dele e realiza o pagamento. No dia e hora marcados, vocês se encontram via chamada de vídeo."
    },
    {
      pergunta: "Posso cancelar ou reagendar uma sessão?",
      resposta: "Sim. Você pode reagendar ou cancelar com até 24 horas de antecedência sem nenhum custo adicional."
    },
    {
      pergunta: "Como me torno um mentor?",
      resposta: "Basta criar uma conta, preencher seu perfil com suas experiências, definir seu valor por hora e aguardar a aprovação da nossa equipe."
    }
  ];

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-50 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-blue-600 dark:text-blue-500 hover:underline mb-8 inline-block font-medium">
          &larr; Voltar para a Home
        </Link>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Central de Ajuda</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-12 text-lg">Tire suas dúvidas sobre o funcionamento da Mentora Tech.</p>

        <div className="flex flex-col gap-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold mb-3">{faq.pergunta}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{faq.resposta}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-8 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl text-center">
          <h3 className="font-bold text-lg mb-2">Ainda precisa de ajuda?</h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">Nossa equipe de suporte está pronta para ajudar você.</p>
          <Link href="/contato" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors">
            Falar com o Suporte
          </Link>
        </div>
      </div>
    </main>
  );
}