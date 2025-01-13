import * as React from 'react';

import Link from 'next/link';
import { Menu } from '@/lib/type';
import { LucideIcon } from 'lucide-react';

interface SubmenuProps {
	submenu: Array<
		Menu & {
			description: string;
			icon: LucideIcon;
		}
	>;
}

export const Submenu: React.FC<SubmenuProps> = ({ submenu }) => {
	return (
		<div className='grid gap-2'>
			{submenu.map((item, idx) => {
				const Icon = item.icon;
				return (
					<Link
						key={idx}
						rel={item.rel}
						href={item.href}
						target={item.target}
						className='flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'>
						<Icon className='shrink-0' />
						<div>
							<div className='text-sm font-semibold'>{item.title}</div>
							<p className='text-sm leading-snug text-muted-foreground'>
								{item.description}
							</p>
						</div>
					</Link>
				);
			})}
		</div>
	);
};
