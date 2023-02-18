/* Replace with your SQL commands */
CREATE TABLE groups_membs (
    id SERIAL PRIMARY KEY,
    group_id BIGINT REFERENCES groups(id) NOT NULL,
    user_id BIGINT REFERENCES users(id) NOT NULL
)