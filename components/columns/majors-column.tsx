'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Fakultas, Jurusan } from '@/database/schema';
import { DataTableColumnHeader } from '@/components/tables/column-header';
import { Badge } from '@/components/ui/badge';

type TableData = Jurusan & {
	fakultas: Fakultas;
};

export const columns: ColumnDef<TableData>[] = [
	{
		accessorKey: 'jurusan_id',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='ID' />
		),
	},
	{
		accessorKey: 'nama',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Nama' />
		),
	},
	{
		id: 'fakultas',
		accessorKey: 'fakultas.nama',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Fakultas' />
		),
		cell: ({ row }) => <Badge>{row.original.fakultas.nama}</Badge>,
	},
];
