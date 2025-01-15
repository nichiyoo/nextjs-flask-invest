'use client';

import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useToast } from '@/hooks/use-toast';
import { FormValues, surveySchema, surveySection } from '@/lib/survey';

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
		resolver: zodResolver(surveySchema),
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
					{surveySection.map((section) => (
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
