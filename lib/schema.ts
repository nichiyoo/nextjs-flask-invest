import * as z from 'zod';

import { scale } from './constant';

export const formSchema = z.object({
	gender: z.enum(['male', 'female'], {
		required_error: 'Jenis Kelamin harus dipilih',
	}),

	age: z.coerce
		.number({
			required_error: 'Usia harus diisi dengan angka',
		})
		.min(0, 'Usia harus lebih dari 0'),

	monthlyIncome: z.coerce
		.number({
			required_error: 'Penghasilan harus diisi dengan angka dalam satuan Rp.',
		})
		.min(0, 'Penghasilan harus lebih dari 0'),

	economicCondition: z.enum(scale, {
		required_error: 'Kondisi Ekonomi harus dipilih',
	}),

	incomeForInvestment: z.enum(scale, {
		required_error: 'Penghasilan Cukup untuk Berinvestasi harus dipilih',
	}),

	longTermGoal: z.enum(scale, {
		required_error: 'Tujuan jangka panjang harus dipilih',
	}),

	additionalIncome: z.enum(scale, {
		required_error: 'Penghasilan Tambahan harus dipilih',
	}),

	wealthIncrease: z.enum(scale, {
		required_error: 'Meningkatkan Kekayaan harus dipilih',
	}),

	financialLiteracy: z.enum(scale, {
		required_error: 'Literasi Keuangan harus dipilih',
	}),

	platformEaseOfUse: z.enum(scale, {
		required_error: 'Kemudahan penggunaan platform harus dipilih',
	}),

	offeredProfit: z.enum(scale, {
		required_error: 'Keuntungan yang ditawarkan harus dipilih',
	}),

	risk: z.enum(scale, {
		required_error: 'Risiko yang ditanggung harus dipilih',
	}),

	investmentKnowledge: z.enum(['yes', 'maybe', 'no'], {
		required_error: 'Pengetahuan investasi harus dipilih',
	}),

	currentlyInvesting: z.enum(['yes', 'no'], {
		required_error: 'Status investasi saat ini harus dipilih',
	}),
});

export const resultSchema = z.object({
	input: formSchema,
	output: z.enum([
		'Anda tidak berminat untuk berinvestasi',
		'Anda mungkin berminat untuk berinvestasi',
		'Anda berminat untuk berinvestasi',
	]),
});

export type FormValues = z.infer<typeof formSchema>;
export type ResultValues = z.infer<typeof resultSchema>;
