CREATE TABLE Anunciante (
    Id INT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    CPF VARCHAR(11) UNIQUE NOT NULL,
    Email VARCHAR(100) UNIQUE NOT NULL,
    SenhaHash VARCHAR(255) NOT NULL,
    Telefone VARCHAR(15)
);

CREATE TABLE Anuncio (
    Id INT PRIMARY KEY,
    Marca VARCHAR(50) NOT NULL,
    Modelo VARCHAR(50) NOT NULL,
    Ano INT NOT NULL,
    Cor VARCHAR(20),
    Quilometragem INT,
    Descricao TEXT,
    Valor DECIMAL(10, 2),
    DataHora DATETIME NOT NULL,
    Estado VARCHAR(2),
    Cidade VARCHAR(100),
    IdAnunciante INT NOT NULL,
    FOREIGN KEY (IdAnunciante) REFERENCES Anunciante(Id)
);

CREATE TABLE Foto (
    Id INT PRIMARY KEY,
    IdAnuncio INT NOT NULL,
    NomeArqFoto VARCHAR(255) NOT NULL,
    FOREIGN KEY (IdAnuncio) REFERENCES Anuncio(Id)
);

CREATE TABLE Interesse (
    Id INT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Telefone VARCHAR(15),
    Mensagem TEXT,
    DataHora DATETIME NOT NULL,
    IdAnuncio INT NOT NULL,
    FOREIGN KEY (IdAnuncio) REFERENCES Anuncio(Id)
);
