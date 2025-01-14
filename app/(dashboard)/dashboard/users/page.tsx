import * as React from 'react';

import db from '@/lib/drizzle';
import { DataTable } from '@/components/tables/data-table';
import { columns } from '@/components/columns/users-column';
import { Header, HeaderDescription, HeaderTitle } from '@/components/header';

export default async function Page(): Promise<React.JSX.Element> {
	const users = await db.query.user.findMany({
		with: {
			jurusan: {
				with: {
					fakultas: true,
				},
			},
		},
	});

	return (
		<div className='grid gap-8'>
			<Header className='gap-2'>
				<HeaderTitle className='lg:text-4xl'>Data Pengguna</HeaderTitle>
				<HeaderDescription>
					Kelola dan analisis data mahasiswa berdasarkan data yang dikumpulkan
					dari kuesioner.
				</HeaderDescription>
			</Header>

			<DataTable columns={columns} data={users} />
		</div>
	);
}
