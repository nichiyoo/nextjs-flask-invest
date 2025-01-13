import * as React from 'react';
import { LoginForm } from '@/components/auth/login-form';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

export default async function Page(): Promise<React.JSX.Element> {
	return (
		<Card className='w-full max-w-md'>
			<CardHeader className='text-center'>
				<CardTitle className='text-2xl font-serif font-bold'>
					Masuk Akun
				</CardTitle>
				<CardDescription>
					Masuk dengan akun admin untuk mulai menggunakan sistem
				</CardDescription>
			</CardHeader>
			<CardContent>
				<LoginForm />
			</CardContent>
		</Card>
	);
}
