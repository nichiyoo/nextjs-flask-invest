import { TableLoading } from '@/components/tables/loading';
import { Skeleton } from '@/components/ui/skeleton';
import * as React from 'react';

export default async function Loading(): Promise<React.JSX.Element> {
	return (
		<div className='grid gap-8'>
			<div className='grid gap-6'>
				<Skeleton className='w-2/3 h-12' />

				<div className='grid gap-1'>
					<Skeleton className='w-full h-6' />
					<Skeleton className='w-full h-6' />
				</div>
			</div>

			<TableLoading />
		</div>
	);
}
