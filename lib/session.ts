import * as React from 'react';
import { cookies } from 'next/headers';

import { eq } from 'drizzle-orm';
import { sha256 } from '@oslojs/crypto/sha2';
import {
	encodeHexLowerCase,
	encodeBase32LowerCaseNoPadding,
} from '@oslojs/encoding';

import db from '@/lib/drizzle';
import * as schema from '@/database/schema';
import type { User, Session } from '@/database/schema';

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export async function createSession(
	token: string,
	user_id: number
): Promise<Session> {
	const encoded = new TextEncoder().encode(token);
	const hashed = sha256(encoded);
	const session_id = encodeHexLowerCase(hashed);
	const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

	const session: Session = {
		session_id,
		user_id,
		expires_at: expires,
	};

	await db.insert(schema.session).values(session);
	return session;
}

export async function validateSessionToken(
	token: string
): Promise<ValidatedSession> {
	const encoded = new TextEncoder().encode(token);
	const hashed = sha256(encoded);
	const session_id = encodeHexLowerCase(hashed);

	const result = await db
		.select()
		.from(schema.session)
		.innerJoin(schema.user, eq(schema.session.user_id, schema.user.user_id))
		.where(eq(schema.session.session_id, session_id));

	if (result.length < 1) {
		return {
			session: null,
			user: null,
		};
	}

	const { user, session } = result[0];
	const current = Date.now();
	const expires = session.expires_at.getTime();

	if (current >= expires) {
		await db
			.delete(schema.session)
			.where(eq(schema.session.session_id, session.session_id));

		return {
			session: null,
			user: null,
		};
	}

	if (current >= expires - 1000 * 60 * 60 * 24 * 15) {
		session.expires_at = new Date(current + 1000 * 60 * 60 * 24 * 30);

		await db
			.update(schema.session)
			.set({
				expires_at: session.expires_at,
			})
			.where(eq(schema.session.session_id, session.session_id));
	}

	return { session, user };
}

export async function invalidateSession(session_id: string) {
	await db
		.delete(schema.session)
		.where(eq(schema.session.session_id, session_id));
}

export const getCurrentSession = React.cache(
	async (): Promise<ValidatedSession> => {
		const store = cookies();
		const token = store.get('session')?.value ?? null;

		if (token === null) {
			return {
				session: null,
				user: null,
			};
		}

		const result = await validateSessionToken(token);
		return result;
	}
);

type SuccessSession = {
	session: Session;
	user: User;
};

type FailureSession = {
	session: null;
	user: null;
};

export type ValidatedSession = SuccessSession | FailureSession;
