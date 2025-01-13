import * as React from 'react';

import { Logo } from '@/components/logo';
import { Loader2 } from 'lucide-react';

export default async function Loading(): Promise<React.JSX.Element> {
	return (
		<div className='w-screen h-screen flex items-center justify-center'>
			<div className='flex flex-col gap-1 items-center justify-center'>
				<Logo />
				<Loader2 className='animate-spin text-primary' />
			</div>
		</div>
	);
}
