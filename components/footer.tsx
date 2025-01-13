import * as React from 'react';

interface FooterProps {
	//
}

export const Footer: React.FC<FooterProps> = () => {
	const year = new Date().getFullYear();

	return (
		<div className='py-6 flex items-center justify-center'>
			<span className='text-center text-muted-foreground text-sm opacity-50'>
				{process.env.NEXT_PUBLIC_APPLICATION_NAME} &copy; {year}
			</span>
		</div>
	);
};
