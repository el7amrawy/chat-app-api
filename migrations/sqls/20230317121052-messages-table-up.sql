/* Replace with your SQL commands */
CREATE TABLE messages (
    senderId BIGINT REFERENCES users(id) NOT NULL,
    recieverId BIGINT REFERENCES users(id) NOT NULL,
    text TEXT
)