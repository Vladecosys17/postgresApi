CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    lastname_p VARCHAR(90) NOT NULL,
    lastname_m VARCHAR(90) NOT NULL,
    phone VARCHAR(50) NOT NULL UNIQUE,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
