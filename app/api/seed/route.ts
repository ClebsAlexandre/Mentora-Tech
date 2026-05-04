import { NextResponse } from 'next/server';
import { db } from '@/db';
import { usuarios, perfisMentores } from '@/db/schema';

export async function GET() {
  try {
    // Inserir 5 usuários simulados
    const novosUsuarios = await db.insert(usuarios).values([
      { nome: 'Ana Silva', email: 'ana@example.com', tipoPerfil: 'mentor', avatarUrl: 'https://i.pravatar.cc/150?u=ana' },
      { nome: 'Carlos Souza', email: 'carlos@example.com', tipoPerfil: 'mentor', avatarUrl: 'https://i.pravatar.cc/150?u=carlos' },
      { nome: 'Beatriz Lima', email: 'beatriz@example.com', tipoPerfil: 'mentor', avatarUrl: 'https://i.pravatar.cc/150?u=beatriz' },
      { nome: 'Daniel Costa', email: 'daniel@example.com', tipoPerfil: 'mentor', avatarUrl: 'https://i.pravatar.cc/150?u=daniel' },
      { nome: 'Eduarda Mendes', email: 'eduarda@example.com', tipoPerfil: 'mentor', avatarUrl: 'https://i.pravatar.cc/150?u=eduarda' },
    ]).returning();

    // Inserir perfis de mentores para os usuários criados
    await db.insert(perfisMentores).values([
      { usuarioId: novosUsuarios[0].id, bio: 'Especialista em React e Next.js ajudando devs iniciantes.', precoHora: '150.00', especialidades: ['Front-end', 'React', 'Next.js'] },
      { usuarioId: novosUsuarios[1].id, bio: 'Engenheiro de Software Senior com foco em Node e Cloud AWS.', precoHora: '200.00', especialidades: ['Back-end', 'Node.js', 'AWS'] },
      { usuarioId: novosUsuarios[2].id, bio: 'UX/UI Designer ajudando devs a criarem interfaces acessíveis.', precoHora: '120.00', especialidades: ['UX/UI', 'Figma', 'CSS'] },
      { usuarioId: novosUsuarios[3].id, bio: 'Tech Lead e arquiteto de soluções escaláveis e microsserviços.', precoHora: '250.00', especialidades: ['Arquitetura', 'System Design'] },
      { usuarioId: novosUsuarios[4].id, bio: 'Desenvolvedora Mobile com foco em React Native e Flutter.', precoHora: '180.00', especialidades: ['Mobile', 'React Native', 'Flutter'] },
    ]);

    return NextResponse.json({ message: 'Seed executado com sucesso! Dados inseridos.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao executar o seed' }, { status: 500 });
  }
}
