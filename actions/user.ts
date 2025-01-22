'use server';

import db from '@/lib/drizzle';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import * as schema from '@/database/schema';
import { revalidatePath } from 'next/cache';
import { getCurrentSession } from '@/lib/session';

export const remove = async (user_id: number) => {
	const { user } = await getCurrentSession();

	if (!user) return redirect('/auth/login');
	if (user.role !== 'admin') throw Error('Anda tidak dapat menghapus user');

	const found = await db.query.user.findFirst({
		where: eq(schema.user.user_id, user_id),
	});

	if (!found) throw Error('User tidak ditemukan');

	await db.delete(schema.user).where(eq(schema.user.user_id, user_id));
	revalidatePath('/dashboard/users');
};
