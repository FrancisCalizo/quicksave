CREATE DATABASE quicksave;

CREATE TABLE expense(
  expense_id SERIAL PRIMARY KEY,
  description VARCHAR(255),
  amount DECIMAL(12,2),
  date DATE
  category VARCHAR(255),
  notes VARCHAR(255)
  userId BIGINT
);

CREATE TABLE category(
  category_id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  userId BIGINT
);

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
);