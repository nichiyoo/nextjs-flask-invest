import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getCurrentSession } from '@/lib/session';
import { ProfileButton } from '@/components/auth/profile-button';

export const AuthButton = async () => {
	const { user } = await getCurrentSession();

	if (user !== null) {
		return <ProfileButton user={user} />;
	} else {
		return (
			<Link href='/auth/login'>
				<Button>Sign In</Button>
			</Link>
		);
	}
};
