CREATE DATABASE quicksave;

CREATE TABLE expense(
  expense_id SERIAL PRIMARY KEY,
  description VARCHAR(255),
  amount DECIMAL(12,2),
  date DATE
);