CREATE DATABASE quicksave;

CREATE TABLE expense(
  expenseId SERIAL PRIMARY KEY,
  description VARCHAR(255),
  amount DECIMAL(12,2),
  date DATE
  category VARCHAR(255),
  notes VARCHAR(255)
  userId BIGINT
);

CREATE TABLE category(
  categoryId SERIAL PRIMARY KEY,
  name VARCHAR(255),
  userId BIGINT
);

CREATE TABLE users(
  userId SERIAL PRIMARY KEY,
  firstName VARCHAR(255),
  lastName VARCHAR(255),
  email VARCHAR(255),
);