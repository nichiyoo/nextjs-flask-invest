import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Book, Code, Menu, User } from 'lucide-react';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Logo from './logo';
import { ThemeToggle } from './theme-toggle';
import { cn } from '@/lib/utils';

type Menu = {
	title: string;
	href: string;
	target?: string;
	rel?: string;
	submenu?: Array<
		Menu & {
			description: string;
			icon: React.ReactNode;
		}
	>;
};

const menus: Array<Menu> = [
	{
		title: 'Beranda',
		href: '/',
	},
	{
		title: 'Prediksi',
		href: '/prediction',
	},
	{
		title: 'Publikasi',
		href: '/about',
		submenu: [
			{
				title: 'Ringkasan Penelitian',
				description: 'Informasi mengenai penelitian dan latar belakang proyek',
				icon: <User className='size-5 shrink-0' />,
				href: '/about',
			},
			{
				title: 'Publikasi Penelitian',
				description: 'Publikasi penelitian terkait dengan proyek',
				icon: <Book className='size-5 shrink-0' />,
				href: 'https://www.researchgate.net',
				target: '_blank',
				rel: 'noopener noreferrer',
			},
			{
				title: 'Publikasi Kode',
				description: 'Publikasi kode sumber terkait dengan proyek',
				icon: <Code className='size-5 shrink-0' />,
				href: 'https://github.com',
				target: '_blank',
				rel: 'noopener noreferrer',
			},
		],
	},
];

const Navbar1 = () => {
	return (
		<div className='py-2'>
			<nav className='hidden justify-between lg:flex items-center'>
				<Logo />
				<NavigationMenu>
					<NavigationMenuList>
						{menus.map((menu) => {
							if (menu.submenu) {
								return (
									<NavigationMenuItem key={menu.title} className='text-muted-foreground'>
										<NavigationMenuTrigger>
											<span>{menu.title}</span>
										</NavigationMenuTrigger>
										<NavigationMenuContent>
											<ul className='w-80 p-3'>
												{menu.submenu.map((item, idx) => (
													<li key={idx}>
														<Link
															href={item.href}
															target={item.target}
															rel={item.rel}
															className={cn(
																'flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
															)}>
															{item.icon}
															<div>
																<div className='text-sm font-semibold'>{item.title}</div>
																<p className='text-sm leading-snug text-muted-foreground'>{item.description}</p>
															</div>
														</Link>
													</li>
												))}
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>
								);
							}

							return (
								<NavigationMenuItem key={menu.title} className='text-muted-foreground'>
									<Link href={menu.href} legacyBehavior passHref>
										<NavigationMenuLink className={navigationMenuTriggerStyle()}>{menu.title}</NavigationMenuLink>
									</Link>
								</NavigationMenuItem>
							);
						})}
						<ThemeToggle />
					</NavigationMenuList>
				</NavigationMenu>
			</nav>

			<div className='block lg:hidden'>
				<div className='flex items-center justify-between'>
					<Logo />
					<Sheet>
						<SheetTrigger asChild>
							<Button variant={'outline'} size={'icon'}>
								<Menu className='size-4' />
							</Button>
						</SheetTrigger>
						<SheetContent className='overflow-y-auto'>
							<SheetHeader>
								<SheetTitle>
									<Logo />
								</SheetTitle>
							</SheetHeader>
							<div className='my-8 flex flex-col gap-4'>
								{menus.map((menu) => {
									if (menu.submenu) {
										return (
											<Accordion type='single' collapsible className='w-full' defaultChecked={true} key={menu.title}>
												<AccordionItem value={menu.title} className='border-b-0'>
													<AccordionTrigger className='mb-4 py-0 font-semibold hover:no-underline'>
														{menu.title}
													</AccordionTrigger>
													<AccordionContent className='mt-2'>
														{menu.submenu.map((item, idx) => (
															<Link
																key={idx}
																href={item.href}
																target={item.target}
																rel={item.rel}
																className={cn(
																	'flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
																)}>
																{item.icon}
																<div>
																	<div className='text-sm font-semibold'>{item.title}</div>
																	<p className='text-sm leading-snug text-muted-foreground'>{item.description}</p>
																</div>
															</Link>
														))}
													</AccordionContent>
												</AccordionItem>
											</Accordion>
										);
									}
									return (
										<Link href={menu.href} className='font-semibold' key={menu.title}>
											{menu.title}
										</Link>
									);
								})}
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</div>
	);
};

export default Navbar1;
