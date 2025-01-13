import 'dotenv/config';
import * as schema from '@/database/schema';
import { drizzle } from 'drizzle-orm/libsql';

const db = drizzle({
	schema,
	connection: {
		url: process.env.DB_FILE_NAME!,
	},
});

export default db;
