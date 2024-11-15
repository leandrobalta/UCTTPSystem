CREATE TABLE IF NOT EXISTS institution
  (
     id    INTEGER auto_increment,
     name  VARCHAR(255) NOT NULL,
     sigla VARCHAR(15),
     PRIMARY KEY (sigla)
  )
engine=innodb;

CREATE TABLE IF NOT EXISTS professors
  (
     id                 INTEGER auto_increment,
     registrationnumber VARCHAR(255) NOT NULL UNIQUE,
     name               VARCHAR(255) NOT NULL,
     email              VARCHAR(255) NOT NULL UNIQUE,
     phone              VARCHAR(255) NOT NULL,
     title              ENUM('Specialist', 'Master', 'Doctor') NOT NULL,
     institutionfk      VARCHAR(15),
     creationdate       DATETIME,
     FOREIGN KEY (institutionfk) REFERENCES institution (sigla),
     PRIMARY KEY (registrationnumber, institutionfk)
  )
engine=innodb;

CREATE TABLE IF NOT EXISTS courses
  (
     id            INTEGER auto_increment,
     name          VARCHAR(50) NOT NULL,
     code          VARCHAR(15),
     duration      INTEGER NOT NULL,
     description   VARCHAR(255),
     institutionfk VARCHAR(15),
     creationdate  DATETIME NOT NULL,
     FOREIGN KEY (institutionfk) REFERENCES institution (sigla),
     PRIMARY KEY (code, institutionfk)
  )
engine=innodb;

CREATE TABLE IF NOT EXISTS disciplines
  (
     id                INTEGER auto_increment,
     code              VARCHAR(255),
     name              VARCHAR(50) NOT NULL,
     workload          INTEGER NOT NULL,
     period            INTEGER NOT NULL,
     description       VARCHAR(255),
     creationdate      DATETIME NOT NULL,
     coursecode        VARCHAR(15),
     courseinstitution VARCHAR(15),
     FOREIGN KEY (coursecode, courseinstitution) REFERENCES courses (code,
     instituionfk),
     PRIMARY KEY (code, coursecode, courseinstitution)
  )
engine=innodb;

CREATE TABLE IF NOT EXISTS professor_discipline
  (
     professorregistration VARCHAR(255) NOT NULL,
     professorinstitution  VARCHAR(15) NOT NULL,
     disciplinecode        VARCHAR(255) NOT NULL,
     coursecode            VARCHAR(15) NOT NULL,
     courseinstitution     VARCHAR(15) NOT NULL,
     PRIMARY KEY (professorregistration, professorinstitution, disciplinecode,
     coursecode, courseinstitution),
     FOREIGN KEY (professorregistration, professorinstitution) REFERENCES
     professors (registrationnumber, institutionfk),
     FOREIGN KEY (disciplinecode, coursecode, courseinstitution) REFERENCES
     disciplines (code, coursecode, courseinstitution)
  )
engine=innodb; 
