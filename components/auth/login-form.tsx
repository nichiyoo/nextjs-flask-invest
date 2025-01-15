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
import { signin } from '@/actions/auth';

const schema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

type LoginType = z.infer<typeof schema>;

export const LoginForm: React.FC = () => {
	const { toast } = useToast();

	const form = useForm<LoginType>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (data: LoginType) => {
		try {
			await signin({ ...data });
			toast({
				title: 'Berhasil masuk',
				description: 'Anda telah berhasil masuk.',
			});
		} catch (error) {
			toast({
				title: 'Gagal masuk ke akun',
				description: (error as Error).message,
			});
		}
	};

	return (
		<div className='grid gap-6'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='grid gap-4'>
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

					<Button type='submit'>Masuk</Button>
				</form>
			</Form>

			<div className='flex items-center gap-4 text-sm text-muted-foreground'>
				<div className='w-full border-b'></div>
				<span className='whitespace-nowrap'>Belum punya akun?</span>
				<div className='w-full border-b'></div>
			</div>

			<Link href='/auth/register'>
				<Button className='w-full' variant='outline'>
					Daftar
				</Button>
			</Link>
		</div>
	);
};
