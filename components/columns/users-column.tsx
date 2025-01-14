'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { formatInitial } from '@/lib/utils';
import { Fakultas, Jurusan, User } from '@/database/schema';
import { DataTableColumnHeader } from '@/components/tables/column-header';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { UserAction } from '@/components/columns/users-action';

type TableData = User & {
	jurusan:
		| null
		| (Jurusan & {
				fakultas: Fakultas;
		  });
};

export const columns: ColumnDef<TableData>[] = [
	{
		accessorKey: 'user_id',
		header: ({ column }) => <DataTableColumnHeader column={column} title='ID' />,
	},
	{
		accessorKey: 'nama',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Nama' />,
		cell: ({ row }) => {
			return (
				<div className='flex items-center gap-4'>
					<Avatar>
						<AvatarFallback>{formatInitial(row.original.nama)}</AvatarFallback>
					</Avatar>
					<div className='flex flex-col'>
						<span>{row.original.nama}</span>
						<span className='text-xs text-muted-foreground'>{row.original.email}</span>
					</div>
				</div>
			);
		},
	},
	{
		id: 'Jurusan',
		accessorKey: 'jurusan.nama',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Jurusan' />,
	},
	{
		id: 'fakultas',
		accessorKey: 'jurusan.fakultas.nama',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Fakultas' />,
		cell: ({ row }) => <Badge>{row.original.jurusan?.fakultas.nama}</Badge>,
	},
	{
		accessorKey: 'role',
		header: ({ column }) => <DataTableColumnHeader column={column} title='Role' />,
		cell: ({ row }) => {
			return <Badge variant={row.original.role === 'admin' ? 'default' : 'secondary'}>{row.original.role}</Badge>;
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			return <UserAction row={row} />;
		},
	},
];
