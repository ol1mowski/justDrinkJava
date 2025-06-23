-- Schema for test database
-- Users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    read_time INTEGER,
    category_id INTEGER,
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- FOREIGN KEY (user_id) REFERENCES users(id) -- Disabled for tests
    -- FOREIGN KEY (category_id) REFERENCES categories(id) -- Disabled for tests
);

-- Posts content table
CREATE TABLE IF NOT EXISTS posts_content (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    post_id BIGINT NOT NULL,
    content TEXT,
    category_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- FOREIGN KEY (post_id) REFERENCES posts(id) -- Disabled for tests
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    post_id INTEGER NOT NULL,
    user_id BIGINT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- FOREIGN KEY (user_id) REFERENCES users(id) -- Disabled for tests
);

-- Comment likes table
CREATE TABLE IF NOT EXISTS comment_likes (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    comment_id INTEGER NOT NULL,
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- FOREIGN KEY (comment_id) REFERENCES comments(id), -- Disabled for tests
    -- FOREIGN KEY (user_id) REFERENCES users(id), -- Disabled for tests
    UNIQUE(comment_id, user_id)
);

-- Quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    difficulty VARCHAR(50),
    time_limit INTEGER,
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- FOREIGN KEY (user_id) REFERENCES users(id) -- Disabled for tests
);

-- Quizzes content table
CREATE TABLE IF NOT EXISTS quizzes_content (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    quiz_id BIGINT NOT NULL,
    question TEXT NOT NULL,
    options TEXT,
    correct_answer VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- FOREIGN KEY (quiz_id) REFERENCES quizzes(id) -- Disabled for tests
);

-- User rankings table
CREATE TABLE IF NOT EXISTS user_rankings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    score INTEGER DEFAULT 0,
    rank_position INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- FOREIGN KEY (user_id) REFERENCES users(id) -- Disabled for tests
);

-- Users ranking table (alternative name used in tests)
CREATE TABLE IF NOT EXISTS users_ranking (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    total_score INTEGER DEFAULT 0,
    ranking INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- FOREIGN KEY (user_id) REFERENCES users(id) -- Disabled for tests
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 