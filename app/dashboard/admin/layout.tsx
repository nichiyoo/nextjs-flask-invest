import * as React from 'react';

import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import DashboardNavbar from '@/components/dashboard/dashboard-navbar';
import { ConfirmProvider } from '@/context/confirm-context';
import { sidebar } from '@/lib/constant';
import { getCurrentSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function Layout({
	children,
}: React.PropsWithChildren): Promise<React.JSX.Element> {
	const { user } = await getCurrentSession();

	if (!user) return redirect('/auth/login');
	if (user.role !== 'admin') return redirect('/dashboard/user');

	return (
		<SidebarProvider>
			<DashboardSidebar menus={sidebar.admin} />
			<SidebarInset>
				<DashboardNavbar />
				<ConfirmProvider>
					<div className='container py-10 max-w-7xl'>{children}</div>
				</ConfirmProvider>
			</SidebarInset>
		</SidebarProvider>
	);
}
