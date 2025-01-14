import * as React from 'react';
import * as schema from '@/database/schema';
import { redirect } from 'next/navigation';

import db from '@/lib/drizzle';
import { eq } from 'drizzle-orm';

import { getCurrentSession } from '@/lib/session';
import { PredictionForm } from '@/components/prediction/prediction-form';
import { Header, HeaderDescription, HeaderTitle } from '@/components/header';

export default async function Page(): Promise<React.JSX.Element> {
	const { user } = await getCurrentSession();
	if (user === null) return redirect('/auth/login');

	const prediction = await db.query.prediksi.findFirst({
		where: eq(schema.prediksi.user_id, user.user_id),
	});
	if (prediction) return redirect('/result');

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
