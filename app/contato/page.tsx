import Link from "next/link";

export default function ContatoPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] text-zinc-900 dark:text-zinc-50 py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-blue-600 dark:text-blue-500 hover:underline mb-8 inline-block font-medium">
          &larr; Voltar para a Home
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-4">Fale Conosco</h1>
            <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-lg">
              Tem alguma dúvida, sugestão ou encontrou algum problema? Envie uma mensagem e nossa equipe responderá o mais rápido possível.
            </p>
            
            <div className="flex flex-col gap-4 text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-3">
                <span className="text-xl">📧</span>
                <span>suporte@mentoratech.com</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">📍</span>
                <span>Recife, PE - Brasil</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-2xl shadow-sm">
            <form className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="nome" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Nome</label>
                <input type="text" id="nome" className="rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="Seu nome completo" />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">E-mail</label>
                <input type="email" id="email" className="rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" placeholder="seu@email.com" />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="mensagem" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Mensagem</label>
                <textarea id="mensagem" rows={4} className="rounded-lg border border-zinc-300 dark:border-zinc-800 bg-transparent px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none" placeholder="Como podemos ajudar?"></textarea>
              </div>

              <button type="button" className="mt-2 rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#0a0a0a]">
                Enviar Mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}