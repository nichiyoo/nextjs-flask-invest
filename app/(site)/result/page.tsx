'use client';

import * as React from 'react';

import { FlaskConical, NotepadText } from 'lucide-react';
import { ResultValues, resultSchema } from '@/lib/schema';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { formatInvestmentOutput } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function Page() {
	const router = useRouter();
	const { toast } = useToast();

	const [result, setResult] = React.useState<ResultValues | null>(null);
	const [valid, setValid] = React.useState<boolean | null>(null);

	React.useEffect(() => {
		const data = localStorage.getItem('result');
		const output = data ? JSON.parse(data) : null;

		const valid = output && resultSchema.safeParse(output).success;
		if (valid) setResult(output);
		setValid(valid);
	}, []);

	if (valid === false) {
		toast({
			title: 'Error Melihat Hasil',
			description: 'Kamu belum melakukan prediksi minat berinvestasi di pasar modal',
		});
		router.push('/prediction');
	}

	if (!result)
		return (
			<div className='min-h-[50vh] flex flex-col justify-center items-center text-center'>
				<Skeleton className='h-12 w-2/3 mb-4' />
				<Skeleton className='h-4 w-full mb-2' />
				<Skeleton className='h-4 w-full mb-2' />
				<Skeleton className='h-4 w-full mb-2' />
				<Skeleton className='h-4 w-full mb-2' />
				<Skeleton className='h-4 w-1/2 mb-4' />

				<div className='flex items-center gap-2'>
					<Skeleton className='w-40 h-10' />
					<Skeleton className='w-40 h-10' />
				</div>
			</div>
		);

	return (
		<div className='min-h-[50vh] flex flex-col justify-center text-center'>
			<h1 className='text-5xl font-bold font-serif text-balance mb-2 motion-preset-slide-up'>{result.output}</h1>
			<p className='text-muted-foreground mb-4 motion-preset-slide-up motion-delay-100'>
				{formatInvestmentOutput(result)}
			</p>

			<div className='flex justify-center items-center gap-2 motion-preset-slide-up motion-delay-200'>
				<Link href='/prediction' legacyBehavior>
					<Button>
						<FlaskConical className='size-5' />
						<span>Ulangi Prediksi</span>
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
	);
}
