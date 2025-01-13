'use client';

import * as z from 'zod';
import Link from 'next/link';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { signup } from '@/actions/auth';
import { Fakultas, Jurusan } from '@/database/schema';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const schema = z.object({
	nama: z.string().min(3),
	email: z.string().email(),
	password: z.string().min(8),
	jurusan_id: z.coerce.number(),
});

type RegisterType = z.infer<typeof schema>;

interface RegisterFormProps {
	listJurusan: Array<
		Jurusan & {
			fakultas: Fakultas;
		}
	>;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ listJurusan }) => {
	const { toast } = useToast();

	const form = useForm<RegisterType>({
		resolver: zodResolver(schema),
		defaultValues: {
			nama: '',
			email: '',
			password: '',
			jurusan_id: undefined,
		},
	});

	const onSubmit = async (data: RegisterType) => {
		try {
			await signup({ ...data });
			toast({
				title: 'Berhasil mendaftar',
				description: 'Anda telah berhasil mendaftar.',
			});
		} catch (error: any) {
			toast({
				title: 'Gagal mendaftar',
				description: error.message,
			});
		}
	};

	return (
		<div className='grid gap-6'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
					<FormField
						control={form.control}
						name='nama'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nama</FormLabel>
								<FormControl>
									<Input placeholder='Masukkan nama' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder='Masukkan email' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder='Masukkan password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='jurusan_id'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Jurusan</FormLabel>
								<Select onValueChange={field.onChange}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Pilih Jurusan' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{listJurusan.map((item) => (
											<SelectItem
												key={item.jurusan_id}
												value={item.jurusan_id.toString()}>
												{item.nama}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button type='submit'>Daftar</Button>
				</form>
			</Form>

			<div className='flex items-center gap-4 text-sm text-muted-foreground'>
				<div className='w-full border-b'></div>
				<span className='whitespace-nowrap'>Sudah punya akun?</span>
				<div className='w-full border-b'></div>
			</div>

			<Link href='/auth/login'>
				<Button className='w-full' variant='outline'>
					Masuk
				</Button>
			</Link>
		</div>
	);
};
