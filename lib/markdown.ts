import * as path from 'path';
import * as fs from 'fs/promises';

import { marked } from 'marked';

export const folder = path.join(process.cwd(), 'docs');

type Filenames = [
	'reksadana-pasar-uang.md',
	'reksadana-pendapatan-tetap.md',
	'reksadana-campuran.md',
	'reksadana-saham.md'
][number];

export const getDocuments = async (): Promise<Record<Filenames, string>> => {
	const files = await fs.readdir(folder);
	const result: Record<string, string> = {};

	for (const file of files) {
		const content = await fs.readFile(path.join(folder, file), 'utf8');
		result[file] = await marked(content);
	}

	return result;
};

export const getDocumentArray = async () => {
	const documents = await getDocuments();

	return [
		{
			label: 'Reksa Dana Pasar Uang',
			value: 'reksadana-pasar-uang',
			description: documents['reksadana-pasar-uang.md'] ?? '',
		},
		{
			label: 'Reksa Dana Pendapatan Tetap',
			value: 'reksadana-pendapatan-tetap',
			description: documents['reksadana-pendapatan-tetap.md'] ?? '',
		},
		{
			label: 'Reksa Dana Campuran',
			value: 'reksadana-campuran',
			description: documents['reksadana-campuran.md'] ?? '',
		},
		{
			label: 'Reksa Dana Saham',
			value: 'reksadana-saham',
			description: documents['reksadana-saham.md'] ?? '',
		},
	];
};
