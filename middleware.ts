import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest): Promise<NextResponse> {
	if (request.method === 'GET') {
		const response = NextResponse.next();
		const token = request.cookies.get('session')?.value ?? null;

		if (token !== null) {
			response.cookies.set('session', token, {
				httpOnly: true,
				sameSite: 'lax',
				secure: process.env.NODE_ENV === 'production',
				maxAge: 60 * 60 * 24 * 30,
				path: '/',
			});
		}

		return response;
	}

	const headers = {
		origin: request.headers.get('Origin'),
		host: request.headers.get('Host'),
	};

	if (headers.origin === null || headers.host === null) {
		return new NextResponse(null, {
			status: 403,
		});
	}

	let origin: URL;

	try {
		origin = new URL(headers.origin);
	} catch {
		return new NextResponse(null, {
			status: 403,
		});
	}

	if (origin.host !== headers.host) {
		return new NextResponse(null, {
			status: 403,
		});
	}

	return NextResponse.next();
}
