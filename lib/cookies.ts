import { cookies } from 'next/headers';

export async function setSessionTokenCookie(
	token: string,
	expires_at: Date
): Promise<void> {
	const store = cookies();

	store.set('session', token, {
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		expires: expires_at,
		path: '/',
	});
}

export async function deleteSessionTokenCookie(): Promise<void> {
	const store = cookies();

	store.set('session', '', {
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 0,
		path: '/',
	});
}
