import { pgTable, uuid, text, timestamp, decimal, integer, unique } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const usuarios = pgTable('usuarios', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  nome: text('nome').notNull(),
  email: text('email').notNull().unique(),
  tipoPerfil: text('tipo_perfil').notNull(),
  avatarUrl: text('avatar_url'),
  criadoEm: timestamp('criado_em', { withTimezone: true }).defaultNow().notNull(),
});

export const perfisMentores = pgTable('perfis_mentores', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  usuarioId: uuid('usuario_id').references(() => usuarios.id, { onDelete: 'cascade' }).notNull(),
  bio: text('bio'),
  precoHora: decimal('preco_hora', { precision: 10, scale: 2 }),
  especialidades: text('especialidades').array(),
  githubUrl: text('github_url'),
  linkedinUrl: text('linkedin_url'),
});

export const agendamentos = pgTable('agendamentos', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  mentorId: uuid('mentor_id').references(() => usuarios.id).notNull(),
  candidatoId: uuid('candidato_id').references(() => usuarios.id).notNull(),
  dataHoraInicio: timestamp('data_hora_inicio', { withTimezone: true }).notNull(),
  status: text('status').default('agendado').notNull(),
  salaVideoUrl: text('sala_video_url'),
}, (table) => ({
  horarioUnicoMentor: unique('horario_unico_mentor').on(table.mentorId, table.dataHoraInicio),
}));

export const avaliacoes = pgTable('avaliacoes', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  agendamentoId: uuid('agendamento_id').references(() => agendamentos.id).notNull(),
  nota: integer('nota').notNull(),
  comentario: text('comentario'),
  criadoEm: timestamp('criado_em', { withTimezone: true }).defaultNow().notNull(),
});