CREATE TABLE "agendamentos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"mentor_id" uuid NOT NULL,
	"aluno_id" uuid NOT NULL,
	"data_hora_inicio" timestamp with time zone NOT NULL,
	"status" text DEFAULT 'pendente' NOT NULL,
	"sala_video_url" text,
	"vaga_alvo" text NOT NULL,
	"link_curriculo" text,
	"observacoes" text,
	CONSTRAINT "horario_unico_mentor" UNIQUE("mentor_id","data_hora_inicio")
);
--> statement-breakpoint
CREATE TABLE "avaliacoes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"agendamento_id" uuid NOT NULL,
	"aluno_id" uuid NOT NULL,
	"nota_ao_mentor" integer NOT NULL,
	"feedback_plataforma" text,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "avaliacoes_agendamento_id_unique" UNIQUE("agendamento_id")
);
--> statement-breakpoint
CREATE TABLE "disponibilidades" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"mentor_id" uuid NOT NULL,
	"dia_da_semana" integer,
	"data_especifica" timestamp with time zone,
	"hora_inicio" text NOT NULL,
	"hora_fim" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pagamentos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"agendamento_id" uuid NOT NULL,
	"valor_pago" numeric(10, 2) NOT NULL,
	"status_pagamento" text DEFAULT 'aguardando' NOT NULL,
	"gateway_id" text,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "pagamentos_agendamento_id_unique" UNIQUE("agendamento_id")
);
--> statement-breakpoint
CREATE TABLE "perfis_mentores" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"usuario_id" uuid NOT NULL,
	"bio" text,
	"preco_hora" numeric(10, 2),
	"especialidades" text[],
	"github_url" text,
	"linkedin_url" text
);
--> statement-breakpoint
CREATE TABLE "relatorio_entrevista" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"agendamento_id" uuid NOT NULL,
	"mentor_id" uuid NOT NULL,
	"aluno_id" uuid NOT NULL,
	"pontos_fortes" text NOT NULL,
	"pontos_melhoria" text NOT NULL,
	"nota_tecnica" integer,
	"nota_soft_skills" integer,
	"veredito_simulado" text NOT NULL,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "relatorio_entrevista_agendamento_id_unique" UNIQUE("agendamento_id")
);
--> statement-breakpoint
CREATE TABLE "usuarios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nome" text NOT NULL,
	"email" text NOT NULL,
	"tipo_perfil" text NOT NULL,
	"avatar_url" text,
	"criado_em" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "usuarios_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_mentor_id_usuarios_id_fk" FOREIGN KEY ("mentor_id") REFERENCES "public"."usuarios"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_aluno_id_usuarios_id_fk" FOREIGN KEY ("aluno_id") REFERENCES "public"."usuarios"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "avaliacoes" ADD CONSTRAINT "avaliacoes_agendamento_id_agendamentos_id_fk" FOREIGN KEY ("agendamento_id") REFERENCES "public"."agendamentos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "avaliacoes" ADD CONSTRAINT "avaliacoes_aluno_id_usuarios_id_fk" FOREIGN KEY ("aluno_id") REFERENCES "public"."usuarios"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "disponibilidades" ADD CONSTRAINT "disponibilidades_mentor_id_usuarios_id_fk" FOREIGN KEY ("mentor_id") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_agendamento_id_agendamentos_id_fk" FOREIGN KEY ("agendamento_id") REFERENCES "public"."agendamentos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "perfis_mentores" ADD CONSTRAINT "perfis_mentores_usuario_id_usuarios_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "relatorio_entrevista" ADD CONSTRAINT "relatorio_entrevista_agendamento_id_agendamentos_id_fk" FOREIGN KEY ("agendamento_id") REFERENCES "public"."agendamentos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "relatorio_entrevista" ADD CONSTRAINT "relatorio_entrevista_mentor_id_usuarios_id_fk" FOREIGN KEY ("mentor_id") REFERENCES "public"."usuarios"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "relatorio_entrevista" ADD CONSTRAINT "relatorio_entrevista_aluno_id_usuarios_id_fk" FOREIGN KEY ("aluno_id") REFERENCES "public"."usuarios"("id") ON DELETE no action ON UPDATE no action;