import mysql.connector
from mysql.connector import Error

def criar_database(nome_database):
    try:
        # Conexão
        conexao = mysql.connector.connect(
            host="localhost",
            user="root",
            password="2018"
        )

        if conexao.is_connected():
            cursor = conexao.cursor()
            # Cria o banco
            cursor.execute(f"CREATE DATABASE {nome_database}")
            print(f"Banco de dados '{nome_database}' criado com sucesso!")
            
            # Usa o banco novo
            cursor.execute(f"USE {nome_database}")
            
            # Cria as tabelas
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS institution
              (
                 id    INTEGER AUTO_INCREMENT,
                 name  VARCHAR(255) NOT NULL,
                 sigla VARCHAR(15) NOT NULL,
                 PRIMARY KEY (sigla),
                 UNIQUE (id)
              );
            """)
            
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS professors
              (
                 id                 INTEGER AUTO_INCREMENT,
                 registrationnumber VARCHAR(255) NOT NULL UNIQUE,
                 name               VARCHAR(255) NOT NULL,
                 email              VARCHAR(255) NOT NULL UNIQUE,
                 phone              VARCHAR(255) NOT NULL,
                 title              ENUM('Specialist', 'Master', 'Doctor') NOT NULL,
                 institutionfk      VARCHAR(15),
                 creationdate       DATETIME,
                 FOREIGN KEY (institutionfk) REFERENCES institution (sigla),
                 PRIMARY KEY (registrationnumber),
                 UNIQUE (id)
              );
            """)
            
            cursor.execute("""
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
                 PRIMARY KEY (code),
                 UNIQUE (id)
              );
            """)
            
            cursor.execute("""
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
                 institutionfk     VARCHAR(15),
                 FOREIGN KEY (coursecode) REFERENCES courses (code),
                 foreign key (institutionfk) references institution (sigla),
                 PRIMARY KEY (code, coursecode),
                 UNIQUE (id)
              );
            """)
            
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS professor_discipline
              (
                 id                    INTEGER auto_increment,
                 professorregistration VARCHAR(255) NOT NULL,
                 disciplinecode        VARCHAR(255) NOT NULL,
                 coursecode            VARCHAR(15) NOT null,
                 PRIMARY KEY (professorregistration, disciplinecode, coursecode),
                 FOREIGN KEY (professorregistration) references professors (registrationnumber),
                 FOREIGN KEY (disciplinecode, coursecode) REFERENCES disciplines (code, coursecode),
                 UNIQUE (id)
              );
            """)

            print(f"Tabelas criadas com sucesso no banco de dados '{nome_database}'!")
            
    except Error as e:
        print(f"Erro ao criar o banco de dados ou tabelas: {e}")
    finally:
        if conexao.is_connected():
            cursor.close()
            conexao.close()
            print("Conexão com o MySQL encerrada.")

nome_db = input("Digite o nome do banco de dados que deseja criar: ")
criar_database(nome_db)
