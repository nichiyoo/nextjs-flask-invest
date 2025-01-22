ALTER TABLE `prediksi` ADD `semester` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `nim` text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `user_nim_unique` ON `user` (`nim`);