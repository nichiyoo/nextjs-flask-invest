import * as React from 'react';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

import db from '@/lib/drizzle';
import * as schema from '@/database/schema';
import { getCurrentSession } from '@/lib/session';
import { formatInvestmentOutput } from '@/lib/utils';
import { Header, HeaderSubtitle } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getDocumentArray } from '@/lib/markdown';

export default async function Page() {
	const { user } = await getCurrentSession();
	if (!user) return redirect('/auth/login');

	const docs = await getDocumentArray();
	const result = await db.query.prediksi.findFirst({
		where: eq(schema.prediksi.user_id, user.user_id),
	});

	if (!result) return redirect('/prediction');

	const mapper = {
		no: 'Tidak Berminat',
		yes: 'Berminat',
		maybe: 'Mungkin Berminat',
	};

	const description = {
		no: <ResultNo />,
		yes: <ResultYes result={result} />,
		maybe: <ResultMaybe />,
	};

	return (
		<div className='grid gap-8'>
			<Card>
				<CardHeader>
					<CardTitle>
						<span>Hasil Prediksi</span>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Header>
						<HeaderSubtitle>
							Anda
							<span className='text-primary px-1'>
								{mapper[result.tertarik_investasi]}
							</span>
							untuk berinvestasi di pasar modal Reksa Dana
						</HeaderSubtitle>
						<div className='max-w-none prose dark:prose-invert text-muted-foreground'>
							{description['yes']}
						</div>
					</Header>
				</CardContent>
			</Card>

			{result.tertarik_investasi === 'yes' && (
				<Tabs defaultValue='reksadana-pasar-uang' className='grid gap-6'>
					<CustomTab>
						{docs.map((item) => (
							<CustomTrigger key={item.value} value={item.value}>
								{item.label}
							</CustomTrigger>
						))}
					</CustomTab>

					{docs.map((item) => (
						<CustomContent
							key={item.value}
							value={item.value}
							title={item.label}>
							<div dangerouslySetInnerHTML={{ __html: item.description }} />
						</CustomContent>
					))}
				</Tabs>
			)}
		</div>
	);
}

const CustomTab: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<TabsList className='w-full h-auto bg-transparent rounded-none p-0 border-b border-b-muted'>
			{children}
		</TabsList>
	);
};

const CustomTrigger: React.FC<React.PropsWithChildren & { value: string }> = ({
	value,
	children,
}) => {
	return (
		<TabsTrigger
			value={value}
			className='w-full rounded-none border-b border-transparent data-[state=active]:bg-transparent data-[state=active]:border-primary'>
			{children}
		</TabsTrigger>
	);
};

const CustomContent: React.FC<
	React.PropsWithChildren & { value: string; title: string }
> = ({ value, title, children }) => {
	return (
		<TabsContent value={value}>
			<Card>
				<CardHeader>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='max-w-none prose dark:prose-invert text-muted-foreground prose-headings:font-serif'>
						{children}
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	);
};

const ResultYes: React.FC<{ result: schema.Prediksi }> = ({ result }) => {
	return (
		<React.Fragment>
			<p>{formatInvestmentOutput(result)}</p>

			<p>
				Anda memiliki minat yang kuat untuk berinvestasi di Reksa dana. Untuk
				memaksimalkan potensi ini, Anda sebaiknya mempelajari lebih lanjut
				tentang berbagai jenis reksa dana dan memilih produk yang sesuai dengan
				profil risiko Anda.
			</p>
		</React.Fragment>
	);
};

const ResultNo: React.FC = () => {
	return (
		<React.Fragment>
			<p>
				Tidak menjadi masalah jika Anda saat ini tidak tertarik dengan
				berinvestasi di Pasar Modal. Investasi memang bukan untuk semua orang,
				terutama jika belum siap atau belum memahami sepenuhnya risiko yang ada.
			</p>

			<p>
				Sekadar informasi bahwa pasar modal bisa jadi salah satu cara untuk
				membangun kekayaan di masa depan. Jika suatu saat Anda tertarik, banyak
				sumber yang bisa membantu untuk memahami cara kerja pasar modal dan
				potensi manfaat jangka panjang dari investasi.
			</p>
		</React.Fragment>
	);
};

const ResultMaybe: React.FC = () => {
	return (
		<React.Fragment>
			<p>
				Ketertarikan untuk berinvestasi di pasar modal bisa berubah-ubah, dan
				wajar jika Anda merasa ingin tahu lebih banyak sebelum membuat keputusan
				untuk berinvestasi di Pasar Modal. Beberapa cara berikut bisa membantu
				Anda mendapatkan gambaran yang lebih jelas:
			</p>

			<ul>
				<li>
					Pelajari lebih dalam tentang risiko dan manfaat dari investasi di
					pasar modal.
				</li>
				<li>
					Baca lebih banyak tentang berbagai instrumen investasi seperti saham,
					obligasi, dan reksa dana.
				</li>
				<li>
					Cari tahu bagaimana cara memulai investasi dengan bijak dan mengelola
					risiko dengan tepat.
				</li>
			</ul>

			<p>
				Investasi bisa menjadi pilihan yang baik jika Anda memiliki pemahaman
				yang cukup tentang pasar modal. Menambah wawasan akan membantu Anda
				membuat keputusan yang lebih percaya diri dan matang.
			</p>
		</React.Fragment>
	);
};
