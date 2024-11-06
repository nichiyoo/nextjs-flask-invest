import * as React from 'react';

export default async function Page(): Promise<React.JSX.Element> {
	return (
		<div className='prose dark:prose-invert prose-p:text-muted-foreground prose-headings:font-serif prose-headings:font-bold max-w-none'>
			<div className='motion-preset-slide-up' style={{ '--motion-delay': '100ms' } as React.CSSProperties}>
				<h1 className='text-5xl font-bold font-serif text-balance mb-2'>
					Studi Minat Investasi Mahasiswa di Pasar Modal
				</h1>
				<p>
					Menabung merupakan kebiasaan penting untuk memenuhi kebutuhan mendesak, seperti pendidikan dan kesehatan.
					Namun, dengan tantangan ekonomi yang semakin kompleks, menabung saja tidak cukup. Imbal hasil yang rendah dan
					inflasi terus menggerus nilai uang, sehingga investasi menjadi alternatif yang menarik.
				</p>
			</div>

			<div className='motion-preset-slide-up' style={{ '--motion-delay': '200ms' } as React.CSSProperties}>
				<h2>Upaya Peningkatan Partisipasi Mahasiswa sebagai Investor</h2>
				<p>
					Di Indonesia, pemerintah berupaya meningkatkan partisipasi mahasiswa sebagai investor di pasar modal. Data
					menunjukkan bahwa mahasiswa memiliki potensi besar untuk berinvestasi, dengan pertumbuhan signifikan dalam
					jumlah investor muda di pasar modal.
				</p>
			</div>

			<div className='motion-preset-slide-up' style={{ '--motion-delay': '300ms' } as React.CSSProperties}>
				<h3>Pentingnya Memahami Perilaku Investasi Mahasiswa</h3>
				<p>
					Pemahaman tentang perilaku investasi mahasiswa menjadi krusial dalam perencanaan pembangunan ekonomi. Ada
					beberapa faktor yang memengaruhi minat mahasiswa untuk berinvestasi, di antaranya:
				</p>
				<ul>
					<li>Manfaat investasi</li>
					<li>Pengetahuan tentang investasi</li>
					<li>Kondisi ekonomi</li>
				</ul>
			</div>

			<div className='motion-preset-slide-up' style={{ '--motion-delay': '400ms' } as React.CSSProperties}>
				<h3>Kendala dan Solusi dalam Minat Investasi Mahasiswa</h3>
				<p>
					Meskipun terdapat kendala seperti risiko investasi, perkembangan teknologi membuka peluang baru. Sistem
					berbasis algoritma machine learning, seperti K-Nearest Neighbors (KNN), dapat membantu memprediksi dan
					memahami tren minat investasi mahasiswa.
				</p>
			</div>

			<div className='motion-preset-slide-up' style={{ '--motion-delay': '500ms' } as React.CSSProperties}>
				<h2>Tujuan Penelitian</h2>
				<p>
					Penelitian ini akan fokus pada analisis minat mahasiswa di Universitas Pembangunan Veteran Jakarta. Data
					primer akan diperoleh dari kuesioner untuk menghasilkan sistem prediksi yang lebih akurat dan relevan bagi
					mahasiswa.
				</p>
			</div>
		</div>
	);
}
