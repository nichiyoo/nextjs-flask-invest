import * as z from 'zod';

export const scale = ['1', '2', '3', '4', '5'] as const;

export const supports = [
	{ value: '1', label: 'Sangat Tidak Mendukung' },
	{ value: '2', label: 'Tidak Mendukung' },
	{ value: '3', label: 'Biasa Saja' },
	{ value: '4', label: 'Mendukung' },
	{ value: '5', label: 'Sangat Mendukung' },
];

export const importances = [
	{ value: '1', label: 'Sangat Tidak Penting' },
	{ value: '2', label: 'Tidak Penting' },
	{ value: '3', label: 'Biasa Saja' },
	{ value: '4', label: 'Penting' },
	{ value: '5', label: 'Sangat Penting' },
];

export const agreements = [
	{ value: '1', label: 'Sangat Tidak Setuju' },
	{ value: '2', label: 'Tidak Setuju' },
	{ value: '3', label: 'Biasa Saja' },
	{ value: '4', label: 'Setuju' },
	{ value: '5', label: 'Sangat Setuju' },
];

export const surveySchema = z.object({
	usia: z.coerce.number().min(15),
	jenis_kelamin: z.enum(['male', 'female']),
	uang_bulanan: z.coerce.number().min(100000),
	ekonomi_mendukung: z.enum(scale),
	penghasilan_cukup: z.enum(scale),
	tujuan_jangka_panjang: z.enum(scale),
	penghasilan_tambahan: z.enum(scale),
	meningkatkan_kekayaan: z.enum(scale),
	literasi_keuangan: z.enum(scale),
	kemudahan_platform: z.enum(scale),
	keuntungan: z.enum(scale),
	risiko: z.enum(scale),
	tahu_investasi: z.enum(['yes', 'maybe', 'no']),
	sudah_investasi: z.enum(['yes', 'no']),
	penghasilan_sendiri: z.enum(['yes', 'no']),
});

export type FormValues = z.infer<typeof surveySchema>;

type OptionType = {
	label: string;
	value: string;
};

type Field = {
	title: string;
	fields: Array<
		{
			name: keyof FormValues;
			label: string;
		} & (
			| {
					type: 'number';
			  }
			| {
					type: 'radio';
					options: OptionType[];
			  }
		)
	>;
};

export const surveySection: Field[] = [
	{
		title: 'Demografi',
		fields: [
			{
				name: 'usia',
				label: 'Usia',
				type: 'number',
			},
			{
				name: 'jenis_kelamin',
				label: 'Jenis Kelamin',
				type: 'radio',
				options: [
					{ value: 'male', label: 'Laki-laki' },
					{ value: 'female', label: 'Perempuan' },
				],
			},
		],
	},
	{
		title: 'Kondisi Ekonomi',
		fields: [
			{
				name: 'uang_bulanan',
				label: 'Berapa Uang sakumu / Penghasilanmu dalam sebulan ?',
				type: 'number',
			},
			{
				name: 'penghasilan_sendiri',
				label: 'Apakah Anda sudah berpenghasilan Sendiri?',
				type: 'radio',
				options: [
					{ value: 'yes', label: 'Ya' },
					{ value: 'no', label: 'Tidak' },
				],
			},
			{
				name: 'ekonomi_mendukung',
				label: 'Kondisi Ekonomi Mendukung untuk Berinvestasi ?',
				type: 'radio',
				options: supports,
			},
			{
				name: 'penghasilan_cukup',
				label: 'Penghasilan Cukup untuk Berinvestasi?',
				type: 'radio',
				options: supports,
			},
		],
	},
	{
		title: 'Tujuan Berinvestasi',
		fields: [
			{
				name: 'tujuan_jangka_panjang',
				label: 'Mencapai tujuan finansial jangka panjang',
				type: 'radio',
				options: importances,
			},
			{
				name: 'penghasilan_tambahan',
				label: 'Mendapatkan Penghasilan Tambahan',
				type: 'radio',
				options: importances,
			},
			{
				name: 'meningkatkan_kekayaan',
				label: 'Meningkatkan Kekayaan',
				type: 'radio',
				options: importances,
			},
		],
	},
	{
		title: 'Faktor-Faktor yang Mempengaruhi Keputusan untuk Berinvestasi',
		fields: [
			{
				name: 'literasi_keuangan',
				label: 'Literasi Keuangan mendorong Anda untuk berinvestasi',
				type: 'radio',
				options: agreements,
			},
			{
				name: 'kemudahan_platform',
				label: 'Kemudahan penggunaan platform investasi',
				type: 'radio',
				options: agreements,
			},
			{
				name: 'keuntungan',
				label: 'Keuntungan yang ditawarkan',
				type: 'radio',
				options: agreements,
			},
			{
				name: 'risiko',
				label: 'Risiko yang ditanggung',
				type: 'radio',
				options: agreements,
			},
		],
	},
	{
		title: 'Minat Berinvestasi',
		fields: [
			{
				name: 'tahu_investasi',
				label: 'Apakah Anda mengetahui apa itu investasi',
				type: 'radio',
				options: [
					{ value: 'yes', label: 'Ya' },
					{ value: 'maybe', label: 'Mungkin' },
					{ value: 'no', label: 'Tidak' },
				],
			},
			{
				name: 'sudah_investasi',
				label: 'Apakah Anda saat ini telah melakukan investasi ?',
				type: 'radio',
				options: [
					{ value: 'yes', label: 'Ya' },
					{ value: 'no', label: 'Tidak' },
				],
			},
		],
	},
];
