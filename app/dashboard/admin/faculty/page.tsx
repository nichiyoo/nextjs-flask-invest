import * as React from 'react';
import db from '@/lib/drizzle';

import { DataTable } from '@/components/tables/data-table';
import { Header, HeaderDescription, HeaderTitle } from '@/components/header';
import { columns } from '@/components/columns/faculites-column';

export default async function Page(): Promise<React.JSX.Element> {
	const faculties = await db.query.fakultas.findMany();

	return (
		<div className='grid gap-8'>
			<Header className='gap-2'>
				<HeaderTitle className='lg:text-4xl'>Data Fakultas</HeaderTitle>
				<HeaderDescription>
					Kelola data fakultas yang ada di universitas
				</HeaderDescription>
			</Header>

			<DataTable columns={columns} data={faculties} />
		</div>
	);
}
