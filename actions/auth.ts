'use server';

import * as z from 'zod';
import { eq } from 'drizzle-orm';
import * as schema from '@/database/schema';

import db from '@/lib/drizzle';
import {
	generateSessionToken,
	getCurrentSession,
	invalidateSession,
} from '@/lib/session';

import { createSession } from '@/lib/session';
import { setSessionTokenCookie } from '@/lib/cookies';
import { hashPassword, verifyPassword } from '@/lib/hash';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function signin({
	email,
	password,
}: {
	email: string;
	password: string;
}) {
	const { data: result, error } = z
		.object({
			email: z.string().email(),
			password: z.string().min(8),
		})
		.safeParse({
			email,
			password,
		});

	if (error) throw Error(error.message);

	const user = await db.query.user.findFirst({
		where: eq(schema.user.email, result.email),
	});
	if (!user) throw Error('Email tidak ditemukan');

	const valid = await verifyPassword(user.password, result.password);
	if (!valid) throw Error('Password tidak valid');

	const token = generateSessionToken();
	const session = await createSession(token, user.user_id);
	await setSessionTokenCookie(token, session.expires_at);

	redirect('/');
}

export async function signup({
	nama,
	email,
	password,
	jurusan_id,
}: {
	nama: string;
	email: string;
	password: string;
	jurusan_id: number;
}) {
	const { data: result, error } = z
		.object({
			nama: z.string().min(3),
			email: z.string().email(),
			password: z.string().min(8),
			jurusan_id: z.coerce.number(),
		})
		.safeParse({
			nama,
			email,
			password,
			jurusan_id,
		});

	if (error) throw Error(error.message);

	const jurusan = await db.query.jurusan.findFirst({
		where: eq(schema.jurusan.jurusan_id, result.jurusan_id),
	});
	if (!jurusan) throw Error('Fakultas tidak ditemukan');

	const duplicate = await db.query.user.findFirst({
		where: eq(schema.user.email, result.email),
	});
	if (duplicate) throw Error('Email sudah digunakan');

	const hashed = await hashPassword(result.password);
	const [user] = await db
		.insert(schema.user)
		.values({
			nama: result.nama,
			email: result.email,
			password: hashed,
			jurusan_id: result.jurusan_id,
			role: 'user',
		})
		.returning();

	if (!user) throw Error('Gagal mendaftar');

	const token = generateSessionToken();
	const session = await createSession(token, user.user_id);
	await setSessionTokenCookie(token, session.expires_at);

	redirect('/');
}

export async function signout() {
	const { session } = await getCurrentSession();
	if (!session) throw Error('Gagal logout');

	await invalidateSession(session.session_id);
	redirect('/');
}
