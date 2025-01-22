import * as React from 'react';
import { redirect } from 'next/navigation';

import { getCurrentSession } from '@/lib/session';
import { PredictionForm } from '@/components/prediction/prediction-form';
import { Header, HeaderDescription, HeaderTitle } from '@/components/header';
import db from '@/lib/drizzle';
import * as schema from '@/database/schema';
import { eq } from 'drizzle-orm';

export default async function Page(): Promise<React.JSX.Element> {
	const { user: session } = await getCurrentSession();
	if (session === null) return redirect('/auth/login');

	const user = await db.query.user.findFirst({
		where: eq(schema.user.user_id, session.user_id),
		with: {
			jurusan: {
				with: {
					fakultas: true,
				},
			},
		},
	});

	if (!user) throw new Error('Data user yang terauthentikasi tidak ditemukan');

	return (
		<div className='grid gap-8'>
			<Header>
				<HeaderTitle>Prediksi Minat Berinvestasi di Pasar Modal</HeaderTitle>
				<HeaderDescription>
					Isi formulir di bawah untuk membuat prediksi minat berinvestasi di
					pasar modal.
				</HeaderDescription>
			</Header>
			<PredictionForm user={user} />
		</div>
	);
}
