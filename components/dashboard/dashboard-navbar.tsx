import * as React from 'react';

import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { AuthButton } from '@/components/auth/auth-button';
import { DashboardBreadcrumb } from '@/components/dashboard/dashboard-breadcrumb';

export default function DashboardNavbar(): React.JSX.Element {
	return (
		<header className='sticky top-0 z-50 flex items-center h-16 gap-2 px-4 border-b bg-background shrink-0'>
			<div className='flex items-center justify-between w-full'>
				<div className='flex items-center gap-2'>
					<SidebarTrigger className='-ml-1' />
					<Separator orientation='vertical' className='h-4 mr-2' />
					<DashboardBreadcrumb />
				</div>
				<div className='flex items-center gap-4'>
					<AuthButton />
				</div>
			</div>
		</header>
	);
}
