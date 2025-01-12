import * as z from 'zod';
import { scale } from '@/lib/constant';

export const formSchema = z.object({
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
