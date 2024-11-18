CREATE TABLE IF NOT EXISTS users (
    id INTEGER AUTO_INCREMENT, -- Auto incremento para facilitar a identificação
    name VARCHAR(255) NOT NULL, -- Nome do usuário
    email VARCHAR(255) NOT NULL, -- Email do usuário (PK)
    password VARCHAR(255), -- Senha do usuário (pode ser NULL)
    institutionFk VARCHAR(15), -- Referência à tabela institution
    userLevel ENUM('ADMIN', 'USER') NOT NULL, -- Nível do usuário
    creationDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Data de criação
    PRIMARY KEY (email), -- Chave primária
    FOREIGN KEY (institutionFk) REFERENCES institution(sigla) -- Chave estrangeira
);

INSERT INTO users (name, email, password, institutionFk, userLevel, creationDate) VALUES
('Admin User', 'admin@unifei.edu.br', 'adminpassword', 'UNIFEI', 'ADMIN', NOW()),
('John Doe', 'johndoe@unifei.edu.br', 'password123', 'UNIFEI', 'USER', NOW()),
('Jane Smith', 'janesmith@unifei.edu.br', 'securepass', 'UNIFEI', 'USER', NOW()),
('Alice Johnson', 'alicejohnson@unifei.edu.br', 'alicepass', 'UNIFEI', 'USER', NOW()),
('Bob Brown', 'bobbrown@unifei.edu.br', 'bobbrown123', 'UNIFEI', 'USER', NOW());
