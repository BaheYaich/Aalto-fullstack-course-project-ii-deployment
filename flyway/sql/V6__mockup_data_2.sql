-- Insert new topics
DO $$
DECLARE admin_id INTEGER;
BEGIN
    SELECT id INTO admin_id FROM users WHERE email = 'admin@admin.com';
    
    INSERT INTO topics (user_id, name) VALUES
        (admin_id, 'Video Games'),
        (admin_id, 'Music'),
        (admin_id, 'Geography'),
        (admin_id, 'Comedy'),
        (admin_id, 'Philosophy');
END $$;

-- Video Games Questions
INSERT INTO questions (user_id, topic_id, question_text)
SELECT 1, t.id, q.question_text
FROM (VALUES
    ('What year was the first Super Mario Bros. released?'),
    ('Which company developed Minecraft?'),
    ('What is the best-selling video game of all time?'),
    ('Who is the main protagonist of The Legend of Zelda series?'),
    ('Which game franchise features a character named Master Chief?')
) AS q(question_text)
CROSS JOIN (SELECT id FROM topics WHERE name = 'Video Games') AS t;

-- Music Questions
INSERT INTO questions (user_id, topic_id, question_text)
SELECT 1, t.id, q.question_text
FROM (VALUES
    ('Who is known as the "King of Pop"?'),
    ('Which band released "Bohemian Rhapsody"?'),
    ('What year did The Beatles break up?'),
    ('Who wrote the composition "Moonlight Sonata"?'),
    ('Which instrument is Yo-Yo Ma famous for playing?')
) AS q(question_text)
CROSS JOIN (SELECT id FROM topics WHERE name = 'Music') AS t;

-- Geography Questions
INSERT INTO questions (user_id, topic_id, question_text)
SELECT 1, t.id, q.question_text
FROM (VALUES
    ('What is the capital of Brazil?'),
    ('Which is the largest desert in the world?'),
    ('On which continent is the Nile River located?'),
    ('What is the smallest country in the world?'),
    ('Which mountain range runs through South America?')
) AS q(question_text)
CROSS JOIN (SELECT id FROM topics WHERE name = 'Geography') AS t;

-- Comedy Questions
INSERT INTO questions (user_id, topic_id, question_text)
SELECT 1, t.id, q.question_text
FROM (VALUES
    ('Who created and starred in Seinfeld?'),
    ('Which comedian is known as "The King of Comedy"?'),
    ('What year did Monty Python''s Flying Circus first air?'),
    ('Who played Dr. Evil in Austin Powers?'),
    ('Which sitcom featured the coffee shop "Central Perk"?')
) AS q(question_text)
CROSS JOIN (SELECT id FROM topics WHERE name = 'Comedy') AS t;

-- Philosophy Questions
INSERT INTO questions (user_id, topic_id, question_text)
SELECT 1, t.id, q.question_text
FROM (VALUES
    ('Who wrote "The Republic"?'),
    ('What is the study of knowledge called?'),
    ('Who said "I think, therefore I am"?'),
    ('Which philosopher taught Alexander the Great?'),
    ('Who wrote "Thus Spoke Zarathustra"?')
) AS q(question_text)
CROSS JOIN (SELECT id FROM topics WHERE name = 'Philosophy') AS t;

-- Video Games Answers
WITH q AS (SELECT id FROM questions WHERE topic_id = (SELECT id FROM topics WHERE name = 'Video Games'))
INSERT INTO question_answer_options (question_id, option_text, is_correct)
SELECT q.id, o.option_text, o.is_correct
FROM (VALUES
    (1, '1985', TRUE), (1, '1983', FALSE), (1, '1987', FALSE),
    (2, 'Mojang', TRUE), (2, 'Microsoft', FALSE), (2, 'EA', FALSE),
    (3, 'Minecraft', TRUE), (3, 'Tetris', FALSE), (3, 'GTA V', FALSE),
    (4, 'Link', TRUE), (4, 'Zelda', FALSE), (4, 'Ganon', FALSE),
    (5, 'Halo', TRUE), (5, 'Call of Duty', FALSE), (5, 'Destiny', FALSE)
) AS o(q_num, option_text, is_correct)
CROSS JOIN LATERAL (SELECT id FROM q LIMIT 1 OFFSET o.q_num - 1) AS q;

