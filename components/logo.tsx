import * as React from 'react';

import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
	//
}

const Logo: React.FC<LogoProps> = () => {
	return (
		<Link href='/' className='flex items-center gap-2 font-bold'>
			<Image src='/logo.png' alt='logo' width={36} height={36} />
			<span>{process.env.NEXT_PUBLIC_APPLICATION_NAME}</span>
		</Link>
	);
};

export default Logo;
