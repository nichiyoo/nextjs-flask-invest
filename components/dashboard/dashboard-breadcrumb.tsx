'use client';

import * as React from 'react';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import { formatTitle } from '@/lib/utils';

interface DashboardBreadcrumbProps {
	//
}

export const DashboardBreadcrumb: React.FC<DashboardBreadcrumbProps> = ({
	...props
}) => {
	const pathname = usePathname();
	const breadcrumbs = pathname.split('/').filter((item) => item);

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbs.map((item, index) => (
					<React.Fragment key={index}>
						<BreadcrumbItem>
							<BreadcrumbLink href={'/' + item}>
								{formatTitle(item)}
							</BreadcrumbLink>
						</BreadcrumbItem>
						{index !== breadcrumbs.length - 1 && <BreadcrumbSeparator />}
					</React.Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
};
