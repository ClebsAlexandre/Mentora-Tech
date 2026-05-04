import { db } from '@/db';
import { usuarios, perfisMentores } from '@/db/schema';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function CadastroPage() {
  
  // Server Action que lida com o submit do formulário
  async function cadastrarMentor(formData: FormData) {
    'use server';
    
    const nome = formData.get('nome') as string;
    const email = formData.get('email') as string;
    const bio = formData.get('bio') as string;
    const precoHora = formData.get('precoHora') as string;
    const especialidadesStr = formData.get('especialidades') as string;
    
    const especialidades = especialidadesStr.split(',').map(s => s.trim()).filter(Boolean);
    
    // Inserção na tabela usuarios
    // Usando DiceBear (avataaars) para garantir rostos diferentes baseados no email
    const [novoUsuario] = await db.insert(usuarios).values({
      nome,
      email,
      tipoPerfil: 'mentor',
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}&backgroundColor=e2e8f0`,
    }).returning();
    
    // Inserção na tabela perfisMentores referenciando o usuario criado
    await db.insert(perfisMentores).values({
      usuarioId: novoUsuario.id,
      bio,
      especialidades,
      precoHora: precoHora || '0.00',
    });
    
    // Redireciona para a home para vermos o novo mentor no Grid
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4 font-sans py-12">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-xl">
        <div className="mb-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white shadow-md mx-auto mb-4">M</div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Seja um Mentor</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">Compartilhe seu conhecimento e defina seu valor.</p>
        </div>

        <form action={cadastrarMentor} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Nome Completo</label>
            <input required type="text" name="nome" placeholder="Ex: João Silva" className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">E-mail</label>
            <input required type="email" name="email" placeholder="joao@exemplo.com" className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Valor por Hora (R$)</label>
            <input required type="number" step="0.01" min="0" name="precoHora" placeholder="Ex: 100.00" className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Especialidades (separadas por vírgula)</label>
            <input required type="text" name="especialidades" placeholder="Ex: React, Node.js, AWS" className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Biografia Resumida</label>
            <textarea required name="bio" rows={3} placeholder="Conte um pouco sobre sua experiência..." className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"></textarea>
          </div>
          
          <button type="submit" className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all">
            Cadastrar Perfil
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}
