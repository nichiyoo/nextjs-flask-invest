import Link from 'next/link';

import { Logo } from '@/components/logo';

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

import { menus } from '@/lib/constant';
import { Button } from '@/components/ui/button';
import { Aside } from '@/components/landing/landing-aside';
import { Submenu } from '@/components/landing/landing-submenu';
import { AuthButton } from '@/components/auth/auth-button';
import { getCurrentSession } from '@/lib/session';

export const Navbar = async () => {
	const { user } = await getCurrentSession();

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

						{user && (
							<NavigationMenuItem>
								<Link href='/dashboard'>
									<Button variant='ghost'>Dashboard</Button>
								</Link>
							</NavigationMenuItem>
						)}

						<AuthButton />
					</NavigationMenuList>
				</NavigationMenu>
			</nav>
			<Aside />
		</div>
	);
};
