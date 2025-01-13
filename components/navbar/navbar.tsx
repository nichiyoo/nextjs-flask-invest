import Link from 'next/link';
import * as React from 'react';

import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

import { menus } from '@/lib/constant';
import { Button } from '@/components/ui/button';
import { Aside } from '@/components/navbar/aside';
import { Submenu } from '@/components/navbar/submenu';
import { AuthButton } from '@/components/auth/auth-button';

export const Navbar = () => {
	return (
		<div className='py-6'>
			<nav className='hidden justify-between lg:flex items-center'>
				<Logo />

				<NavigationMenu>
					<NavigationMenuList className='gap-2'>
						{menus.map((menu) => {
							if (menu.submenu) {
								return (
									<NavigationMenuItem key={menu.title}>
										<NavigationMenuTrigger>
											<span>{menu.title}</span>
										</NavigationMenuTrigger>
										<NavigationMenuContent className='min-w-80 p-3'>
											<Submenu submenu={menu.submenu} />
										</NavigationMenuContent>
									</NavigationMenuItem>
								);
							}

							return (
								<NavigationMenuItem key={menu.title}>
									<Link href={menu.href}>
										<Button variant='ghost'>{menu.title}</Button>
									</Link>
								</NavigationMenuItem>
							);
						})}

						<ThemeToggle />

						<React.Suspense fallback={<div>Loading...</div>}>
							<AuthButton />
						</React.Suspense>
					</NavigationMenuList>
				</NavigationMenu>
			</nav>
			<Aside />
		</div>
	);
};
