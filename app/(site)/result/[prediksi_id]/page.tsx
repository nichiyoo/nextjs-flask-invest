import * as z from 'zod';
import * as React from 'react';
import { and, eq } from 'drizzle-orm';
import { notFound, redirect } from 'next/navigation';

import db from '@/lib/drizzle';
import * as schema from '@/database/schema';
import { getCurrentSession } from '@/lib/session';
import { Header, HeaderSubtitle } from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs } from '@/components/ui/tabs';
import { getDocumentArray } from '@/lib/markdown';
import { ResultMaybe, ResultNo, ResultYes } from '@/components/results';
import {
	CustomContent,
	CustomList,
	CustomTrigger,
} from '@/components/custom-tab';
import { calculateScore, getProfile as getRisk } from '@/lib/calculate';

interface PageProps {
	params: {
		param: string;
	};
}

const paramSchema = z.object({
	prediksi_id: z.coerce.number(),
});

export default async function Page({
	params,
}: PageProps): Promise<React.JSX.Element> {
	const { user } = await getCurrentSession();
	if (!user) return redirect('/auth/login');

	const { data: result, success } = paramSchema.safeParse(params);
	if (!success) return redirect('/');

	const filter = {
		admin: eq(schema.prediksi.prediksi_id, result.prediksi_id),
		user: and(
			eq(schema.prediksi.prediksi_id, result.prediksi_id),
			eq(schema.prediksi.user_id, user.user_id)
		),
	};

	const prediksi = await db.query.prediksi.findFirst({
		where: filter[user.role],
	});
	if (!prediksi) notFound();

	const mapper = {
		no: 'Tidak Berminat',
		yes: 'Berminat',
		maybe: 'Mungkin Berminat',
	};

	const score = calculateScore(prediksi);
	const risk = getRisk(score);
	const docs = await getDocumentArray();

	const filtered = docs.filter((doc) => doc.risk.includes(risk));
	const [first] = filtered;

	const description = {
		no: <ResultNo />,
		yes: <ResultYes result={prediksi} risk={risk} />,
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
								{mapper[prediksi.tertarik_investasi]}
							</span>
							untuk berinvestasi di pasar modal Reksa Dana
						</HeaderSubtitle>

						<div className='max-w-none prose dark:prose-invert text-muted-foreground'>
							{description[prediksi.tertarik_investasi]}
						</div>
					</Header>
				</CardContent>
			</Card>

			{prediksi.tertarik_investasi === 'yes' && (
				<Tabs defaultValue={first.value} className='grid gap-6'>
					<CustomList>
						{filtered.map((item) => (
							<CustomTrigger key={item.value} value={item.value}>
								{item.label}
							</CustomTrigger>
						))}
					</CustomList>

					{filtered.map((item) => (
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
