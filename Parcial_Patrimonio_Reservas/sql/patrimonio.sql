CREATE DATABASE IF NOT EXISTS patrimonio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE patrimonio;
CREATE TABLE IF NOT EXISTS cultural_spaces (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  location VARCHAR(150) NOT NULL,
  max_capacity INT NOT NULL,
  conservation_status ENUM('OPERATIONAL','MAINTENANCE','CLOSED') NOT NULL,
  administrative_unit VARCHAR(150) NOT NULL,
  CHECK (max_capacity > 0)
);
