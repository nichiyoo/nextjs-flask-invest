'use client';

import * as React from 'react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='outline'>
					<Sun className='rotate-0 block transition-all dark:-rotate-90 dark:hidden' />
					<Moon className='rotate-90 hidden transition-all dark:rotate-0 dark:block' />
					<span>Tema</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					Gelap
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('light')}>
					Terang
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
					Sistem
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
