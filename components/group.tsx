import * as React from 'react';
import { cn } from '@/lib/utils';

const ButtonGroup = React.forwardRef<
	React.ElementRef<typeof React.Fragment>,
	React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn('flex items-center gap-2', className)}
		{...props}
	/>
));

ButtonGroup.displayName = 'ButtonGroup';

export { ButtonGroup };
