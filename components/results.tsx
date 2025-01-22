import * as React from 'react';
import * as schema from '@/database/schema';
import { getRecommendation } from '@/lib/calculate';
import { formatInvestmentOutput } from '@/lib/utils';

export const ResultYes: React.FC<{
	result: schema.Prediksi;
	risk: string;
}> = ({ result, risk }) => {
	const recommendation = getRecommendation(risk);

	return (
		<React.Fragment>
			<p>{formatInvestmentOutput(result)}</p>

			<p>
				Profil Risiko Anda adalah {risk}. Maka, rekomendasi reksa dana yang
				cocok berdasarkan profil risiko Anda adalah {recommendation}.
			</p>
		</React.Fragment>
	);
};

export const ResultNo: React.FC = () => {
	return (
		<React.Fragment>
			<p>
				Tidak menjadi masalah jika Anda saat ini tidak tertarik dengan
				berinvestasi di Pasar Modal. Investasi memang bukan untuk semua orang,
				terutama jika belum siap atau belum memahami sepenuhnya risiko yang ada.
			</p>

			<p>
				Sekadar informasi bahwa pasar modal bisa jadi salah satu cara untuk
				membangun kekayaan di masa depan. Jika suatu saat Anda tertarik, banyak
				sumber yang bisa membantu untuk memahami cara kerja pasar modal dan
				potensi manfaat jangka panjang dari investasi.
			</p>
		</React.Fragment>
	);
};

export const ResultMaybe: React.FC = () => {
	return (
		<React.Fragment>
			<p>
				Ketertarikan untuk berinvestasi di pasar modal bisa berubah-ubah, dan
				wajar jika Anda merasa ingin tahu lebih banyak sebelum membuat keputusan
				untuk berinvestasi di Pasar Modal. Beberapa cara berikut bisa membantu
				Anda mendapatkan gambaran yang lebih jelas:
			</p>

			<ul>
				<li>
					Pelajari lebih dalam tentang risiko dan manfaat dari investasi di
					pasar modal.
				</li>
				<li>
					Baca lebih banyak tentang berbagai instrumen investasi seperti saham,
					obligasi, dan reksa dana.
				</li>
				<li>
					Cari tahu bagaimana cara memulai investasi dengan bijak dan mengelola
					risiko dengan tepat.
				</li>
			</ul>

			<p>
				Investasi bisa menjadi pilihan yang baik jika Anda memiliki pemahaman
				yang cukup tentang pasar modal. Menambah wawasan akan membantu Anda
				membuat keputusan yang lebih percaya diri dan matang.
			</p>
		</React.Fragment>
	);
};
