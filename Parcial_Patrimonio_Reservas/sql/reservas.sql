CREATE DATABASE IF NOT EXISTS reservas CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE reservas;
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  space_id INT NOT NULL,
  organization_name VARCHAR(150) NOT NULL,
  attendee_count INT NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  status ENUM('PENDING','APPROVED','REJECTED','CANCELLED') NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_booking_slot (space_id, status, start_time, end_time),
  CHECK (attendee_count > 0),
  CHECK (start_time < end_time)
);
CREATE TABLE IF NOT EXISTS booking_locks (
  id TINYINT PRIMARY KEY
);
INSERT IGNORE INTO booking_locks (id) VALUES (1);
