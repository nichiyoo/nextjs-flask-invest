'use client';

import * as React from 'react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Prediksi, User, Jurusan, Fakultas } from '@/database/schema';

type PredictionWithRelations = Prediksi & {
	user: User & {
		jurusan:
			| null
			| (Jurusan & {
					fakultas: Fakultas;
			  });
	};
};

const CHART_COLORS = [
	'hsl(var(--chart-1))',
	'hsl(var(--chart-2))',
	'hsl(var(--chart-3))',
	'hsl(var(--chart-4))',
	'hsl(var(--chart-5))',
	'hsl(var(--chart-6))',
	'hsl(var(--chart-7))',
	'hsl(var(--chart-8))',
	'hsl(var(--chart-9))',
	'hsl(var(--chart-10))',
];

export function PredictionCharts({
	predictions,
	faculties,
}: {
	predictions: PredictionWithRelations[];
	faculties: Fakultas[];
}) {
	const config: ChartConfig = React.useMemo(() => {
		const temp: ChartConfig = {
			count: {
				label: 'Jumlah Mahasiswa',
			},
		};

		faculties.forEach((faculty, index) => {
			temp[faculty.fakultas_id.toString()] = {
				label: faculty.nama,
				color: CHART_COLORS[index % CHART_COLORS.length],
			};
		});
		return temp;
	}, [faculties]);

	const chart = React.useMemo(() => {
		const interestLevels = ['yes', 'no', 'maybe'];
		const grouped = predictions.reduce((acc, prediction) => {
			const interest = prediction.tertarik_investasi;
			if (!acc[interest]) {
				acc[interest] = faculties.reduce((temp, faculty) => {
					temp[faculty.fakultas_id.toString()] = {
						count: 0,
						name: faculty.nama,
					};
					return temp;
				}, {} as Record<string, { count: number; name: string }>);
			}

			const fakultas = prediction.user.jurusan?.fakultas.fakultas_id.toString();
			if (fakultas) acc[interest][fakultas].count++;
			return acc;
		}, {} as Record<string, Record<string, { count: number; name: string }>>);

		interestLevels.forEach((level) => {
			if (!grouped[level]) {
				grouped[level] = faculties.reduce((temp, faculty) => {
					temp[faculty.fakultas_id.toString()] = {
						count: 0,
						name: faculty.nama,
					};
					return temp;
				}, {} as Record<string, { count: number; name: string }>);
			}
		});

		return interestLevels.map((interest) => ({
			interest,
			data: Object.entries(grouped[interest]).map(
				([fakultasId, { count, name }]) => ({
					fakultas: name,
					count,
					fill: config[fakultasId]?.color,
				})
			),
		}));
	}, [predictions, faculties, config]);

	const getTrend = (data: { count: number }[]) => {
		const total = data.reduce((sum, item) => sum + item.count, 0);
		const average = total / data.length;
		const last = data[data.length - 1].count;
		return last > average ? 'up' : 'down';
	};

	const titles = {
		no: 'Tidak Tertarik',
		yes: 'Tertarik',
		maybe: 'Mungkin Tertarik',
	};

	return (
		<div className='grid lg:grid-cols-2 gap-4'>
			{chart.map(({ interest, data }) => (
				<Card key={interest}>
					<CardHeader>
						<CardTitle className='font-serif font-bold text-xl'>
							{titles[interest as keyof typeof titles]}
						</CardTitle>
						<CardDescription>Berdasarkan Fakultas</CardDescription>
					</CardHeader>
					<CardContent>
						<ChartContainer config={config}>
							{data.some((item) => item.count > 0) ? (
								<BarChart accessibilityLayer data={data} layout='vertical'>
									<YAxis
										dataKey='fakultas'
										type='category'
										tickLine={false}
										tickMargin={10}
										axisLine={false}
									/>
									<XAxis dataKey='count' type='number' hide />
									<ChartTooltip
										cursor={false}
										content={<ChartTooltipContent />}
									/>
									<Bar dataKey='count' layout='vertical' radius={5} />
								</BarChart>
							) : (
								<div className='flex items-center justify-center h-full'>
									<span className='text-muted-foreground text-sm'>
										Belum ada data pada kategori ini
									</span>
								</div>
							)}
						</ChartContainer>
					</CardContent>
					<CardFooter className='flex-col items-start'>
						{data.some((item) => item.count > 0) ? (
							<React.Fragment>
								<div className='flex items-center gap-2'>
									{getTrend(data) === 'up' ? (
										<React.Fragment>
											Trending up <TrendingUp className='size-4 text-primary' />
										</React.Fragment>
									) : (
										<React.Fragment>
											Trending down{' '}
											<TrendingDown className='size-4 text-primary' />
										</React.Fragment>
									)}
								</div>
								<span className='text-sm text-muted-foreground'>
									Menampilkan jumlah mahasiswa tiap fakultas
								</span>
							</React.Fragment>
						) : (
							<span className='text-sm text-muted-foreground'>
								Belum ada data pada kategori ini
							</span>
						)}
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
