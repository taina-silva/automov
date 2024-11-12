CREATE TABLE anunciante (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    telefone VARCHAR(15) NOT NULL
);

CREATE TABLE anuncio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(50) NOT NULL,
    modelo VARCHAR(50) NOT NULL,
    ano INT NOT NULL,
    cor VARCHAR(20),
    quilometragem INT,
    descricao TEXT,
    valor DECIMAL(10, 2),
    dataHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(2),
    cidade VARCHAR(100),
    idAnunciante INT NOT NULL,
    FOREIGN KEY (idAnunciante) REFERENCES anunciante(id)
);

CREATE TABLE foto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idAnuncio INT NOT NULL,
    caminho VARCHAR(255) NOT NULL,
    FOREIGN KEY (idAnuncio) REFERENCES anuncio(id)
);

CREATE TABLE interesse (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(15),
    mensagem TEXT,
    dataHora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    idAnuncio INT NOT NULL,
    FOREIGN KEY (idAnuncio) REFERENCES anuncio(id)
);
