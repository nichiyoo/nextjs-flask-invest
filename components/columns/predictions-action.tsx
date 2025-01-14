import { Row } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import useConfirm from '@/hooks/use-confirm';
import { useToast } from '@/hooks/use-toast';
import { Prediksi } from '@/database/schema';
import { remove } from '@/actions/prediction';

interface TableActionsProps {
	row: Row<Prediksi>;
}

export const PredictionAction: React.FC<TableActionsProps> = ({ row }) => {
	const prediksi = row.original;
	const { toast } = useToast();
	const { confirm } = useConfirm();

	const handleDelete = async () => {
		confirm({
			title: 'Hapus prediksi',
			variant: 'destructive',
			description: `Apakah anda yakin ingin menghapus prediksi ini?
      Tindakan ini tidak dapat dibatalkan, dan semua data akan dihapus secara permanen.`,
		})
			.then(async () => {
				try {
					await remove(prediksi.prediksi_id);
					toast({
						title: 'Success',
						description: 'Prediksi berhasil dihapus.',
					});
				} catch (error: any) {
					toast({
						title: 'Gagal menghapus prediksi',
						description: error.message,
					});
				}
			})
			.catch(() => {
				// do nothing
			});
	};

	return (
		<div className='flex items-center gap-2'>
			<Button
				size='icon'
				variant='secondary'
				onClick={handleDelete}
				className='hover:bg-destructive hover:text-background dark:hover:text-foreground'>
				<Trash2 className='w-4 h-4' />
			</Button>
		</div>
	);
};
