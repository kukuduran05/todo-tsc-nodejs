CREATE DATABASE todo_nodejs;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `lastname` varchar(200) DEFAULT NULL,
  `email` text NOT NULL,
  `password` varchar(300) NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `categoryId` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL DEFAULT '',
  `description` text,
  `userUserId` int DEFAULT NULL,
  PRIMARY KEY (`categoryId`),
  KEY `fk_users_cats_idx` (`userUserId`),
  CONSTRAINT `fk_users_cats` FOREIGN KEY (`userUserId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `tasks`;
CREATE TABLE `tasks` (
  `taskId` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL DEFAULT '',
  `description` text,
  `userUserId` int NOT NULL,
  PRIMARY KEY (`taskId`),
  KEY `fk_users_tasks_idx` (`userUserId`),
  CONSTRAINT `fk_users_tasks` FOREIGN KEY (`userUserId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `tasks_categories_categories`;
CREATE TABLE `tasks_categories_categories` (
  `categoriesCategoryId` int NOT NULL,
  `tasksTaskId` int NOT NULL,
  PRIMARY KEY (`categoriesCategoryId`,`tasksTaskId`),
  KEY `fk_tasks_idx` (`tasksTaskId`),
  CONSTRAINT `fk_categories` FOREIGN KEY (`categoriesCategoryId`) REFERENCES `categories` (`categoryId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_tasks` FOREIGN KEY (`tasksTaskId`) REFERENCES `tasks` (`taskId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
