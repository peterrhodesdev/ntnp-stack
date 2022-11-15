CREATE EXTENSION pgcrypto;

CREATE TABLE my_table (
  pk INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  id UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  string_fixed CHAR(3) NOT NULL,
  string_variable_limited VARCHAR(12) NOT NULL,
  string_variable_unlimited TEXT NOT NULL,
  string_nullable TEXT,
  string_not_empty TEXT CHECK (string_not_empty <> '')
);