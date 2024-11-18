CREATE TABLE IF NOT EXISTS institution (
    id INTEGER AUTO_INCREMENT UNIQUE,
    name VARCHAR(255) NOT NULL,
    sigla VARCHAR(15) NOT NULL,
    creationdate DATETIME NOT NULL,
    PRIMARY KEY (sigla),
    UNIQUE (id)
);

CREATE TABLE IF NOT EXISTS professors (
    id INTEGER AUTO_INCREMENT UNIQUE,
    registrationnumber VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(255) NOT NULL,
    title ENUM('Specialist', 'Master', 'Doctor'),
    institutionfk VARCHAR(15),
    creationdate DATETIME NOT NULL,
    FOREIGN KEY (institutionfk) REFERENCES institution (sigla),
    PRIMARY KEY (registrationnumber),
    UNIQUE (id)
);

CREATE TABLE IF NOT EXISTS courses (
    id INTEGER AUTO_INCREMENT UNIQUE,
    name VARCHAR(50) NOT NULL,
    code VARCHAR(15),
    duration INTEGER NOT NULL,
    description VARCHAR(255),
    institutionfk VARCHAR(15),
    creationdate DATETIME NOT NULL,
    FOREIGN KEY (institutionfk) REFERENCES institution (sigla),
    PRIMARY KEY (code),
    UNIQUE (id)
);

CREATE TABLE IF NOT EXISTS disciplines (
    id INTEGER AUTO_INCREMENT UNIQUE,
    code VARCHAR(255),
    name VARCHAR(50) NOT NULL,
    workload INTEGER NOT NULL,
    period INTEGER NOT NULL,
    description VARCHAR(255),
    creationdate DATETIME NOT NULL,
    coursecode VARCHAR(15),
    institutionfk VARCHAR(15),
    FOREIGN KEY (coursecode) REFERENCES courses (code),
    FOREIGN KEY (institutionfk) REFERENCES institution (sigla),
    PRIMARY KEY (code, coursecode),
    UNIQUE (id)
);

CREATE TABLE IF NOT EXISTS professor_discipline (
    id INTEGER AUTO_INCREMENT UNIQUE,
    professorregistration VARCHAR(255) NOT NULL,
    disciplinecode VARCHAR(255) NOT NULL,
    coursecode VARCHAR(15) NOT NULL,
    creationdate DATETIME NOT NULL,
    PRIMARY KEY (professorregistration, disciplinecode, coursecode),
    FOREIGN KEY (professorregistration) REFERENCES professors (registrationnumber),
    FOREIGN KEY (disciplinecode, coursecode) REFERENCES disciplines (code, coursecode),
    UNIQUE (id)
);

CREATE TABLE IF NOT EXISTS users (
    id INTEGER AUTO_INCREMENT UNIQUE, -- Auto incremento para facilitar a identificação
    name VARCHAR(255) NOT NULL, -- Nome do usuário
    email VARCHAR(255) NOT NULL, -- Email do usuário (PK)
    password VARCHAR(255), -- Senha do usuário (pode ser NULL)
    institutionFk VARCHAR(15), -- Referência à tabela institution
    userLevel ENUM('ADMIN', 'USER') NOT NULL, -- Nível do usuário
    creationDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- Data de criação
    PRIMARY KEY (email), -- Chave primária
    FOREIGN KEY (institutionFk) REFERENCES institution(sigla) -- Chave estrangeira
);



-- Inserindo Instituições
INSERT INTO institution (name, sigla, creationdate) VALUES
('Universidade Federal de Itajubá', 'UNIFEI', NOW());

-- Inserindo Cursos
INSERT INTO courses (name, code, duration, description, institutionfk, creationdate) VALUES
('Engenharia de Computação', 'ECOMP', 10, 'Curso de graduação em Engenharia de Computação', 'UNIFEI', NOW()),
('Ciência da Computação', 'CCOMP', 8, 'Curso de graduação em Ciência da Computação', 'UNIFEI', NOW());

-- Inserindo Professores
INSERT INTO professors (registrationnumber, name, email, phone, title, institutionfk, creationdate) VALUES
('P001', 'Dr. João da Silva', 'joao.silva@unifei.edu.br', '(35)99999-0001', 'Doctor', 'UNIFEI', NOW()),
('P002', 'Profa. Maria Oliveira', 'maria.oliveira@unifei.edu.br', '(35)99999-0002', 'Master', 'UNIFEI', NOW()),
('P003', 'Dr. Carlos Pereira', 'carlos.pereira@unifei.edu.br', '(35)99999-0003', 'Doctor', 'UNIFEI', NOW());

-- Inserindo Disciplinas
INSERT INTO disciplines (code, name, workload, period, description, creationdate, coursecode, institutionfk) VALUES
('EC101', 'Algoritmos e Programação', 60, 1, 'Introdução à programação e algoritmos', NOW(), 'ECOMP', 'UNIFEI'),
('EC102', 'Estruturas de Dados', 60, 2, 'Estruturas básicas e avançadas de dados', NOW(), 'ECOMP', 'UNIFEI'),
('EC103', 'Sistemas Operacionais', 60, 3, 'Conceitos e aplicações de sistemas operacionais', NOW(), 'ECOMP', 'UNIFEI'),
('CC101', 'Matemática Discreta', 60, 1, 'Conceitos básicos de matemática discreta', NOW(), 'CCOMP', 'UNIFEI'),
('CC102', 'Banco de Dados', 60, 3, 'Conceitos e aplicações de banco de dados', NOW(), 'CCOMP', 'UNIFEI');

-- Associando Professores a Disciplinas
INSERT INTO professor_discipline (professorregistration, disciplinecode, coursecode, creationdate) VALUES
('P001', 'EC101', 'ECOMP', NOW()),
('P002', 'EC102', 'ECOMP', NOW()),
('P003', 'EC103', 'ECOMP', NOW()),
('P001', 'CC101', 'CCOMP', NOW()),
('P003', 'CC102', 'CCOMP', NOW());

INSERT INTO users (name, email, password, institutionFk, userLevel, creationDate) VALUES
('Admin User', 'admin@unifei.edu.br', 'adminpassword', 'UNIFEI', 'ADMIN', NOW()),
('John Doe', 'johndoe@unifei.edu.br', 'password123', 'UNIFEI', 'USER', NOW()),
('Jane Smith', 'janesmith@unifei.edu.br', 'securepass', 'UNIFEI', 'USER', NOW()),
('Alice Johnson', 'alicejohnson@unifei.edu.br', 'alicepass', 'UNIFEI', 'USER', NOW()),
('Bob Brown', 'bobbrown@unifei.edu.br', 'bobbrown123', 'UNIFEI', 'USER', NOW());
