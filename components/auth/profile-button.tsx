'use client';

import * as React from 'react';
import { formatInitial } from '@/lib/utils';
import { signout } from '@/actions/auth';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/database/schema';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
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
			<DropdownMenuTrigger className='flex items-center gap-2'>
				<Avatar>
					<AvatarFallback className='bg-primary text-primary-foreground'>
						{formatInitial(user.nama)}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56' align='end' forceMount>
				<DropdownMenuLabel>
					<div className='flex flex-col gap-1'>
						<span className='text-sm font-medium'>{user.nama}</span>
						<span className='text-xs text-muted-foreground truncate'>
							{user.email}
						</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link href='/'>
						<DropdownMenuItem>Home</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
				{user.role === 'admin' && (
					<DropdownMenuGroup>
						<Link href='/dashboard'>
							<DropdownMenuItem>Dashboard</DropdownMenuItem>
						</Link>
					</DropdownMenuGroup>
				)}
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
