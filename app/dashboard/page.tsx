import { getCurrentSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function Page() {
	const { user } = await getCurrentSession();
	if (!user) return redirect('/auth/login');

	switch (user?.role) {
		case 'admin':
			return redirect('/dashboard/admin');
		case 'user':
			return redirect('/dashboard/user');
		default:
			return null as never;
	}
}
