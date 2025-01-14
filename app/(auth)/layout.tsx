import * as React from 'react';
import { redirect } from 'next/navigation';

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/landing/landing-navbar';
import { getCurrentSession } from '@/lib/session';

export default async function Layout({
	children,
}: React.PropsWithChildren): Promise<React.JSX.Element> {
	const { user } = await getCurrentSession();
	if (user !== null) return redirect('/');

	return (
		<div className='container max-w-6xl'>
			<Navbar />
			<main className='flex flex-col items-center justify-center min-h-content'>
				{children}
			</main>
			<Footer />
		</div>
	);
}
