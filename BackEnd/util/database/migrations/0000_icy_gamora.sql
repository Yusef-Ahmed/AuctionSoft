CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`password` varchar(256) NOT NULL,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_name_unique` UNIQUE(`name`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`image` varchar(256) NOT NULL,
	`price` decimal(9,2) NOT NULL,
	`ex_date` timestamp NOT NULL,
	`seller_id` bigint unsigned NOT NULL,
	`buyer_id` bigint unsigned NOT NULL,
	CONSTRAINT `products_id` PRIMARY KEY(`id`),
	CONSTRAINT `products_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`review` varchar(256) NOT NULL,
	`rating` tinyint NOT NULL,
	`seller_id` bigint unsigned NOT NULL,
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`),
	CONSTRAINT `reviews_review_unique` UNIQUE(`review`)
);
--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_seller_id_users_id_fk` FOREIGN KEY (`seller_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_buyer_id_users_id_fk` FOREIGN KEY (`buyer_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_seller_id_users_id_fk` FOREIGN KEY (`seller_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;