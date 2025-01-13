import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ResultValues } from './schema';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatCurrency = (number: number) => {
	const formatter = new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});

	return formatter.format(number);
};

export function formatInvestmentOutput(data: ResultValues) {
	const {
		usia,
		jenis_kelamin,
		uang_bulanan,
		ekonomi_mendukung,
		penghasilan_cukup,
		tujuan_jangka_panjang,
		penghasilan_tambahan,
		meningkatkan_kekayaan,
		literasi_keuangan,
		kemudahan_platform,
		keuntungan,
		risiko,
		tahu_investasi,
		sudah_investasi,
	} = data.input;

	const mapper = {
		genders: {
			male: 'Laki-laki',
			female: 'Perempuan',
		},
		sudah_investasi: {
			yes: 'sudah berinvestasi',
			no: 'belum berinvestasi',
		},
		tahu_investasi: {
			yes: 'mengetahui',
			maybe: 'mungkin mengetahui',
			no: 'tidak mengetahui',
		},
		supports: {
			1: 'Sangat Tidak Mendukung',
			2: 'Tidak Mendukung',
			3: 'Biasa Saja',
			4: 'Mendukung',
			5: 'Sangat Mendukung',
		},
		importances: {
			1: 'Sangat Tidak Penting',
			2: 'Tidak Penting',
			3: 'Biasa Saja',
			4: 'Penting',
			5: 'Sangat Penting',
		},
		agreements: {
			1: 'Sangat Tidak Setuju',
			2: 'Tidak Setuju',
			3: 'Biasa Saja',
			4: 'Setuju',
			5: 'Sangat Setuju',
		},
	};

	const genders = mapper['genders'];
	const supports = mapper['supports'];
	const importances = mapper['importances'];
	const agreements = mapper['agreements'];

	return [
		`Anda adalah seorang ${genders[jenis_kelamin]} yang`,
		`berusia ${usia} tahun,`,
		`dengan pendapatan bulanan sebesar ${formatCurrency(uang_bulanan)}.`,
		`Anda ${mapper['tahu_investasi'][tahu_investasi]} apa itu investasi, dan saat ini ${mapper['sudah_investasi'][sudah_investasi]}.`,
		`Kondisi ekonomi Anda dianggap ${supports[ekonomi_mendukung]},`,
		`dan penghasilan Anda dianggap ${supports[penghasilan_cukup]} untuk berinvestasi.`,
		`Tujuan investasi Anda meliputi mencapai tujuan finansial jangka panjang (${importances[tujuan_jangka_panjang]}),`,
		`mendapatkan penghasilan tambahan (${importances[penghasilan_tambahan]}),`,
		`dan meningkatkan kekayaan (${importances[meningkatkan_kekayaan]}).`,
		`Faktor yang mempengaruhi keputusan Anda meliputi literasi keuangan (${agreements[literasi_keuangan]}),`,
		`kemudahan platform (${agreements[kemudahan_platform]}),`,
		`keuntungan yang ditawarkan (${agreements[keuntungan]}),`,
		`serta risiko yang ditanggung (${agreements[risiko]}).`,
	].join(' ');
}

export function formatInitial(raw: string) {
	const word = raw.toUpperCase();
	const splits = word.split(' ');

	return splits
		.slice(0, 2)
		.map((word) => word.substring(0, 1))
		.join('');
}