-- Music Answers
WITH q AS (SELECT id FROM questions WHERE topic_id = (SELECT id FROM topics WHERE name = 'Music'))
INSERT INTO question_answer_options (question_id, option_text, is_correct)
SELECT q.id, o.option_text, o.is_correct
FROM (VALUES
    (1, 'Michael Jackson', TRUE), (1, 'Elvis Presley', FALSE), (1, 'Prince', FALSE),
    (2, 'Queen', TRUE), (2, 'The Beatles', FALSE), (2, 'Led Zeppelin', FALSE),
    (3, '1970', TRUE), (3, '1968', FALSE), (3, '1972', FALSE),
    (4, 'Beethoven', TRUE), (4, 'Mozart', FALSE), (4, 'Bach', FALSE),
    (5, 'Cello', TRUE), (5, 'Violin', FALSE), (5, 'Piano', FALSE)
) AS o(q_num, option_text, is_correct)
CROSS JOIN LATERAL (SELECT id FROM q LIMIT 1 OFFSET o.q_num - 1) AS q;

-- Geography Answers
WITH q AS (SELECT id FROM questions WHERE topic_id = (SELECT id FROM topics WHERE name = 'Geography'))
INSERT INTO question_answer_options (question_id, option_text, is_correct)
SELECT q.id, o.option_text, o.is_correct
FROM (VALUES
    (1, 'Brasília', TRUE), (1, 'Rio de Janeiro', FALSE), (1, 'São Paulo', FALSE),
    (2, 'Antarctic Desert', TRUE), (2, 'Sahara Desert', FALSE), (2, 'Arabian Desert', FALSE),
    (3, 'Africa', TRUE), (3, 'Asia', FALSE), (3, 'Europe', FALSE),
    (4, 'Vatican City', TRUE), (4, 'Monaco', FALSE), (4, 'San Marino', FALSE),
    (5, 'Andes', TRUE), (5, 'Rocky Mountains', FALSE), (5, 'Alps', FALSE)
) AS o(q_num, option_text, is_correct)
CROSS JOIN LATERAL (SELECT id FROM q LIMIT 1 OFFSET o.q_num - 1) AS q;

-- Comedy Answers
WITH q AS (SELECT id FROM questions WHERE topic_id = (SELECT id FROM topics WHERE name = 'Comedy'))
INSERT INTO question_answer_options (question_id, option_text, is_correct)
SELECT q.id, o.option_text, o.is_correct
FROM (VALUES
    (1, 'Jerry Seinfeld', TRUE), (1, 'Larry David', FALSE), (1, 'George Costanza', FALSE),
    (2, 'Jerry Lewis', TRUE), (2, 'Charlie Chaplin', FALSE), (2, 'Richard Pryor', FALSE),
    (3, '1969', TRUE), (3, '1971', FALSE), (3, '1967', FALSE),
    (4, 'Mike Myers', TRUE), (4, 'Jim Carrey', FALSE), (4, 'Eddie Murphy', FALSE),
    (5, 'Friends', TRUE), (5, 'Cheers', FALSE), (5, 'Frasier', FALSE)
) AS o(q_num, option_text, is_correct)
CROSS JOIN LATERAL (SELECT id FROM q LIMIT 1 OFFSET o.q_num - 1) AS q;

-- Philosophy Answers
WITH q AS (SELECT id FROM questions WHERE topic_id = (SELECT id FROM topics WHERE name = 'Philosophy'))
INSERT INTO question_answer_options (question_id, option_text, is_correct)
SELECT q.id, o.option_text, o.is_correct
FROM (VALUES
    (1, 'Plato', TRUE), (1, 'Aristotle', FALSE), (1, 'Socrates', FALSE),
    (2, 'Epistemology', TRUE), (2, 'Ontology', FALSE), (2, 'Ethics', FALSE),
    (3, 'René Descartes', TRUE), (3, 'John Locke', FALSE), (3, 'Immanuel Kant', FALSE),
    (4, 'Aristotle', TRUE), (4, 'Plato', FALSE), (4, 'Socrates', FALSE),
    (5, 'Friedrich Nietzsche', TRUE), (5, 'Jean-Paul Sartre', FALSE), (5, 'Albert Camus', FALSE)
) AS o(q_num, option_text, is_correct)
CROSS JOIN LATERAL (SELECT id FROM q LIMIT 1 OFFSET o.q_num - 1) AS q; 