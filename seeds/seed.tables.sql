BEGIN;

TRUNCATE
  "word",
  "language",
  "user";

INSERT INTO "user" ("id", "username", "name", "password")
VALUES
  (
    1,
    'admin',
    'Dunder Mifflin Admin',
    -- password = "pass"
    '$2a$10$fCWkaGbt7ZErxaxclioLteLUgg4Q3Rp09WW0s/wSLxDKYsaGYUpjG'
  );

INSERT INTO "language" ("id", "name", "user_id")
VALUES
  (1, 'Minionese', 1);

INSERT INTO "word" ("id", "language_id", "original", "translation", "next")
VALUES
  (1, 1, 'bello', 'hello', 2),
  (2, 1, 'poopaye', 'goodbye', 3),
  (3, 1, 'tank yu', 'thank you', 4),
  (4, 1, 'beedo', 'fire', 5),
  (5, 1, 'me want banana', "I'm hungry", 6),
  (6, 1, 'muak muak muak', 'kiss kiss', 7),
  (7, 1, 'tulaliloo ti amo', 'we love you', 8),
  (8, 1, 'gelato', 'ice cream', 9),
  (9, 1, 'hana', 'one', 10),
  (10, 1, 'dul', 'two', 11),
  (11, 1, 'sae', 'three', null);

UPDATE "language" SET head = 1 WHERE id = 1;

-- because we explicitly set the id fields
-- update the sequencer for future automatic id setting
SELECT setval('word_id_seq', (SELECT MAX(id) from "word"));
SELECT setval('language_id_seq', (SELECT MAX(id) from "language"));
SELECT setval('user_id_seq', (SELECT MAX(id) from "user"));

COMMIT;
