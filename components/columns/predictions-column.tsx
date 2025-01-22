'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatInitial } from '@/lib/utils';
import { Jurusan, Prediksi, User } from '@/database/schema';
import { DataTableColumnHeader } from '@/components/tables/column-header';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PredictionAction } from '@/components/columns/predictions-action';
import { PredictionView } from './predictions-view';

type TableData = Prediksi & {
	user: User & {
		jurusan: null | Jurusan;
	};
};

export const common: ColumnDef<TableData>[] = [
	{
		accessorKey: 'prediksi_id',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='ID' />
		),
	},
	{
		accessorKey: 'user.nama',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Nama' />
		),
		cell: ({ row }) => {
			return (
				<div className='flex items-center gap-4'>
					<Avatar>
						<AvatarFallback>
							{formatInitial(row.original.user.nama)}
						</AvatarFallback>
					</Avatar>
					<div className='flex flex-col'>
						<span>{row.original.user.nama}</span>
						<span className='text-xs text-muted-foreground'>
							{row.original.user.email}
						</span>
					</div>
				</div>
			);
		},
	},
	{
		id: 'Jurusan',
		accessorKey: 'user.jurusan.nama',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Jurusan' />
		),
	},
	{
		accessorKey: 'usia',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Usia' />
		),
	},
	{
		accessorKey: 'semester',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Semester' />
		),
	},
	{
		accessorKey: 'jenis_kelamin',
		header: 'Jenis Kelamin',
		cell: ({ row }) => (
			<Badge>
				{row.original.jenis_kelamin === 'male' ? 'Laki-laki' : 'Perempuan'}
			</Badge>
		),
	},
	{
		accessorKey: 'uang_bulanan',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Uang Bulanan' />
		),
		cell: ({ row }) => formatCurrency(row.original.uang_bulanan),
	},
	{
		accessorKey: 'penghasilan_sendiri',
		header: 'Penghasilan Sendiri',
		cell: ({ row }) => (
			<Badge>{mapper[row.original.penghasilan_sendiri]}</Badge>
		),
	},
	{
		accessorKey: 'ekonomi_mendukung',
		header: 'Ekonomi Mendukung',
	},
	{
		accessorKey: 'penghasilan_cukup',
		header: 'Penghasilan Cukup',
	},
	{
		accessorKey: 'tujuan_jangka_panjang',
		header: 'Tujuan Jangka Panjang',
	},
	{
		accessorKey: 'penghasilan_tambahan',
		header: 'Penghasilan Tambahan',
	},
	{
		accessorKey: 'meningkatkan_kekayaan',
		header: 'Meningkatkan Kekayaan',
	},
	{
		accessorKey: 'literasi_keuangan',
		header: 'Literasi Keuangan',
	},
	{
		accessorKey: 'kemudahan_platform',
		header: 'Kemudahan Platform',
	},
	{
		accessorKey: 'keuntungan',
		header: 'Keuntungan',
	},
	{
		accessorKey: 'risiko',
		header: 'Risiko',
	},
	{
		accessorKey: 'tahu_investasi',
		header: 'Tahu Investasi',
		cell: ({ row }) => <Badge>{mapper[row.original.tahu_investasi]}</Badge>,
	},
	{
		accessorKey: 'sudah_investasi',
		header: 'Sudah Investasi',
		cell: ({ row }) => <Badge>{mapper[row.original.sudah_investasi]}</Badge>,
	},
	{
		accessorKey: 'tertarik_investasi',
		header: 'Tertarik Investasi',
		cell: ({ row }) => <Badge>{mapper[row.original.tertarik_investasi]}</Badge>,
	},
];

export const user: ColumnDef<TableData>[] = [
	...common,
	{
		id: 'view',
		cell: ({ row }) => {
			return (
				<div className='flex items-center gap-2'>
					<PredictionView row={row} />
				</div>
			);
		},
	},
];

export const admin: ColumnDef<TableData>[] = [
	...common,
	{
		id: 'actions',
		cell: ({ row }) => {
			return (
				<div className='flex items-center gap-2'>
					<PredictionView row={row} />
					<PredictionAction row={row} />
				</div>
			);
		},
	},
];

const mapper = {
	yes: 'Ya',
	maybe: 'Mungkin',
	no: 'Tidak',
};
