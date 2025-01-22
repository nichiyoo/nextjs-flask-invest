import { RiskProfile } from '@/lib/type';
import * as schema from '@/database/schema';

export const calculateScore = (result: schema.Prediksi): number => {
	let score = 1;
	score += result.sudah_investasi === 'yes' ? 1 : 2;

	if (result.uang_bulanan < 1000000) score += 1;
	else if (result.uang_bulanan < 3000000) score += 2;
	else score += 4;

	score += Number(result.ekonomi_mendukung);
	score += Number(result.risiko);
	score += Number(result.kemudahan_platform);
	score += Number(result.penghasilan_tambahan);
	score += Number(result.penghasilan_cukup);
	score += Number(result.tujuan_jangka_panjang);
	score += Number(result.literasi_keuangan);
	score += Number(result.meningkatkan_kekayaan);
	score += Number(result.keuntungan);

	const mapper = {
		yes: 3,
		maybe: 2,
		no: 1,
	};

	score += mapper[result.tahu_investasi];
	return score;
};

export const getProfile = (score: number): RiskProfile => {
	if (score >= 13 && score <= 30) return 'Konservatif';
	if (score >= 31 && score <= 43) return 'Moderat';
	if (score >= 44 && score <= 55) return 'Agresif';
	return 'Unknown' as never;
};

export const getRecommendation = (risk: string): string => {
	switch (risk) {
		case 'Konservatif':
			return 'Reksa Dana Pasar Uang';
		case 'Moderat':
			return 'Reksa Dana Pendapatan Tetap';
		case 'Agresif':
			return 'Reksa Dana Saham';
		default:
			return 'Reksa Dana Campuran';
	}
};
