CREATE DATABASE ArtemiScore;
use ArtemiScore;

CREATE TABLE IF NOT EXISTS usuarios (
   id BIGINT AUTO_INCREMENT PRIMARY KEY,
   nome VARCHAR(255) NOT NULL,
   email VARCHAR(255) UNIQUE NOT NULL,
   senha VARCHAR(255) NOT NULL,
   bio VARCHAR(300),
   foto_perfil LONGTEXT,
   data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
   preferencias_jogos VARCHAR(800),
   plataformas_utilizadas VARCHAR(800)
);

CREATE TABLE IF NOT EXISTS avaliacoes (
  id BIGINT PRIMARY KEY auto_increment,
  usuario_id BIGINT NOT NULL,
  jogo_id BIGINT NOT NULL, -- id do jogo na API RAWG
  nota DOUBLE NOT NULL,
  comentario TEXT,
   tempoDeJogo INT,
   plataforma CHAR(255) NOT NULL,
  data_avaliacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
);
