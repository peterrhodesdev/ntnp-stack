INSERT INTO example (
  boolean_field,
  float_field,
  integer_constrained_field,
  numeric_field,
  text_nullable_field,
  timestamptz_field,
  varchar_constrained_field)
VALUES (
  TRUE, -- boolean
  123456.123456789, -- float
  10, -- integer
  1234567890.0123456789, -- numeric
  NULL, -- text | NULL
  '1999-01-08 04:05:06 -8:00', -- timestamptz
  'abc' -- varchar min
),(
  FALSE, -- boolean
  0, -- float
  999, -- integer
  0, -- numeric
  'lorem ipsum', -- text | NULL
  'January 8 04:05:06 1999 PST', -- timestamptz
  'abcdef' -- varchar
);

DO $$
DECLARE _pk BIGINT;
BEGIN
  /*FOR i IN 1..100 LOOP
    INSERT INTO example (boolean_field, float_field, integer_constrained_field, numeric_field, text_nullable_field, timestamptz_field, varchar_constrained_field)
    VALUES (TRUE, 0, 10, 0, '', NOW(), 'aaa');
  END LOOP;*/

  INSERT INTO relationship_one_to_many (field) VALUES ('otm1') RETURNING pk INTO _pk;
  INSERT INTO relationship_many_to_one (relationship_one_to_many_pk, field) VALUES (_pk, 'mto1');
  INSERT INTO relationship_one_to_many (field) VALUES ('otm2') RETURNING pk INTO _pk;
  INSERT INTO relationship_many_to_one (relationship_one_to_many_pk, field) VALUES (_pk, 'mto2');
  INSERT INTO relationship_many_to_one (relationship_one_to_many_pk, field) VALUES (_pk, 'mto3');
END $$
