import Link from 'next/link';

import Logo from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

import { menus } from '@/lib/constant';
import { Aside } from '@/components/navbar/aside';
import { Submenu } from '@/components/navbar/submenu';
import { Button } from '../ui/button';

const Navbar = () => {
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
					</NavigationMenuList>
				</NavigationMenu>
			</nav>
			<Aside />
		</div>
	);
};

export default Navbar;
