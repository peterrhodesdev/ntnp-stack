INSERT INTO example (
  bigint_field,
  boolean_field,
  bytea_field,
  date_field,
  enum_field,
  float_field,
  integer_field,
  json_field,
  jsonb_field,
  numeric_field,
  numeric_nullable_field,
  real_field,
  text_field,
  timestamptz_field,
  varchar_field,
  uuid_field,
  array_one_dimensional_field,
  array_two_dimensional_field)
VALUES (
  9223372036854775807, -- bigint
  TRUE, -- boolean
  E'\\xDEADBEEF', -- bytea,
  '1999-01-08', -- date
  'value1', -- enum
  123456.123456789, -- float
  2147483647, -- integer
  '{"bar": "baz", "balance": 7.77, "active": false}', -- json
  '{"foo": [true, "bar"], "tags": {"a": 1, "b": null}}', -- jsonb
  1234567890.0123456789, -- numeric
  NULL, -- numeric | NULL
  123.456, -- real
  'text', -- text
  '1999-01-08 04:05:06 -8:00', -- timestamptz
  'varchar', -- varchar
  '12345678-abcd-1234-abcd-12345678abcd', -- uuid
  ARRAY[1, 2, 3], -- integer[]
  ARRAY[['a', 'b', 'c'], ['d', 'e', 'f']] -- text[][]
),(
  -9223372036854775808, -- bigint
  FALSE, -- boolean
  'abc \153\154\155 \052\251\124', -- bytea
  'January 8, 1999', -- date
  'value2', -- enum
  0, -- float
  -2147483648, -- integer
  '{}', -- json
  '{}', -- jsonb
  0, -- numeric
  0, -- numeric | NULL
  0, -- real
  '', -- text
  'January 8 04:05:06 1999 PST', -- timestamptz
  '', -- varchar
  '12345678ABCD1234ABCD12345678ABCD', -- uuid
  '{1, 2, 3}', -- integer[]
  '{{"a", "b", "c"}, {"d", "e", "f"}}' -- text[][]
);

DO $$
DECLARE _pk BIGINT;
BEGIN
  INSERT INTO relationship_one_to_many (field) VALUES ('otm1') RETURNING pk INTO _pk;
  INSERT INTO relationship_many_to_one (relationship_one_to_many_pk, field) VALUES (_pk, 'mto1');
  INSERT INTO relationship_one_to_many (field) VALUES ('otm2') RETURNING pk INTO _pk;
  INSERT INTO relationship_many_to_one (relationship_one_to_many_pk, field) VALUES (_pk, 'mto2');
  INSERT INTO relationship_many_to_one (relationship_one_to_many_pk, field) VALUES (_pk, 'mto3');
END $$
