import Link from 'next/link';
import { FlaskConical, NotepadText } from 'lucide-react';

import { features } from '@/lib/constant';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header, HeaderDescription, HeaderTitle } from '@/components/header';

export default async function Home() {
	return (
		<div className='grid gap-8'>
			<Header className='py-32'>
				<HeaderTitle>
					Prediksi Minat Mahasiswa Dalam{' '}
					<span className='text-primary'>Berinvestasi di Pasar Modal</span>{' '}
					menggunakan Machine Learning
				</HeaderTitle>

				<HeaderDescription>
					Sistem ini bertujuan untuk mengidentifikasi pola dan faktor yang
					mempengaruhi minat investasi mahasiswa. Hasil prediksi ini dapat
					digunakan untuk mengembangkan strategi edukasi finansial yang lebih
					efektif dan sesuai dengan kebutuhan mahasiswa.
				</HeaderDescription>

				<ButtonGroup>
					<Link href='/prediction'>
						<Button>
							<FlaskConical />
							<span>Prediksi Minat</span>
						</Button>
					</Link>

					<Link href='/about'>
						<Button variant='secondary'>
							<NotepadText />
							<span>Baca Publikasi</span>
						</Button>
					</Link>
				</ButtonGroup>
			</Header>

			<div className='grid lg:grid-cols-3 gap-6'>
				{features.map((feature) => {
					const Icon = feature.icon;

					return (
						<Card key={feature.title}>
							<CardHeader>
								<CardTitle className='flex items-center gap-2 text-base'>
									<Icon className='text-primary' />
									<span>{feature.title}</span>
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className='text-muted-foreground'>{feature.description}</p>
							</CardContent>
						</Card>
					);
				})}
			</div>
		</div>
	);
}
