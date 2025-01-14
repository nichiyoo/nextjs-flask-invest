'use client';

import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { sections } from '@/lib/constant';
import { useToast } from '@/hooks/use-toast';
import { FormValues, formSchema } from '@/lib/schema';

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

export const PredictionForm: React.FC = () => {
	const { toast } = useToast();
	const [loading, setLoading] = React.useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			usia: 0,
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
		},
	});

	React.useEffect(() => {
		if (process.env.NODE_ENV === 'development') {
			form.setValue('usia', 25);
			form.setValue('jenis_kelamin', 'male');
			form.setValue('uang_bulanan', 5000000);
			form.setValue('ekonomi_mendukung', '5');
			form.setValue('penghasilan_cukup', '4');
			form.setValue('tujuan_jangka_panjang', '4');
			form.setValue('penghasilan_tambahan', '5');
			form.setValue('meningkatkan_kekayaan', '3');
			form.setValue('literasi_keuangan', '4');
			form.setValue('kemudahan_platform', '3');
			form.setValue('keuntungan', '5');
			form.setValue('risiko', '5');
			form.setValue('tahu_investasi', 'yes');
			form.setValue('sudah_investasi', 'yes');
		}
	}, [form]);

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
		} catch (error: any) {
			toast({
				title: 'Error',
				description: error.message,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='grid gap-6'>
					{sections.map((section) => (
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
													{item.options ? (
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