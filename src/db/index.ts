import { neon } from '@neondatabase/serverless';
import config from '@/lib/config';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon(config.databaseUrl);

export const db = drizzle({ client: sql, casing: 'snake_case', schema });
