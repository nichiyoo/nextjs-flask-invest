'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FlaskConical, NotepadText } from 'lucide-react';

import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { formatInvestmentOutput } from '@/lib/utils';
import { ResultValues, resultSchema } from '@/lib/schema';
import { ButtonGroup } from '@/components/group';
import { Header, HeaderDescription, HeaderTitle } from '@/components/header';

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
		setValid(!!valid);
	}, []);

	if (valid === false) {
		toast({
			title: 'Error Melihat Hasil',
			description: 'Kamu belum melakukan prediksi minat berinvestasi',
		});

		router.push('/prediction');
	}

	if (!result)
		return (
			<div className='py-32 grid gap-6'>
				<Skeleton className='h-12 w-2/3' />

				<div className='grid gap-2'>
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-full' />
					<Skeleton className='h-4 w-1/2' />
				</div>

				<div className='flex items-center gap-2'>
					<Skeleton className='w-40 h-10' />
					<Skeleton className='w-40 h-10' />
				</div>
			</div>
		);

	return (
		<div className='grid gap-8'>
			<Header className='py-32'>
				<HeaderTitle>{result.output}</HeaderTitle>
				<HeaderDescription>{formatInvestmentOutput(result)}</HeaderDescription>

				<ButtonGroup>
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
				</ButtonGroup>
			</Header>
		</div>
	);
}
