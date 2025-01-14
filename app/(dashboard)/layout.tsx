import * as React from 'react';
import { getCurrentSession } from '@/lib/session';
import { redirect } from 'next/navigation';

import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import DashboardNavbar from '@/components/dashboard/dashboard-navbar';
import { ConfirmProvider } from '@/context/confirm-context';

export default async function Layout({
	children,
}: React.PropsWithChildren): Promise<React.JSX.Element> {
	const { user } = await getCurrentSession();
	if (!user || user.role !== 'admin') redirect('/');

	return (
		<SidebarProvider>
			<DashboardSidebar />
			<SidebarInset>
				<DashboardNavbar />
				<ConfirmProvider>
					<div className='container py-10 max-w-7xl'>{children}</div>
				</ConfirmProvider>
			</SidebarInset>
		</SidebarProvider>
	);
}
