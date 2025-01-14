import * as React from 'react';
import { Header, HeaderDescription, HeaderTitle } from '@/components/header';
import { side } from '@/lib/constant';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function Page(): Promise<React.JSX.Element> {
	const submenus = side.flatMap((item) => item.submenu ?? []);

	return (
		<div className='grid gap-8'>
			<Header className='gap-2'>
				<HeaderTitle className='lg:text-4xl'>
					Dashboard Hasil Prediksi
				</HeaderTitle>
				<HeaderDescription>
					Kelola dan analisis data prediksi minat investasi mahasiswa
					berdasarkan data yang dikumpulkan dari kuesioner.
				</HeaderDescription>
			</Header>

			<div className='grid gap-6 lg:grid-cols-3'>
				{submenus.map((item) => {
					const Icon = item.icon;

					return (
						<Link href={item.href} key={item.title}>
							<Card className='h-full hover:bg-background'>
								<CardHeader>
									<CardTitle className='flex items-center gap-2 text-base'>
										<Icon className='text-primary' />
										<span>{item.title}</span>
									</CardTitle>
								</CardHeader>
								<CardContent>
									<p className='text-muted-foreground'>{item.description}</p>
								</CardContent>
							</Card>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
