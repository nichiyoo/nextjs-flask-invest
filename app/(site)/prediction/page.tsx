import * as React from 'react';

import PredictionForm from './form';

export default async function Page(): Promise<React.JSX.Element> {
	return (
		<div>
			<div className='motion-preset-slide-up'>
				<h1 className='text-5xl font-bold font-serif text-balance mb-2'>Prediksi Minat Berinvestasi di Pasar Modal</h1>
				<p className='text-muted-foreground mb-4'>
					Isi formulir di bawah untuk membuat prediksi minat berinvestasi di pasar modal.
				</p>
			</div>
			<PredictionForm />
		</div>
	);
}
