CREATE EXTENSION IF NOT EXISTS pgcrypto;
INSERT INTO users (email, admin, password)
VALUES (
        'admin@admin.com',
        TRUE,
        crypt('123456', gen_salt('bf'))
    );
DO $$
DECLARE admin_id INTEGER;
BEGIN
SELECT id INTO admin_id
FROM users
WHERE email = 'admin@admin.com';
INSERT INTO topics (user_id, name)
VALUES (admin_id, 'science');
END $$;