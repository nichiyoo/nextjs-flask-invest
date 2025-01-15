import Link from 'next/link';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/landing/landing-navbar';
import { Header, HeaderDescription, HeaderTitle } from '@/components/header';
import { ButtonGroup } from '@/components/group';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
	return (
		<div className='container max-w-6xl'>
			<Navbar />
			<main className='flex flex-col items-center justify-center min-h-content'>
				<Header className='text-center'>
					<HeaderTitle>Halaman Tidak Ditemukan</HeaderTitle>
					<HeaderDescription>
						Halaman yang Anda cari tidak ditemukan, atau Anda telah kembali ke
						halaman sebelumnya.
					</HeaderDescription>

					<ButtonGroup className='justify-center'>
						<Link href='/'>
							<Button>
								<ArrowLeft />
								<span>Kembali ke Beranda</span>
							</Button>
						</Link>
					</ButtonGroup>
				</Header>
			</main>
			<Footer />
		</div>
	);
}
