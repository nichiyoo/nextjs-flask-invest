import { Menu } from '@/lib/type';
import {
	Brain,
	Building2,
	ChartBarBig,
	FlaskConical,
	GraduationCap,
	Layout,
	TrendingUp,
	Users,
	Users2,
} from 'lucide-react';

export const features = [
	{
		title: 'Pentingnya Investasi',
		description: `Investasi sebagai solusi menghadapi tantangan ekonomi modern, memberikan imbal hasil lebih tinggi dibanding menabung konvensional.`,
		icon: TrendingUp,
	},
	{
		title: 'Fokus pada Mahasiswa',
		description: `Analisis minat investasi mahasiswa Universitas Pembangunan Veteran Jakarta menggunakan data primer dari kuesioner.`,
		icon: Users,
	},
	{
		title: 'Solusi Machine Learning',
		description: `Penggunaan algoritma K-Nearest Neighbors (KNN) untuk memprediksi dan memahami tren minat investasi mahasiswa.`,
		icon: Brain,
	},
];

export const menus: Array<Menu> = [
	{
		title: 'Beranda',
		href: '/',
	},
	{
		title: 'Prediksi',
		href: '/prediction',
	},
	{
		title: 'Tentang',
		href: '/about',
	},
];

export const side: Array<Menu> = [
	{
		href: '#',
		title: 'Dashboard',
		submenu: [
			{
				icon: ChartBarBig,
				title: 'Statistik',
				href: '/dashboard/statistics',
				description: 'Statistik data prediksi minat investasi mahasiswa',
			},
			{
				icon: Layout,
				title: 'Menu Overview',
				href: '/dashboard',
				description: 'Navigasi menu yang tersedia pada dashboard.',
			},
			{
				icon: FlaskConical,
				title: 'Data Prediksi',
				href: '/dashboard/predictions',
				description: 'Kelola data prediksi minat investasi mahasiswa',
			},
			{
				icon: Users2,
				title: 'Data Pengguna',
				href: '/dashboard/users',
				description: 'Kelola data pengguna yang bergabung dengan sistem',
			},
			{
				icon: Building2,
				title: 'Data Fakultas',
				href: '/dashboard/faculty',
				description: 'Kelola data fakultas yang bergabung dengan sistem',
			},
			{
				icon: GraduationCap,
				title: 'Data Jurusan',
				href: '/dashboard/major',
				description: 'Kelola data jurusan yang bergabung dengan sistem',
			},
		],
	},
];
