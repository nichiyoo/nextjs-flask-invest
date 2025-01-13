'use client';

import * as React from 'react';
import { formatInitial } from '@/lib/utils';
import { signout } from '@/actions/auth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { User } from '@/database/schema';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

interface SignoutButtonProps {
	user: User;
}

export const ProfileButton: React.FC<SignoutButtonProps> = ({ user }) => {
	const { toast } = useToast();

	const handleLogout = async () => {
		await signout();

		toast({
			title: 'Berhasil logout',
			description: 'Anda telah berhasil logout.',
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='relative h-8 w-8 rounded-full'>
					<Avatar>
						<AvatarFallback>{formatInitial(user.nama)}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='end' forceMount>
				<DropdownMenuLabel className='font-normal'>
					<div className='flex flex-col space-y-1'>
						<p className='text-sm font-medium leading-none'>{user.nama}</p>
						<p className='text-xs leading-none text-muted-foreground'>
							{user.email}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />

				{user.role === 'admin' && (
					<React.Fragment>
						<DropdownMenuGroup>
							<Link href='/dashboard'>
								<DropdownMenuItem>Dashboard</DropdownMenuItem>
							</Link>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
					</React.Fragment>
				)}

				<DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
