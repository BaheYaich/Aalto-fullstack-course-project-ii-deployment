INSERT INTO questions (user_id, topic_id, question_text)
VALUES
  (1, 1, 'What was Richard Feynman known for?'),
  (1, 1, 'Which book was written by Carl Sagan?'),
  (1, 1, 'Which of these was a famous quote by Richard Feynman?');

INSERT INTO question_answer_options (question_id, option_text, is_correct)
VALUES
  (1, 'The discovery of the electron', FALSE),
  (1, 'Development of quantum electrodynamics', TRUE),
  (1, 'Einstein''s theory of relativity', FALSE),
  (1, 'Discovery of the neutron', FALSE);

INSERT INTO question_answer_options (question_id, option_text, is_correct)
VALUES
  (2, 'A Brief History of Time', FALSE),
  (2, 'The Selfish Gene', FALSE),
  (2, 'Cosmos', TRUE),
  (2, 'The Origin of Species', FALSE);

INSERT INTO question_answer_options (question_id, option_text, is_correct)
VALUES
  (3, 'If you can''t explain something to a six-year-old, you don''t understand it yourself.', TRUE),
  (3, 'The only thing that interferes with my learning is my education.', FALSE),
  (3, 'Everything in life is physics and math.', FALSE),
  (3, 'To keep your balance, you must keep moving.', FALSE);

INSERT INTO question_answers (user_id, question_id, question_answer_option_id)
VALUES
  (1, 1, 2),
  (1, 2, 3),
  (1, 3, 1);