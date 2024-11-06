import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ResultValues } from './schema';
import { agreements, importances, supports } from './constant';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatCurrency = (number: number) => {
	const formatter = new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	});

	return formatter.format(number);
};

export const getLabel = (value: string, options: typeof supports | typeof importances | typeof agreements) => {
	const option = options.find((option) => option.value === value);
	return option ? option.label : '';
};

export function formatInvestmentOutput(data: ResultValues) {
	const {
		additionalIncome,
		age,
		currentlyInvesting,
		economicCondition,
		financialLiteracy,
		gender,
		incomeForInvestment,
		investmentKnowledge,
		longTermGoal,
		monthlyIncome,
		offeredProfit,
		platformEaseOfUse,
		risk,
		wealthIncrease,
	} = data.input;

	const genderText = gender === 'male' ? 'Laki-laki' : 'Perempuan';
	const investmentStatus = currentlyInvesting === 'yes' ? 'sudah berinvestasi' : 'belum berinvestasi';
	const knowledgeText =
		investmentKnowledge === 'yes'
			? 'mengetahui'
			: investmentKnowledge === 'maybe'
			? 'mungkin mengetahui'
			: 'tidak mengetahui';

	return [
		`Anda adalah seorang ${genderText} yang`,
		`berusia ${age} tahun,`,
		`dengan pendapatan bulanan sebesar ${formatCurrency(monthlyIncome)}.`,
		`Anda ${knowledgeText} apa itu investasi, dan saat ini ${investmentStatus}.`,
		`Kondisi ekonomi Anda dianggap ${getLabel(economicCondition, supports)},`,
		`dan penghasilan Anda dianggap ${getLabel(incomeForInvestment, supports)} untuk berinvestasi.`,
		`Tujuan investasi Anda meliputi mencapai tujuan finansial jangka panjang (${getLabel(longTermGoal, importances)}),`,
		`mendapatkan penghasilan tambahan (${getLabel(additionalIncome, importances)}),`,
		`dan meningkatkan kekayaan (${getLabel(wealthIncrease, importances)}).`,
		`Faktor yang mempengaruhi keputusan Anda meliputi literasi keuangan (${getLabel(financialLiteracy, agreements)}),`,
		`kemudahan platform (${getLabel(platformEaseOfUse, agreements)}),`,
		`keuntungan yang ditawarkan (${getLabel(offeredProfit, agreements)}),`,
		`serta risiko yang ditanggung (${getLabel(risk, agreements)}).`,
	].join(' ');
}
