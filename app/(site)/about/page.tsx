import { Header, HeaderDescription, HeaderTitle } from '@/components/header';
import * as React from 'react';

export default async function Page(): Promise<React.JSX.Element> {
	return (
		<div className='grid gap-8'>
			<Header>
				<HeaderTitle>
					Studi Minat Investasi Mahasiswa di Pasar Modal
				</HeaderTitle>
				<HeaderDescription>
					Menabung merupakan kebiasaan penting untuk memenuhi kebutuhan
					mendesak, seperti pendidikan dan kesehatan. Namun, dengan tantangan
					ekonomi yang semakin kompleks, menabung saja tidak cukup. Imbal hasil
					yang rendah dan inflasi terus menggerus nilai uang, sehingga investasi
					menjadi alternatif yang menarik.
				</HeaderDescription>
			</Header>

			<div className='max-w-none prose dark:prose-invert prose-p:text-muted-foreground prose-headings:font-serif prose-headings:font-bold'>
				<div>
					<h2>Upaya Peningkatan Partisipasi Mahasiswa sebagai Investor</h2>
					<p>
						Di Indonesia, pemerintah berupaya meningkatkan partisipasi mahasiswa
						sebagai investor di pasar modal. Data menunjukkan bahwa mahasiswa
						memiliki potensi besar untuk berinvestasi, dengan pertumbuhan
						signifikan dalam jumlah investor muda di pasar modal.
					</p>
				</div>

				<div>
					<h3>Pentingnya Memahami Perilaku Investasi Mahasiswa</h3>
					<p>
						Pemahaman tentang perilaku investasi mahasiswa menjadi krusial dalam
						perencanaan pembangunan ekonomi. Ada beberapa faktor yang
						memengaruhi minat mahasiswa untuk berinvestasi, di antaranya:
					</p>
					<ul>
						<li>Manfaat investasi</li>
						<li>Pengetahuan tentang investasi</li>
						<li>Kondisi ekonomi</li>
					</ul>
				</div>

				<div>
					<h3>Kendala dan Solusi dalam Minat Investasi Mahasiswa</h3>
					<p>
						Meskipun terdapat kendala seperti risiko investasi, perkembangan
						teknologi membuka peluang baru. Sistem berbasis algoritma machine
						learning, seperti K-Nearest Neighbors (KNN), dapat membantu
						memprediksi dan memahami tren minat investasi mahasiswa.
					</p>
				</div>

				<div>
					<h2>Tujuan Penelitian</h2>
					<p>
						Penelitian ini akan fokus pada analisis minat mahasiswa di
						Universitas Pembangunan Veteran Jakarta. Data primer akan diperoleh
						dari kuesioner untuk menghasilkan sistem prediksi yang lebih akurat
						dan relevan bagi mahasiswa.
					</p>
				</div>
			</div>
		</div>
	);
}
