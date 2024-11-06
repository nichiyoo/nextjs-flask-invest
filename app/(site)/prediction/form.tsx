'use client';

import * as React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FormValues, formSchema } from '@/lib/schema';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { agreements, importances, supports } from '@/lib/constant';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';

const sections = [
	{
		title: 'Demografi',
		fields: [
			{
				name: 'gender',
				label: 'Jenis Kelamin',
				options: [
					{ value: 'male', label: 'Laki-laki' },
					{ value: 'female', label: 'Perempuan' },
				],
			},
			{
				name: 'age',
				label: 'Usia',
				type: 'number',
			},
		],
	},
	{
		title: 'Kondisi Ekonomi',
		fields: [
			{
				name: 'monthlyIncome',
				label: 'Berapa Uang sakumu / Penghasilanmu dalam sebulan ?',
				type: 'number',
			},
			{
				name: 'economicCondition',
				label: 'Kondisi Ekonomi Mendukung untuk Berinvestasi ?',
				options: supports,
			},
			{
				name: 'incomeForInvestment',
				label: 'Penghasilan Cukup untuk Berinvestasi?',
				options: supports,
			},
		],
	},
	{
		title: 'Tujuan Berinvestasi',
		fields: [
			{
				name: 'longTermGoal',
				label: 'Mencapai tujuan finansial jangka panjang',
				options: importances,
			},
			{
				name: 'additionalIncome',
				label: 'Mendapatkan Penghasilan Tambahan',
				options: importances,
			},
			{
				name: 'wealthIncrease',
				label: 'Meningkatkan Kekayaan',
				options: importances,
			},
		],
	},
	{
		title: 'Faktor-Faktor yang Mempengaruhi Keputusan untuk Berinvestasi',
		fields: [
			{
				name: 'financialLiteracy',
				label: 'Literasi Keuangan mendorong Anda untuk berinvestasi',
				options: agreements,
			},
			{
				name: 'platformEaseOfUse',
				label: 'Kemudahan penggunaan platform investasi',
				options: agreements,
			},
			{
				name: 'offeredProfit',
				label: 'Keuntungan yang ditawarkan',
				options: agreements,
			},
			{
				name: 'risk',
				label: 'Risiko yang ditanggung',
				options: agreements,
			},
		],
	},
	{
		title: 'Minat Berinvestasi',
		fields: [
			{
				name: 'investmentKnowledge',
				label: 'Apakah Anda mengetahui apa itu investasi',
				options: [
					{ value: 'yes', label: 'Ya' },
					{ value: 'maybe', label: 'Mungkin' },
					{ value: 'no', label: 'Tidak' },
				],
			},
			{
				name: 'currentlyInvesting',
				label: 'Apakah Anda saat ini telah melakukan investasi ?',
				options: [
					{ value: 'yes', label: 'Ya' },
					{ value: 'no', label: 'Tidak' },
				],
			},
		],
	},
];

const PredictionForm: React.FC = () => {
	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			gender: undefined,
			age: 0,
			monthlyIncome: 0,
			economicCondition: undefined,
			incomeForInvestment: undefined,
			longTermGoal: undefined,
			additionalIncome: undefined,
			wealthIncrease: undefined,
			financialLiteracy: undefined,
			platformEaseOfUse: undefined,
			offeredProfit: undefined,
			risk: undefined,
			investmentKnowledge: undefined,
			currentlyInvesting: undefined,
		},
	});

	React.useEffect(() => {
		if (process.env.NODE_ENV === 'development') {
			form.setValue('gender', 'male');
			form.setValue('age', 25);
			form.setValue('monthlyIncome', 5000000);
			form.setValue('economicCondition', '5');
			form.setValue('incomeForInvestment', '4');
			form.setValue('longTermGoal', '4');
			form.setValue('additionalIncome', '5');
			form.setValue('wealthIncrease', '3');
			form.setValue('financialLiteracy', '4');
			form.setValue('platformEaseOfUse', '3');
			form.setValue('offeredProfit', '5');
			form.setValue('risk', '5');
			form.setValue('investmentKnowledge', 'yes');
			form.setValue('currentlyInvesting', 'yes');
		}
	}, [form]);

	const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		form.reset();
		toast({
			title: 'Form sudah di reset',
			description: 'Isi formulir lagi untuk membuat prediksi minat berinvestasi di pasar modal',
		});
	};

	async function onSubmit(data: FormValues) {
		toast({
			title: 'Berhasil',
			description: 'Prediksi minat berinvestasi di pasar modal sudah dikirimkan',
		});

		const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/predict', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});

		const result = await response.json();
		localStorage.setItem('result', JSON.stringify(result));
		router.push('/result', {
			scroll: true,
		});
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='grid gap-6 items-start mb-6'>
					{sections.map((section, index) => (
						<Card
							key={section.title}
							className='col-span-full motion-preset-fade'
							style={{ '--motion-delay': `${(index + 1) * 100}ms` } as React.CSSProperties}>
							<CardHeader>
								<CardTitle>{section.title}</CardTitle>
							</CardHeader>
							<CardContent className='space-y-6'>
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
														<RadioGroup onValueChange={field.onChange} className='flex space-y-1 flex-col'>
															{item.options.map((option, index) => (
																<FormItem key={index} className='flex items-center space-x-2 space-y-0'>
																	<FormControl>
																		<RadioGroupItem value={option.value} checked={field.value === option.value} />
																	</FormControl>
																	<FormLabel className='font-normal text-sm text-muted-foreground'>
																		{option.label}
																	</FormLabel>
																</FormItem>
															))}
														</RadioGroup>
													) : (
														<Input
															{...field}
															type='number'
															onChange={(e) => field.onChange(parseInt(e.target.value))}
														/>
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
				</div>

				<div
					className='flex gap-2 items-center motion-preset-fade'
					style={{ '--motion-delay': '600ms' } as React.CSSProperties}>
					<Button type='submit'>Prediksi Minat</Button>
					<Button variant='secondary' type='reset' onClick={handleReset}>
						Reset Form
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default PredictionForm;
