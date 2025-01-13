import * as React from 'react';
import { redirect } from 'next/navigation';

import { getCurrentSession } from '@/lib/session';
import { PredictionForm } from '@/components/prediction/form';
import { Header, HeaderDescription, HeaderTitle } from '@/components/header';

export default async function Page(): Promise<React.JSX.Element> {
	const { user } = await getCurrentSession();
	if (user === null) return redirect('/auth/login');

	return (
		<div className='grid gap-8'>
			<Header>
				<HeaderTitle>Prediksi Minat Berinvestasi di Pasar Modal</HeaderTitle>
				<HeaderDescription>
					Isi formulir di bawah untuk membuat prediksi minat berinvestasi di
					pasar modal.
				</HeaderDescription>
			</Header>
			<PredictionForm />
		</div>
	);
}
