'use client';

import * as React from 'react';
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
	VisibilityState,
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { DataTableViewOptions } from '@/components/tables/column-toggle';
import { DataTablePagination } from './pagination';
import { ReactNode } from 'react';

interface DataTableProps<TData, TValue> {
	data: TData[];
	children?: ReactNode;
	columns: ColumnDef<TData, TValue>[];
}

export function DataTable<TData, TValue>({
	data,
	columns,
	children,
}: DataTableProps<TData, TValue>) {
	const [visible, setVisible] = React.useState<VisibilityState>({
		semester: false,
		ekonomi_mendukung: false,
		penghasilan_cukup: false,
		tujuan_jangka_panjang: false,
		penghasilan_tambahan: false,
		meningkatkan_kekayaan: false,
		literasi_keuangan: false,
		kemudahan_platform: false,
		keuntungan: false,
		risiko: false,
		tahu_investasi: false,
		sudah_investasi: false,
		penghasilan_sendiri: false,
	});

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onColumnVisibilityChange: setVisible,
		state: {
			columnVisibility: visible,
		},
	});

	return (
		<div>
			<div className='grid gap-6'>
				<div className='flex items-center justify-between'>
					{children}
					<DataTableViewOptions table={table} />
				</div>

				<div className='w-full overflow-x-auto'>
					<div className='border rounded-md bg-card'>
						<Table>
							<TableHeader>
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header) => {
											return (
												<TableHead
													key={header.id}
													className='whitespace-nowrap'>
													{header.isPlaceholder
														? null
														: flexRender(
																header.column.columnDef.header,
																header.getContext()
														  )}
												</TableHead>
											);
										})}
									</TableRow>
								))}
							</TableHeader>
							<TableBody>
								{table.getRowModel().rows?.length ? (
									table.getRowModel().rows.map((row) => (
										<TableRow
											key={row.id}
											data-state={row.getIsSelected() && 'selected'}>
											{row.getVisibleCells().map((cell) => (
												<TableCell key={cell.id} className='whitespace-nowrap'>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext()
													)}
												</TableCell>
											))}
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell
											colSpan={columns.length}
											className='h-24 text-center'>
											No results.
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</div>
				</div>

				<DataTablePagination table={table} />
			</div>
		</div>
	);
}
