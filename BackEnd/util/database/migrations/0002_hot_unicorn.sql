ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_seller_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `reviews` ADD `reviewer` bigint unsigned NOT NULL;--> statement-breakpoint
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_reviewer_users_id_fk` FOREIGN KEY (`reviewer`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reviews` DROP COLUMN `seller_id`;