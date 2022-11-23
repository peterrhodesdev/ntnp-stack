CREATE EXTENSION pgcrypto;

CREATE TYPE EXAMPLE_ENUM AS ENUM ('value1', 'value2');

CREATE TABLE example (
  pk BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  id UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  bigint_field BIGINT NOT NULL, -- string
  boolean_field BOOLEAN NOT NULL, -- boolean
  bytea_field BYTEA NOT NULL, -- Buffer
  date_field DATE NOT NULL, -- string (change to `Date`, add transformer)
  enum_field EXAMPLE_ENUM NOT NULL, -- "value1" | "value2" (create and add enum)
  float_field FLOAT NOT NULL, -- number
  integer_field INTEGER NOT NULL, -- number
  json_field JSON NOT NULL, -- object (create class)
  jsonb_field JSONB NOT NULL, -- object (create class)
  numeric_field NUMERIC NOT NULL, -- string (change to `number`, add transformer)
  numeric_nullable_field NUMERIC, -- string | null (change to `number | null`, add transformer)
  real_field REAL NOT NULL, -- number
  text_field TEXT NOT NULL, -- string
  timestamptz_field TIMESTAMPTZ NOT NULL, -- Date
  varchar_field VARCHAR NOT NULL, -- string
  uuid_field UUID NOT NULL, -- string
  array_one_dimensional_field INTEGER[] NOT NULL, -- number[]
  array_two_dimensional_field TEXT[][] NOT NULL -- string[] (change to `string[][]`)
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