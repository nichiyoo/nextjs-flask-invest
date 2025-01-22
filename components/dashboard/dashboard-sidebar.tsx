import * as React from 'react';
import { ChevronRight } from 'lucide-react';

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';

import { Logo } from '@/components/logo';
import Link from 'next/link';
import { Menu } from '@/lib/type';

interface DashboardSidebarProps extends React.ComponentProps<typeof Sidebar> {
	menus: Array<Menu>;
}

export function DashboardSidebar({ menus, ...props }: DashboardSidebarProps) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<div className='flex items-center justify-center h-16'>
					<Logo />
				</div>
			</SidebarHeader>
			<SidebarContent className='gap-0 scrollbar-none'>
				{menus.map((item) => (
					<Collapsible
						defaultOpen
						key={item.title}
						title={item.title}
						className='group/collapsible'>
						<SidebarGroup>
							<SidebarGroupLabel
								asChild
								className='text-sm group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'>
								<CollapsibleTrigger>
									<span>{item.title}</span>
									<ChevronRight className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90' />
								</CollapsibleTrigger>
							</SidebarGroupLabel>
							<CollapsibleContent>
								<SidebarGroupContent>
									<SidebarMenu>
										{item.submenu?.map((item) => {
											const Icon = item.icon;
											return (
												<SidebarMenuItem key={item.title} className='pl-4'>
													<SidebarMenuButton asChild>
														<Link href={item.href}>
															<Icon className='shrink-0' />
															{item.title}
														</Link>
													</SidebarMenuButton>
												</SidebarMenuItem>
											);
										})}
									</SidebarMenu>
								</SidebarGroupContent>
							</CollapsibleContent>
						</SidebarGroup>
					</Collapsible>
				))}
			</SidebarContent>
		</Sidebar>
	);
}
