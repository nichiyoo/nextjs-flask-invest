import { Menu } from '@/lib/type';
import {
	Book,
	Brain,
	Building2,
	ChartBarBig,
	Code,
	FlaskConical,
	GraduationCap,
	Layout,
	TrendingUp,
	User,
	Users,
	Users2,
} from 'lucide-react';

export const scale = ['1', '2', '3', '4', '5'] as const;

export const supports = [
	{ value: '1', label: 'Sangat Tidak Mendukung' },
	{ value: '2', label: 'Tidak Mendukung' },
	{ value: '3', label: 'Biasa Saja' },
	{ value: '4', label: 'Mendukung' },
	{ value: '5', label: 'Sangat Mendukung' },
];

export const importances = [
	{ value: '1', label: 'Sangat Tidak Penting' },
	{ value: '2', label: 'Tidak Penting' },
	{ value: '3', label: 'Biasa Saja' },
	{ value: '4', label: 'Penting' },
	{ value: '5', label: 'Sangat Penting' },
];

export const agreements = [
	{ value: '1', label: 'Sangat Tidak Setuju' },
	{ value: '2', label: 'Tidak Setuju' },
	{ value: '3', label: 'Biasa Saja' },
	{ value: '4', label: 'Setuju' },
	{ value: '5', label: 'Sangat Setuju' },
];

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

export const sections = [
	{
		title: 'Demografi',
		fields: [
			{
				name: 'usia',
				label: 'Usia',
				type: 'number',
			},
			{
				name: 'jenis_kelamin',
				label: 'Jenis Kelamin',
				options: [
					{ value: 'male', label: 'Laki-laki' },
					{ value: 'female', label: 'Perempuan' },
				],
			},
		],
	},
	{
		title: 'Kondisi Ekonomi',
		fields: [
			{
				name: 'uang_bulanan',
				label: 'Berapa Uang sakumu / Penghasilanmu dalam sebulan ?',
				type: 'number',
			},
			{
				name: 'ekonomi_mendukung',
				label: 'Kondisi Ekonomi Mendukung untuk Berinvestasi ?',
				options: supports,
			},
			{
				name: 'penghasilan_cukup',
				label: 'Penghasilan Cukup untuk Berinvestasi?',
				options: supports,
			},
		],
	},
	{
		title: 'Tujuan Berinvestasi',
		fields: [
			{
				name: 'tujuan_jangka_panjang',
				label: 'Mencapai tujuan finansial jangka panjang',
				options: importances,
			},
			{
				name: 'penghasilan_tambahan',
				label: 'Mendapatkan Penghasilan Tambahan',
				options: importances,
			},
			{
				name: 'meningkatkan_kekayaan',
				label: 'Meningkatkan Kekayaan',
				options: importances,
			},
		],
	},
	{
		title: 'Faktor-Faktor yang Mempengaruhi Keputusan untuk Berinvestasi',
		fields: [
			{
				name: 'literasi_keuangan',
				label: 'Literasi Keuangan mendorong Anda untuk berinvestasi',
				options: agreements,
			},
			{
				name: 'kemudahan_platform',
				label: 'Kemudahan penggunaan platform investasi',
				options: agreements,
			},
			{
				name: 'keuntungan',
				label: 'Keuntungan yang ditawarkan',
				options: agreements,
			},
			{
				name: 'risiko',
				label: 'Risiko yang ditanggung',
				options: agreements,
			},
		],
	},
	{
		title: 'Minat Berinvestasi',
		fields: [
			{
				name: 'tahu_investasi',
				label: 'Apakah Anda mengetahui apa itu investasi',
				options: [
					{ value: 'yes', label: 'Ya' },
					{ value: 'maybe', label: 'Mungkin' },
					{ value: 'no', label: 'Tidak' },
				],
			},
			{
				name: 'sudah_investasi',
				label: 'Apakah Anda saat ini telah melakukan investasi ?',
				options: [
					{ value: 'yes', label: 'Ya' },
					{ value: 'no', label: 'Tidak' },
				],
			},
		],
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
		title: 'Publikasi',
		href: '/about',
		submenu: [
			{
				icon: User,
				title: 'Ringkasan Penelitian',
				description: 'Informasi mengenai penelitian dan latar belakang proyek',
				href: '/about',
			},
			{
				icon: Book,
				title: 'Publikasi Penelitian',
				description: 'Publikasi penelitian terkait dengan proyek',
				href: 'https://www.researchgate.net',
				target: '_blank',
				rel: 'noopener noreferrer',
			},
			{
				icon: Code,
				title: 'Publikasi Kode',
				description: 'Publikasi kode sumber terkait dengan proyek',
				href: 'https://github.com',
				target: '_blank',
				rel: 'noopener noreferrer',
			},
		],
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
		],
	},
	{
		href: '#',
		title: 'Data Perguruan Tinggi',
		submenu: [
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
			{
				icon: Users2,
				title: 'Data Pengguna',
				href: '/dashboard/users',
				description: 'Kelola data pengguna yang bergabung dengan sistem',
			},
		],
	},
];
