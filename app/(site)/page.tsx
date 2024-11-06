import { Brain, FlaskConical, NotepadText, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
	return (
		<div className='grid gap-8'>
			<div className='min-h-[50vh] flex flex-col justify-center'>
				<h1 className='text-5xl font-bold font-serif text-balance mb-2 motion-preset-slide-up'>
					Prediksi Minat Mahasiswa Dalam <span className='text-primary'>Berinvestasi di Pasar Modal</span> menggunakan
					Machine Learning
				</h1>

				<p className='text-muted-foreground mb-4 motion-preset-slide-up motion-delay-100'>
					Sistem ini bertujuan untuk mengidentifikasi pola dan faktor yang mempengaruhi minat investasi mahasiswa. Hasil
					prediksi ini dapat digunakan untuk mengembangkan strategi edukasi finansial yang lebih efektif dan sesuai
					dengan kebutuhan mahasiswa.
				</p>

				<div className='flex items-center gap-2 motion-preset-slide-up motion-delay-200'>
					<Link href='/prediction' legacyBehavior>
						<Button>
							<FlaskConical className='size-5' />
							<span>Prediksi Minat</span>
						</Button>
					</Link>
					<Link href='/about'>
						<Button variant='secondary'>
							<NotepadText className='size-5' />
							<span>Baca Publikasi</span>
						</Button>
					</Link>
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
				<Card className='motion-preset-expand motion-delay-100'>
					<CardHeader>
						<CardTitle className='flex items-center gap-2 text-base'>
							<TrendingUp className='h-5 w-5 text-primary' />
							Pentingnya Investasi
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className='text-muted-foreground text-sm'>
							Investasi sebagai solusi menghadapi tantangan ekonomi modern, memberikan imbal hasil lebih tinggi
							dibanding menabung konvensional.
						</p>
					</CardContent>
				</Card>

				<Card className='motion-preset-expand motion-delay-200'>
					<CardHeader>
						<CardTitle className='flex items-center gap-2 text-base'>
							<Users className='h-5 w-5 text-primary' />
							Fokus pada Mahasiswa
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className='text-muted-foreground text-sm'>
							Analisis minat investasi mahasiswa Universitas Pembangunan Veteran Jakarta menggunakan data primer dari
							kuesioner.
						</p>
					</CardContent>
				</Card>

				<Card className='motion-preset-expand motion-delay-300'>
					<CardHeader>
						<CardTitle className='flex items-center gap-2 text-base'>
							<Brain className='h-5 w-5 text-primary' />
							Solusi Machine Learning
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p className='text-muted-foreground text-sm'>
							Penggunaan algoritma K-Nearest Neighbors (KNN) untuk memprediksi dan memahami tren minat investasi
							mahasiswa.
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
