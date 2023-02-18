/* Replace with your SQL commands */
CREATE TABLE contacts (
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) NOT NULL,
    contact_id BIGINT REFERENCES users(id) NOT NULL
)