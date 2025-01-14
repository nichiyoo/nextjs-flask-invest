PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_prediksi` (
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
	`tertarik_investasi` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_prediksi`("prediksi_id", "user_id", "usia", "jenis_kelamin", "uang_bulanan", "ekonomi_mendukung", "penghasilan_cukup", "tujuan_jangka_panjang", "penghasilan_tambahan", "meningkatkan_kekayaan", "literasi_keuangan", "kemudahan_platform", "keuntungan", "risiko", "tahu_investasi", "sudah_investasi", "tertarik_investasi") SELECT "prediksi_id", "user_id", "usia", "jenis_kelamin", "uang_bulanan", "ekonomi_mendukung", "penghasilan_cukup", "tujuan_jangka_panjang", "penghasilan_tambahan", "meningkatkan_kekayaan", "literasi_keuangan", "kemudahan_platform", "keuntungan", "risiko", "tahu_investasi", "sudah_investasi", "tertarik_investasi" FROM `prediksi`;--> statement-breakpoint
DROP TABLE `prediksi`;--> statement-breakpoint
ALTER TABLE `__new_prediksi` RENAME TO `prediksi`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `prediksi_user_id_unique` ON `prediksi` (`user_id`);