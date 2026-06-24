-- Test data for integration tests (only applied for test profile)
-- Insert roles
INSERT INTO ROLE (role_id, name) VALUES (1, 'USER');
INSERT INTO ROLE (role_id, name) VALUES (2, 'ADMIN');

-- Insert a test user with bcrypt-encoded password for "password"
-- The id values are explicit so the join table can reference them
INSERT INTO IUSERS (user_id, username, password) VALUES (1, 'user', '$2a$10$7EqJtq98hPqEX7fNZaFWoOq7sW6j0t6f8YkE6l5KqQ0r8e');

-- Link user to USER role
INSERT INTO users_roles (user_id, role_id) VALUES (1, 1);
