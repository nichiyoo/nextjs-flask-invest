import { LucideIcon } from 'lucide-react';

export type Menu = {
	title: string;
	href: string;
	target?: string;
	rel?: string;
	submenu?: Array<
		Menu & {
			description: string;
			icon: LucideIcon;
		}
	>;
};

export type RiskProfile = 'Konservatif' | 'Moderat' | 'Agresif';
