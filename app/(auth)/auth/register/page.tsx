import * as React from 'react';

import db from '@/lib/drizzle';
import { RegisterForm } from '@/components/auth/register-form';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default async function Page(): Promise<React.JSX.Element> {
	const listJurusan = await db.query.jurusan.findMany({
		with: {
			fakultas: true,
		},
	});

	return (
		<Card className='w-full max-w-md'>
			<CardHeader className='text-center'>
				<CardTitle className='text-2xl font-serif font-bold'>
					Daftar Akun
				</CardTitle>
				<CardDescription>
					Isi form di bawah untuk mendaftar akun baru
				</CardDescription>
			</CardHeader>
			<CardContent>
				<RegisterForm listJurusan={listJurusan} />
			</CardContent>
		</Card>
	);
}
