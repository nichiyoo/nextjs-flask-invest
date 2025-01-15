import * as React from 'react';
import { Header, HeaderTitle } from '@/components/header';

export default async function Page(): Promise<React.JSX.Element> {
	return (
		<div className='grid gap-8'>
			<Header>
				<HeaderTitle>Tentang Proyek</HeaderTitle>
			</Header>

			<p className='text-muted-foreground'>
				Menabung merupakan kebiasaan penting untuk memenuhi kebutuhan mendesak
				seperti pendidikan dan kesehatan. Namun, dengan tantangan ekonomi yang
				semakin kompleks, menabung saja tidak cukup karena imbal hasil yang
				rendah dan inflasi yang menggerus nilai uang. Oleh karena itu, investasi
				menjadi alternatif yang menarik. Di Indonesia, pemerintah berupaya
				meningkatkan partisipasi mahasiswa sebagai investor di pasar modal. Data
				menunjukkan bahwa mahasiswa memiliki potensi besar untuk berinvestasi,
				dengan pertumbuhan signifikan dalam jumlah investor muda di pasar modal.
				<br />
				<br />
				Pemahaman tentang perilaku investasi mahasiswa menjadi krusial untuk
				perencanaan pembangunan ekonomi. Beberapa faktor, seperti manfaat
				investasi, pengetahuan tentang investasi, dan kondisi ekonomi,
				memengaruhi minat mahasiswa untuk berinvestasi. Meskipun ada kendala
				seperti risiko investasi, perkembangan sistem yang dapat memprediksi
				minat investasi mahasiswa menggunakan algoritma machine learning,
				seperti K-Nearest Neighbors (KNN), dapat membantu memahami tren ini.
				Penelitian ini akan fokus pada analisis minat mahasiswa di Universitas
				Pembangunan Veteran Jakarta dengan menggunakan data primer dari
				kuesioner untuk menghasilkan sistem prediksi yang akurat.
			</p>
		</div>
	);
}
