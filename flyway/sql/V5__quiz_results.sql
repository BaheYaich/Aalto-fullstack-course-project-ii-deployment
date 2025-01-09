CREATE TABLE IF NOT EXISTS quiz_results (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    topic_id INTEGER REFERENCES topics(id),
    topic_max_score INTEGER NOT NULL,
    user_score INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, topic_id)
);

-- Insert initial quiz result for admin user on Science topic
INSERT INTO quiz_results (user_id, topic_id, topic_max_score, user_score)
VALUES (1, 1, 3, 3);