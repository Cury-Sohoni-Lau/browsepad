BEGIN;

INSERT INTO
    users (name, email, password)
VALUES
    ('michelle', 'mlau@gmail.com', '$2b$10$9k6n5rCVzeamqcOynN5L7OW9sUUvYLSdZn038kqnTROjIjkrHm.2.'),
    ('rituraj', 'r@gmail.com', '$2b$10$MgfxZUIkCoxn4iv8iie/5OKInY.xawR6vqTvKgbagaOaYhL2ySA5m'),
    ('felipe', 'flp@gmail.com', '$2b$10$kJAc0a5AfajkF3EifZP2heNlMLXaFA0Te0DLhpW8LOnNZGSUMjkxK');

INSERT INTO 
    notes (title, content, user_id, url)
VALUES
    ('Applied on 8/16', 'Looks interesting', 2, 'https://github.com/Cury-Sohoni-Lau/browsepad-extension'),
    ('Cats are ok', 'Cute apartment', 1, 'https://github.com/Cury-Sohoni-Lau/browsepad'),
    ('Counterfeit mobile battery', 'Do not bother buying!', 3, 'https://www.youtube.com/');

INSERT INTO
    editors (user_id, note_id)
VALUES
    (1, 1);

COMMIT;