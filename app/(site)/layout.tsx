import * as React from 'react';

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/landing/landing-navbar';

interface LayoutProps extends React.PropsWithChildren {
	//
}

export default async function Layout({
	children,
}: LayoutProps): Promise<React.JSX.Element> {
	return (
		<div className='container max-w-6xl'>
			<Navbar />
			<main className='py-20 min-h-content'>{children}</main>
			<Footer />
		</div>
	);
}
