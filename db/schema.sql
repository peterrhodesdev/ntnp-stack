CREATE EXTENSION pgcrypto;

CREATE TABLE example (
  pk BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  id UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  boolean_field BOOLEAN NOT NULL, -- boolean
  float_field FLOAT NOT NULL, -- number
  integer_constrained_field INTEGER NOT NULL CHECK (integer_constrained_field BETWEEN 10 AND 999), -- number
  numeric_field NUMERIC NOT NULL, -- string (change to `number`, add transformer)
  text_nullable_field TEXT, -- string | null
  timestamptz_field TIMESTAMPTZ NOT NULL, -- Date
  varchar_constrained_field VARCHAR(6) NOT NULL CHECK (LENGTH(varchar_constrained_field) >= 3) -- string
);

CREATE TABLE relationship_one_to_many (
  pk BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  id UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  field TEXT
);

CREATE TABLE relationship_many_to_one (
  pk BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  id UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  relationship_one_to_many_pk BIGINT REFERENCES relationship_one_to_many,
  field TEXT
);