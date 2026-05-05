import { pgTable, uuid, text, timestamp, decimal, integer, unique } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// 1. Usuários (Tabela Base)
export const usuarios = pgTable('usuarios', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  nome: text('nome').notNull(),
  email: text('email').notNull().unique(),
  tipoPerfil: text('tipo_perfil').notNull(), // 'mentor' ou 'aluno'
  avatarUrl: text('avatar_url'),
  criadoEm: timestamp('criado_em', { withTimezone: true }).defaultNow().notNull(),
});

// 2. Perfis de Mentores
export const perfisMentores = pgTable('perfis_mentores', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  usuarioId: uuid('usuario_id').references(() => usuarios.id, { onDelete: 'cascade' }).notNull(),
  bio: text('bio'),
  precoHora: decimal('preco_hora', { precision: 10, scale: 2 }),
  especialidades: text('especialidades').array(),
  githubUrl: text('github_url'),
  linkedinUrl: text('linkedin_url'),
});

// 3. Disponibilidades (Grade de horários do mentor)
export const disponibilidades = pgTable('disponibilidades', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  mentorId: uuid('mentor_id').references(() => usuarios.id, { onDelete: 'cascade' }).notNull(),
  diaDaSemana: integer('dia_da_semana'), // 0 = Domingo, 1 = Segunda...
  dataEspecifica: timestamp('data_especifica', { withTimezone: true }),
  horaInicio: text('hora_inicio').notNull(), // ex: '14:00'
  horaFim: text('hora_fim').notNull(), // ex: '15:00'
});

// 4. Agendamentos (A Simulação de Entrevista)
export const agendamentos = pgTable('agendamentos', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  mentorId: uuid('mentor_id').references(() => usuarios.id).notNull(),
  alunoId: uuid('aluno_id').references(() => usuarios.id).notNull(),
  dataHoraInicio: timestamp('data_hora_inicio', { withTimezone: true }).notNull(),
  status: text('status').default('pendente').notNull(), // pendente, confirmado, concluido, cancelado
  salaVideoUrl: text('sala_video_url'),
  vagaAlvo: text('vaga_alvo').notNull(), // ex: "Frontend Engineer - React"
  linkCurriculo: text('link_curriculo'),
  observacoes: text('observacoes'),
}, (table) => ({
  horarioUnicoMentor: unique('horario_unico_mentor').on(table.mentorId, table.dataHoraInicio),
}));

// 5. Pagamentos (Monetização da plataforma)
export const pagamentos = pgTable('pagamentos', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  agendamentoId: uuid('agendamento_id').references(() => agendamentos.id, { onDelete: 'cascade' }).notNull().unique(),
  valorPago: decimal('valor_pago', { precision: 10, scale: 2 }).notNull(),
  statusPagamento: text('status_pagamento').default('aguardando').notNull(), // aguardando, pago, estornado
  gatewayId: text('gateway_id'),
  criadoEm: timestamp('criado_em', { withTimezone: true }).defaultNow().notNull(),
});

// 6. Relatório de Entrevista (O "Produto" entregue pelo Mentor)
export const relatorioEntrevista = pgTable('relatorio_entrevista', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  agendamentoId: uuid('agendamento_id').references(() => agendamentos.id, { onDelete: 'cascade' }).notNull().unique(),
  mentorId: uuid('mentor_id').references(() => usuarios.id).notNull(),
  alunoId: uuid('aluno_id').references(() => usuarios.id).notNull(),
  pontosFortes: text('pontos_fortes').notNull(),
  pontosMelhoria: text('pontos_melhoria').notNull(),
  notaTecnica: integer('nota_tecnica'), // 0 a 10
  notaSoftSkills: integer('nota_soft_skills'), // 0 a 10
  vereditoSimulado: text('veredito_simulado').notNull(), // contrataria, talvez, nao_contrataria
  criadoEm: timestamp('criado_em', { withTimezone: true }).defaultNow().notNull(),
});

// 7. Avaliações (O Aluno avaliando o Mentor/Plataforma)
export const avaliacoes = pgTable('avaliacoes', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  agendamentoId: uuid('agendamento_id').references(() => agendamentos.id, { onDelete: 'cascade' }).notNull().unique(),
  alunoId: uuid('aluno_id').references(() => usuarios.id).notNull(),
  notaAoMentor: integer('nota_ao_mentor').notNull(), // 1 a 5
  feedbackPlataforma: text('feedback_plataforma'),
  criadoEm: timestamp('criado_em', { withTimezone: true }).defaultNow().notNull(),
});