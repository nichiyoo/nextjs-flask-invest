'use server';

import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import db from '@/lib/drizzle';
import * as schema from '@/database/schema';

import { getCurrentSession } from '@/lib/session';
import { surveySchema, FormValues } from '@/lib/survey';

export async function predict(data: FormValues) {
	const { user } = await getCurrentSession();
	if (!user) redirect('/auth/login');

	const prediksi = await db.query.prediksi.findFirst({
		where: eq(schema.prediksi.user_id, user.user_id),
	});
	if (prediksi) throw Error('Anda sudah melakukan prediksi minat berinvestasi');

	const { data: validated, success, error } = surveySchema.safeParse(data);
	if (!success) throw Error(error.message);

	const response = await fetch(
		process.env.NEXT_PUBLIC_BACKEND_URL + '/api/predict',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Origin: 'http://localhost:3000',
				Host: 'localhost',
			},
			body: JSON.stringify(validated),
		}
	);

	if (!response.ok) throw new Error('Gagal terhubung ke API');
	const json = await response.json();

	await db.insert(schema.prediksi).values({
		...validated,
		user_id: user.user_id,
		tertarik_investasi: json.result as 'no' | 'yes' | 'maybe',
	} as schema.insertPrediksi);

	redirect('/result');
}

export const remove = async (prediksi_id: number) => {
	const { user } = await getCurrentSession();

	if (!user) redirect('/auth/login');
	if (user.role !== 'admin') throw Error('Anda tidak dapat menghapus prediksi');

	const found = await db.query.prediksi.findFirst({
		where: eq(schema.prediksi.prediksi_id, prediksi_id),
	});
	if (!found) throw Error('Prediksi tidak ditemukan');

	await db
		.delete(schema.prediksi)
		.where(eq(schema.prediksi.prediksi_id, prediksi_id));

	revalidatePath('/dashboard/predictions');
};
