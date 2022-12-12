DO $$
BEGIN
  FOR i IN 1..10 LOOP
    INSERT INTO example (title, amount, date_on)
    VALUES (CONCAT('title ', i), i, NOW());
  END LOOP;
END $$
