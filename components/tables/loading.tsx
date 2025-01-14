import * as React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const TableLoading: React.FC = () => {
	return (
		<div className='grid gap-6'>
			<div className='flex items-center justify-between'>
				<Skeleton className='w-40 h-10' />
				<Skeleton className='w-40 h-10' />
			</div>
			<Skeleton className='w-full h-96' />
			<div className='flex items-center justify-between'>
				<Skeleton className='w-40 h-10' />
				<Skeleton className='w-40 h-10' />
			</div>
		</div>
	);
};
