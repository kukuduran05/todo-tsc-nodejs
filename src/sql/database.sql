CREATE DATABASE todo;

CREATE TABLE users (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    lastname VARCHAR(200),
    email   text NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIME
);

DESCRIBE users;

CREATE TABLE tasks (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title varchar(100) NOT NULL DEFAULT '',
  description text,
  categoryId int DEFAULT NULL,
  userId int DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL
);

DESCRIBE tasks;

CREATE TABLE categories (
  id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  description text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  created_at timestamp NULL DEFAULT NULL
);

DESCRIBE categories;