import * as React from 'react';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

interface LayoutProps extends React.PropsWithChildren {
	//
}

export default async function Layout({ children }: LayoutProps): Promise<React.JSX.Element> {
	return (
		<div className='container max-w-5xl'>
			<Navbar />
			<main className='py-20 min-h-screen'>{children}</main>
			<Footer />
		</div>
	);
}
