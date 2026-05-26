import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('A variável DATABASE_URL não está definida.');
}

  const connectionString = process.env.DATABASE_URL;

// Em desenvolvimento, o Next.js recarrega os arquivos constantemente.
// Precisamos garantir que não criamos múltiplas conexões com o banco de dados.
const globalForDb = globalThis as unknown as {
  postgresClient: postgres.Sql | undefined;
};

export const client = globalForDb.postgresClient ?? postgres(connectionString, { prepare: false });

if (process.env.NODE_ENV !== 'production') {
  globalForDb.postgresClient = client;
}

export const db = drizzle(client, { schema });