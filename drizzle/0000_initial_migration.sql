CREATE TABLE `fakultas` (
	`fakultas_id` integer PRIMARY KEY NOT NULL,
	`nama` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `jurusan` (
	`jurusan_id` integer PRIMARY KEY NOT NULL,
	`fakultas_id` integer NOT NULL,
	`nama` text NOT NULL,
	FOREIGN KEY (`fakultas_id`) REFERENCES `fakultas`(`fakultas_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `prediksi` (
	`prediksi_id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`usia` integer NOT NULL,
	`jenis_kelamin` text NOT NULL,
	`uang_bulanan` integer NOT NULL,
	`ekonomi_mendukung` text NOT NULL,
	`penghasilan_cukup` text NOT NULL,
	`tujuan_jangka_panjang` text NOT NULL,
	`penghasilan_tambahan` text NOT NULL,
	`meningkatkan_kekayaan` text NOT NULL,
	`literasi_keuangan` text NOT NULL,
	`kemudahan_platform` text NOT NULL,
	`keuntungan` text NOT NULL,
	`risiko` text NOT NULL,
	`tahu_investasi` text NOT NULL,
	`sudah_investasi` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `prediksi_user_id_unique` ON `prediksi` (`user_id`);--> statement-breakpoint
CREATE TABLE `session` (
	`session_id` text PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user` (
	`user_id` integer PRIMARY KEY NOT NULL,
	`nama` text NOT NULL,
	`email` text,
	`password` text NOT NULL,
	`jurusan_id` integer,
	`role` text DEFAULT 'user' NOT NULL,
	FOREIGN KEY (`jurusan_id`) REFERENCES `jurusan`(`jurusan_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);