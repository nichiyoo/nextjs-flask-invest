'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	const toggleTheme = React.useCallback(() => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	}, [theme, setTheme]);

	return (
		<Button
			size='icon'
			variant='secondary'
			className='flex-none'
			onClick={toggleTheme}>
			<SunIcon className='block dark:hidden' />
			<MoonIcon className='hidden dark:block' />
			<span className='sr-only'>Toggle theme</span>
		</Button>
	);
}
