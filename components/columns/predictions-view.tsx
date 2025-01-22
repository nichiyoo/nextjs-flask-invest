import { Row } from '@tanstack/react-table';
import { Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Prediksi } from '@/database/schema';
import Link from 'next/link';

interface TableActionsProps {
	row: Row<Prediksi>;
}

export const PredictionView: React.FC<TableActionsProps> = ({ row }) => {
	return (
		<Link href={'/result/' + row.original.prediksi_id}>
			<Button size='icon' variant='secondary'>
				<Eye className='w-4 h-4' />
			</Button>
		</Link>
	);
};
