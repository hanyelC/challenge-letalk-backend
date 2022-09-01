CREATE TABLE IF NOT EXISTS loan (
  id TEXT PRIMARY KEY,
  cpf TEXT NOT NULL,
  uf TEXT NOT NULL,
  value REAL NOT NULL,
  monthly_payment_value REAL NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  birth_date TIMESTAMP NOT NULL
);