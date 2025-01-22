import * as React from 'react';
import { eq } from 'drizzle-orm';

import db from '@/lib/drizzle';
import { redirect } from 'next/navigation';
import * as schema from '@/database/schema';

import { DataTable } from '@/components/tables/data-table';
import { Header, HeaderDescription, HeaderTitle } from '@/components/header';
import { getCurrentSession } from '@/lib/session';
import { user as userColumn } from '@/components/columns/predictions-column';

export default async function Page(): Promise<React.JSX.Element> {
	const { user } = await getCurrentSession();
	if (!user) return redirect('/auth/login');

	const predictions = await db.query.prediksi.findMany({
		where: eq(schema.prediksi.user_id, user.user_id),
		with: {
			user: {
				with: {
					jurusan: true,
				},
			},
		},
	});

	return (
		<div className='grid gap-8'>
			<Header className='gap-2'>
				<HeaderTitle className='lg:text-4xl'>Data Prediksi</HeaderTitle>
				<HeaderDescription>
					Kelola dan analisis data prediksi minat investasi mahasiswa
					berdasarkan data yang dikumpulkan dari kuesioner.
				</HeaderDescription>
			</Header>

			<DataTable columns={userColumn} data={predictions} />
		</div>
	);
}
