'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';

import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';

import { menus } from '@/lib/constant';
import { Submenu } from '@/components/navbar/submenu';

interface AsideProps {
	//
}

export const Aside: React.FC<AsideProps> = () => {
	return (
		<div className='flex lg:hidden items-center justify-between'>
			<Logo />

			<Sheet>
				<SheetTrigger asChild>
					<Button variant='outline' size='icon'>
						<Menu />
					</Button>
				</SheetTrigger>

				<SheetContent className='overflow-y-auto'>
					<SheetHeader>
						<SheetTitle>
							<Logo />
						</SheetTitle>
					</SheetHeader>

					<div className='grid gap-4 mt-10'>
						{menus.map((menu) => {
							if (menu.submenu) {
								return (
									<Accordion
										type='multiple'
										key={menu.title}
										defaultValue={[menu.title]}>
										<AccordionItem value={menu.title} className='border-b-0'>
											<AccordionTrigger className='py-0 hover:no-underline'>
												{menu.title}
											</AccordionTrigger>
											<AccordionContent className='py-2'>
												<Submenu submenu={menu.submenu} />
											</AccordionContent>
										</AccordionItem>
									</Accordion>
								);
							} else {
								return (
									<Link href={menu.href} key={menu.title}>
										{menu.title}
									</Link>
								);
							}
						})}
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
};
