'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const Header = React.forwardRef<
	React.ElementRef<typeof React.Fragment>,
	React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('grid gap-4 motion-preset-slide-up-sm', className)}
		{...props}
	/>
));

Header.displayName = 'Header';

const HeaderTitle = React.forwardRef<
	React.ElementRef<typeof React.Fragment>,
	React.ComponentPropsWithoutRef<'h1'>
>(({ className, ...props }, ref) => (
	<h1
		ref={ref}
		className={cn('text-6xl font-extrabold font-serif', className)}
		{...props}
	/>
));

HeaderTitle.displayName = 'HeaderTitle';

const HeaderSubtitle = React.forwardRef<
	React.ElementRef<typeof React.Fragment>,
	React.ComponentPropsWithoutRef<'h2'>
>(({ className, ...props }, ref) => (
	<h2
		ref={ref}
		className={cn('text-3xl font-bold font-serif', className)}
		{...props}
	/>
));

HeaderSubtitle.displayName = 'HeaderSubtitle';

const HeaderDescription = React.forwardRef<
	React.ElementRef<typeof React.Fragment>,
	React.ComponentPropsWithoutRef<'p'>
>(({ className, ...props }, ref) => (
	<p ref={ref} className={cn('text-muted-foreground', className)} {...props} />
));

HeaderDescription.displayName = 'HeaderDescription';

export { Header, HeaderTitle, HeaderSubtitle, HeaderDescription };
