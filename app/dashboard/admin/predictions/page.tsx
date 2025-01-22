import * as React from 'react';
import db from '@/lib/drizzle';

import { DataTable } from '@/components/tables/data-table';
import { admin as adminColumn } from '@/components/columns/predictions-column';
import { Header, HeaderDescription, HeaderTitle } from '@/components/header';

export default async function Page(): Promise<React.JSX.Element> {
	const predictions = await db.query.prediksi.findMany({
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

			<DataTable columns={adminColumn} data={predictions} />
		</div>
	);
}
