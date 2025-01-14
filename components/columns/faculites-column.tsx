'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Fakultas } from '@/database/schema';
import { DataTableColumnHeader } from '@/components/tables/column-header';

export const columns: ColumnDef<Fakultas>[] = [
	{
		accessorKey: 'fakultas_id',
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
];
