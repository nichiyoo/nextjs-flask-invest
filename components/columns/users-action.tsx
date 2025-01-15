import { Row } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import useConfirm from '@/hooks/use-confirm';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/database/schema';
import { remove } from '@/actions/user';

interface TableActionsProps {
	row: Row<User>;
}

export const UserAction: React.FC<TableActionsProps> = ({ row }) => {
	const user = row.original;
	const { toast } = useToast();
	const { confirm } = useConfirm();

	const handleDelete = async () => {
		confirm({
			title: 'Hapus pengguna',
			variant: 'destructive',
			description: `Apakah anda yakin ingin menghapus pengguna ini?
      Tindakan ini tidak dapat dibatalkan, dan semua data akan dihapus secara permanen.`,
		})
			.then(async () => {
				try {
					await remove(user.user_id);
					toast({
						title: 'Success',
						description: 'Pengguna berhasil dihapus.',
					});
				} catch (error) {
					toast({
						title: 'Gagal menghapus pengguna',
						description: (error as Error).message,
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
