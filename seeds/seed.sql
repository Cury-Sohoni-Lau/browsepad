BEGIN;

INSERT INTO
    users (username)
VALUES
    ('michelle'),
    ('rituraj'),
    ('felipe');

INSERT INTO 
    notes (title, content, user_id)
VALUES
    ('Applied on 8/16', 'Looks interesting', 2),
    ('Cats are ok', 'Cute apartment', 1),
    ('Counterfeit mobile battery', 'Do not bother buying!', 3);

COMMIT;