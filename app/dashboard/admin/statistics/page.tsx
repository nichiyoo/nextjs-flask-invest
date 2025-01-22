import * as React from 'react';
import db from '@/lib/drizzle';
import { Header, HeaderDescription, HeaderTitle } from '@/components/header';
import { PredictionCharts } from '@/components/charts/predicition-chart';

export default async function Page(): Promise<React.JSX.Element> {
	const predictions = await db.query.prediksi.findMany({
		with: {
			user: {
				with: {
					jurusan: {
						with: {
							fakultas: true,
						},
					},
				},
			},
		},
	});

	const faculties = await db.query.fakultas.findMany();

	return (
		<div className='grid gap-8'>
			<Header className='gap-2'>
				<HeaderTitle className='lg:text-4xl'>Statistik Data</HeaderTitle>
				<HeaderDescription>
					Statistik data prediksi minat investasi mahasiswa
				</HeaderDescription>
			</Header>

			<PredictionCharts predictions={predictions} faculties={faculties} />
		</div>
	);
}
