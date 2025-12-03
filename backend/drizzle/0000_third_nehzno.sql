CREATE TABLE `budget_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`category_id` int NOT NULL,
	`amount_limit` int NOT NULL,
	`month` int NOT NULL,
	`year` int NOT NULL,
	CONSTRAINT `budget_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `category_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	CONSTRAINT `category_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transaction_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int,
	`category_id` int,
	`amount` int,
	`date` datetime,
	`description` varchar(255),
	`created_at` datetime DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `transaction_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	CONSTRAINT `users_table_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_table_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `budget_table` ADD CONSTRAINT `budget_table_user_id_users_table_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users_table`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `budget_table` ADD CONSTRAINT `budget_table_category_id_category_table_id_fk` FOREIGN KEY (`category_id`) REFERENCES `category_table`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `category_table` ADD CONSTRAINT `category_table_user_id_users_table_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users_table`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transaction_table` ADD CONSTRAINT `transaction_table_user_id_users_table_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users_table`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transaction_table` ADD CONSTRAINT `transaction_table_category_id_category_table_id_fk` FOREIGN KEY (`category_id`) REFERENCES `category_table`(`id`) ON DELETE no action ON UPDATE no action;