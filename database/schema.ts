import {
	InferInsertModel,
	relations,
	type InferSelectModel,
} from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const skala = ['1', '2', '3', '4', '5'] as const;

export const fakultas = sqliteTable('fakultas', {
	fakultas_id: integer('fakultas_id').primaryKey(),
	nama: text('nama').notNull(),
});

export const jurusan = sqliteTable('jurusan', {
	jurusan_id: integer('jurusan_id').primaryKey(),
	fakultas_id: integer('fakultas_id')
		.notNull()
		.references(() => fakultas.fakultas_id),
	nama: text('nama').notNull(),
});

export const user = sqliteTable('user', {
	user_id: integer('user_id').primaryKey(),
	nama: text('nama').notNull(),
	email: text('email').unique(),
	password: text('password').notNull(),
	jurusan_id: integer('jurusan_id').references(() => jurusan.jurusan_id),
	role: text('role', { enum: ['admin', 'user'] })
		.notNull()
		.default('user'),
});

export const prediksi = sqliteTable('prediksi', {
	prediksi_id: integer('prediksi_id').primaryKey(),
	user_id: integer('user_id')
		.notNull()
		.unique()
		.references(() => user.user_id, { onDelete: 'cascade' }),
	usia: integer('usia').notNull(),
	jenis_kelamin: text('jenis_kelamin', { enum: ['male', 'female'] }).notNull(),
	uang_bulanan: integer('uang_bulanan').notNull(),
	ekonomi_mendukung: text('ekonomi_mendukung', { enum: skala }).notNull(),
	penghasilan_cukup: text('penghasilan_cukup', { enum: skala }).notNull(),
	tujuan_jangka_panjang: text('tujuan_jangka_panjang', {
		enum: skala,
	}).notNull(),
	penghasilan_tambahan: text('penghasilan_tambahan', { enum: skala }).notNull(),
	meningkatkan_kekayaan: text('meningkatkan_kekayaan', {
		enum: skala,
	}).notNull(),
	literasi_keuangan: text('literasi_keuangan', { enum: skala }).notNull(),
	kemudahan_platform: text('kemudahan_platform', { enum: skala }).notNull(),
	keuntungan: text('keuntungan', { enum: skala }).notNull(),
	risiko: text('risiko', { enum: skala }).notNull(),
	tahu_investasi: text('tahu_investasi', {
		enum: ['yes', 'maybe', 'no'],
	}).notNull(),
	sudah_investasi: text('sudah_investasi', { enum: ['yes', 'no'] }).notNull(),
	tertarik_investasi: text('tertarik_investasi', {
		enum: ['yes', 'maybe', 'no'],
	}).notNull(),
});

export const session = sqliteTable('session', {
	session_id: text('session_id').primaryKey(),
	user_id: integer('user_id')
		.notNull()
		.references(() => user.user_id),
	expires_at: integer('expires_at', { mode: 'timestamp' }).notNull(),
});

export const fakulasRelation = relations(fakultas, (relation) => {
	return {
		listJurusan: relation.many(jurusan),
	};
});

export const jurusanRelation = relations(jurusan, (relation) => {
	return {
		fakultas: relation.one(fakultas, {
			fields: [jurusan.fakultas_id],
			references: [fakultas.fakultas_id],
		}),
		listMahasiswa: relation.many(user),
	};
});

export const userRelation = relations(user, (relation) => {
	return {
		jurusan: relation.one(jurusan, {
			fields: [user.jurusan_id],
			references: [jurusan.jurusan_id],
		}),
	};
});

export const prediksiRelation = relations(prediksi, (relation) => {
	return {
		user: relation.one(user, {
			fields: [prediksi.user_id],
			references: [user.user_id],
		}),
	};
});

export type User = InferSelectModel<typeof user>;
export type Session = InferSelectModel<typeof session>;
export type Fakultas = InferSelectModel<typeof fakultas>;
export type Jurusan = InferSelectModel<typeof jurusan>;
export type Prediksi = InferSelectModel<typeof prediksi>;

export type insertUser = InferInsertModel<typeof user>;
export type insertSession = InferInsertModel<typeof session>;
export type insertFakultas = InferInsertModel<typeof fakultas>;
export type insertJurusan = InferInsertModel<typeof jurusan>;
export type insertPrediksi = InferInsertModel<typeof prediksi>;
