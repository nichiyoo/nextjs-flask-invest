import * as React from 'react';
import db from '@/lib/drizzle';

import { DataTable } from '@/components/tables/data-table';
import { columns } from '@/components/columns/majors-column';
import { Header, HeaderDescription, HeaderTitle } from '@/components/header';

export default async function Page(): Promise<React.JSX.Element> {
	const majors = await db.query.jurusan.findMany({
		with: {
			fakultas: true,
		},
	});

	return (
		<div className='grid gap-8'>
			<Header className='gap-2'>
				<HeaderTitle className='lg:text-4xl'>Data Jurusan</HeaderTitle>
				<HeaderDescription>
					Kelola data fakultas yang ada di universitas
				</HeaderDescription>
			</Header>

			<DataTable columns={columns} data={majors} />
		</div>
	);
}
