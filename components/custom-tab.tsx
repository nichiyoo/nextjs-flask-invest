import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const CustomList: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<TabsList className='h-auto justify-start bg-transparent rounded-none p-0 border-b border-b-muted'>
			{children}
		</TabsList>
	);
};

export const CustomTrigger: React.FC<
	React.PropsWithChildren & { value: string }
> = ({ value, children }) => {
	return (
		<TabsTrigger
			value={value}
			className='rounded-none border-b border-transparent data-[state=active]:bg-transparent data-[state=active]:border-primary'>
			{children}
		</TabsTrigger>
	);
};

export const CustomContent: React.FC<
	React.PropsWithChildren & { value: string; title: string }
> = ({ value, title, children }) => {
	return (
		<TabsContent value={value}>
			<Card>
				<CardHeader>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='max-w-none prose dark:prose-invert text-muted-foreground prose-headings:font-serif'>
						{children}
					</div>
				</CardContent>
			</Card>
		</TabsContent>
	);
};
