RENAME TABLE `sold` TO `transactions`;--> statement-breakpoint
ALTER TABLE `transactions` DROP FOREIGN KEY `sold_seller_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `transactions` DROP FOREIGN KEY `sold_buyer_id_users_id_fk`;
--> statement-breakpoint
ALTER TABLE `transactions` DROP PRIMARY KEY;--> statement-breakpoint
ALTER TABLE `transactions` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_seller_id_users_id_fk` FOREIGN KEY (`seller_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_buyer_id_users_id_fk` FOREIGN KEY (`buyer_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;