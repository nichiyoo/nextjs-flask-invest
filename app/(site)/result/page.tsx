import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

import db from '@/lib/drizzle';
import * as schema from '@/database/schema';

import { getCurrentSession } from '@/lib/session';
import { formatInvestmentOutput } from '@/lib/utils';
import { Header, HeaderDescription, HeaderTitle } from '@/components/header';

export default async function Page() {
	const { user } = await getCurrentSession();
	if (!user) return redirect('/auth/login');

	const result = await db.query.prediksi.findFirst({
		where: eq(schema.prediksi.user_id, user.user_id),
	});
	if (!result) return redirect('/prediction');

	const mapper = {
		no: 'Anda tidak berminat untuk berinvestasi',
		yes: 'Anda mungkin berminat untuk berinvestasi',
		maybe: 'Anda berminat untuk berinvestasi',
	};

	return (
		<div className='grid gap-8'>
			<Header className='py-32 text-center'>
				<HeaderTitle>{mapper[result.tertarik_investasi]}</HeaderTitle>
				<HeaderDescription>{formatInvestmentOutput(result)}</HeaderDescription>
			</Header>
		</div>
	);
}
