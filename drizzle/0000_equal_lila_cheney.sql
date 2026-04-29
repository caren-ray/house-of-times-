CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text NOT NULL,
	`price` real NOT NULL,
	`category` text NOT NULL,
	`image_url` text NOT NULL,
	`created_at` integer
);
