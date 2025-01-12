import { Header, HeaderDescription, HeaderTitle } from '@/components/header';
import PredictionForm from '@/components/prediction/form';
import * as React from 'react';

export default async function Page(): Promise<React.JSX.Element> {
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
