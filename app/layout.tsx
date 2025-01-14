import './globals.css';

import { Bricolage_Grotesque, Inter } from 'next/font/google';

import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { ConfirmProvider } from '@/context/confirm-context';

const bricolage = Bricolage_Grotesque({
	subsets: ['latin'],
	variable: '--font-bricolage',
});

const inter = Inter({
	subsets: ['latin'],
	variable: '--font-inter',
});

export const metadata: Metadata = {
	title: 'Sistem Prediksi Minat Investasi',
	description:
		'Prediksi Minat Mahasiswa Dalam Berinvestasi di Pasar Modal Menggunakan Machine Learning',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={cn(
					inter.variable,
					bricolage.variable,
					'font-sans antialiased'
				)}>
				<ThemeProvider
					enableSystem
					attribute='class'
					defaultTheme='system'
					disableTransitionOnChange>
					{children}
					<Toaster />
				</ThemeProvider>
			</body>
		</html>
	);
}
