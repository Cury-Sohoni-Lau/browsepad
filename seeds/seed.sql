BEGIN;

INSERT INTO
    users (name, email, password)
VALUES
    ('michelle', 'mlau@gmail.com', '$2b$10$9k6n5rCVzeamqcOynN5L7OW9sUUvYLSdZn038kqnTROjIjkrHm.2.'),
    ('rituraj', 'r@gmail.com', '$2b$10$MgfxZUIkCoxn4iv8iie/5OKInY.xawR6vqTvKgbagaOaYhL2ySA5m'),
    ('felipe', 'flp@gmail.com', '$2b$10$kJAc0a5AfajkF3EifZP2heNlMLXaFA0Te0DLhpW8LOnNZGSUMjkxK');

INSERT INTO 
    notes (title, content, user_id)
VALUES
    ('Applied on 8/16', 'Looks interesting', 2),
    ('Cats are ok', 'Cute apartment', 1),
    ('Counterfeit mobile battery', 'Do not bother buying!', 3);

COMMIT;