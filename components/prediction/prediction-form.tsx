'use client';

import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useToast } from '@/hooks/use-toast';
import { FormValues, surveySchema, survey as survey } from '@/lib/survey';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { ButtonGroup } from '@/components/group';
import { predict } from '@/actions/prediction';
import { Fakultas, Jurusan, User } from '@/database/schema';

interface PredictionFormProps {
	user: User & {
		jurusan:
			| null
			| (Jurusan & {
					fakultas: Fakultas;
			  });
	};
}

export const PredictionForm: React.FC<PredictionFormProps> = ({ user }) => {
	const { toast } = useToast();
	const [loading, setLoading] = React.useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(surveySchema),
		defaultValues: {
			usia: 0,
			semester: 1,
			jenis_kelamin: undefined,
			uang_bulanan: 0,
			ekonomi_mendukung: undefined,
			penghasilan_cukup: undefined,
			tujuan_jangka_panjang: undefined,
			penghasilan_tambahan: undefined,
			meningkatkan_kekayaan: undefined,
			literasi_keuangan: undefined,
			kemudahan_platform: undefined,
			keuntungan: undefined,
			risiko: undefined,
			tahu_investasi: undefined,
			sudah_investasi: undefined,
			penghasilan_sendiri: undefined,
		},
	});

	const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		form.reset();
		toast({
			title: 'Form sudah di reset',
			description:
				'Isi formulir lagi untuk membuat prediksi minat berinvestasi di pasar modal',
		});
	};

	const onSubmit = async (data: FormValues) => {
		try {
			setLoading(true);
			await predict(data);
			toast({
				title: 'Berhasil',
				description: 'Prediksi minat berinvestasi  sudah dikirimkan',
			});
		} catch (error) {
			toast({
				title: 'Error',
				description: (error as Error).message,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='grid gap-6'>
					<Card className='bg-card'>
						<CardHeader>
							<CardTitle>Demografi</CardTitle>
						</CardHeader>
						<CardContent className='grid gap-6'>
							<FormItem>
								<FormLabel>Nama Lengkap</FormLabel>
								<Input defaultValue={user.nama} readOnly disabled />
							</FormItem>

							<FormItem>
								<FormLabel>NIM</FormLabel>
								<Input defaultValue={user.nim} readOnly disabled />
							</FormItem>

							{user.jurusan && (
								<React.Fragment>
									<FormItem>
										<FormLabel>Fakultas</FormLabel>
										<Input
											defaultValue={user.jurusan.fakultas.nama}
											readOnly
											disabled
										/>
									</FormItem>

									<FormItem>
										<FormLabel>Jurusan</FormLabel>
										<Input defaultValue={user.jurusan.nama} readOnly disabled />
									</FormItem>
								</React.Fragment>
							)}

							<FormField
								control={form.control}
								name='jenis_kelamin'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Jenis Kelamin</FormLabel>
										<FormControl>
											<RadioGroup onValueChange={field.onChange}>
												<FormItem>
													<FormControl>
														<RadioGroupItem
															value='male'
															checked={field.value === 'male'}
														/>
													</FormControl>
													<FormLabel className='ml-2 text-muted-foreground'>
														Laki-laki
													</FormLabel>
												</FormItem>
												<FormItem>
													<FormControl>
														<RadioGroupItem
															value='female'
															checked={field.value === 'female'}
														/>
													</FormControl>
													<FormLabel className='ml-2 text-muted-foreground'>
														Perempuan
													</FormLabel>
												</FormItem>
											</RadioGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='semester'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Semester</FormLabel>
										<FormControl>
											<Input
												type='number'
												placeholder='Masukkan semester perkuliahan'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name='usia'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Usia</FormLabel>
										<FormControl>
											<Input
												type='number'
												placeholder='Masukkan Usia'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>

					{survey.slice(1).map((section) => (
						<Card key={section.title} className='bg-card'>
							<CardHeader>
								<CardTitle>{section.title}</CardTitle>
							</CardHeader>
							<CardContent className='grid gap-6'>
								{section.fields.map((item) => (
									<FormField
										key={item.name}
										control={form.control}
										name={item.name as keyof FormValues}
										render={({ field }) => (
											<FormItem>
												<FormLabel>{item.label}</FormLabel>
												<FormControl>
													{item.type === 'radio' ? (
														<RadioGroup onValueChange={field.onChange}>
															{item.options.map((option, index) => (
																<FormItem key={index}>
																	<FormControl>
																		<RadioGroupItem
																			value={option.value}
																			checked={field.value === option.value}
																		/>
																	</FormControl>
																	<FormLabel className='ml-2 text-muted-foreground'>
																		{option.label}
																	</FormLabel>
																</FormItem>
															))}
														</RadioGroup>
													) : (
														<Input {...field} type='number' />
													)}
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								))}
							</CardContent>
						</Card>
					))}

					<ButtonGroup>
						<Button type='submit' disabled={loading}>
							{loading && <Loader2 className='animate-spin' />}
							<span>Prediksi Minat</span>
						</Button>
						<Button variant='secondary' type='reset' onClick={handleReset}>
							Reset Form
						</Button>
					</ButtonGroup>
				</div>
			</form>
		</Form>
	);
};
