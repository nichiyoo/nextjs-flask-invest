import 'dotenv/config';
import { reset, seed } from 'drizzle-seed';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from '@/database/schema';
import { hashPassword } from '@/lib/hash';

async function main() {
	const client = createClient({ url: process.env.DB_FILE_NAME! });
	const db = drizzle(client);

	await reset(db, schema);
	const fakultasData: schema.insertFakultas[] = [
		{ nama: 'FEB' },
		{ nama: 'FK' },
		{ nama: 'FT' },
		{ nama: 'FISIP' },
		{ nama: 'FIK' },
		{ nama: 'FH' },
		{ nama: 'FIKES' },
	];

	const listFakultas = await db
		.insert(schema.fakultas)
		.values(fakultasData)
		.returning();

	const fakultasMap = new Map(
		listFakultas.map((fakultas) => {
			return [fakultas.nama, fakultas.fakultas_id];
		})
	);

	const jurusanData: schema.insertJurusan[] = [
		{ fakultas_id: fakultasMap.get('FEB')!, nama: 'Manajemen' },
		{ fakultas_id: fakultasMap.get('FEB')!, nama: 'Akutansi' },
		{ fakultas_id: fakultasMap.get('FEB')!, nama: 'Ekonomi Pembangunan' },
		{ fakultas_id: fakultasMap.get('FEB')!, nama: 'Ekonomi Syariah' },
		{ fakultas_id: fakultasMap.get('FK')!, nama: 'Kedokteran' },
		{ fakultas_id: fakultasMap.get('FK')!, nama: 'Farmasi' },
		{ fakultas_id: fakultasMap.get('FT')!, nama: 'Teknik Mesin' },
		{ fakultas_id: fakultasMap.get('FT')!, nama: 'Teknik Industri' },
		{ fakultas_id: fakultasMap.get('FT')!, nama: 'Teknik Perkapalan' },
		{ fakultas_id: fakultasMap.get('FT')!, nama: 'Teknik Elektro' },
		{ fakultas_id: fakultasMap.get('FISIP')!, nama: 'Ilmu Komunikasi' },
		{ fakultas_id: fakultasMap.get('FISIP')!, nama: 'Hubungan Internasional' },
		{ fakultas_id: fakultasMap.get('FISIP')!, nama: 'Ilmu Politik' },
		{ fakultas_id: fakultasMap.get('FISIP')!, nama: 'Sains Informasi' },
		{ fakultas_id: fakultasMap.get('FIK')!, nama: 'Informatika' },
		{ fakultas_id: fakultasMap.get('FIK')!, nama: 'Sistem Informasi' },
		{ fakultas_id: fakultasMap.get('FH')!, nama: 'Hukum' },
		{ fakultas_id: fakultasMap.get('FIKES')!, nama: 'Keperawatan' },
		{ fakultas_id: fakultasMap.get('FIKES')!, nama: 'Kesehatan Masyarakat' },
		{ fakultas_id: fakultasMap.get('FIKES')!, nama: 'Gizi' },
		{ fakultas_id: fakultasMap.get('FIKES')!, nama: 'Fisioterapi' },
	];

	await db.insert(schema.jurusan).values(jurusanData);

	const userData: schema.insertUser[] = [
		{
			nama: 'Administrator',
			email: 'admin@example.com',
			password: await hashPassword('password'),
			role: 'admin',
		},
	];

	const hashed = await hashPassword('password');

	await seed(db, { user: schema.user }).refine((fake) => {
		return {
			user: {
				columns: {
					nama: fake.fullName(),
					jurusan_id: fake.int({ minValue: 1, maxValue: jurusanData.length }),
					role: fake.default({ defaultValue: 'user' }),
					password: fake.default({ defaultValue: hashed }),
				},
				count: 30,
			},
		};
	});

	await db.insert(schema.user).values(userData);
	console.log('Seeding completed successfully');
}

main().catch((error) => {
	console.error('Error seeding database:', error);
	process.exit(1);
});
