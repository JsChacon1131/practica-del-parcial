# Cultural Space Booking

Node.js + Express + MySQL, with separate databases for patrimony and reservations.

## Setup

1. Install Node.js and MySQL.
2. Execute `sql/patrimonio.sql` and `sql/reservas.sql` in MySQL Workbench (each script independently).
3. Run `npm install` in the project root.
4. Copy `.env.example` to `.env`; set the local database credentials.
5. Run `npm start` and open `http://localhost:5000`.

## API

- `GET /api/spaces`: list spaces.
- `POST /api/spaces`: create a space.
- `POST /api/bookings`: create a pending booking after validation.
- `GET /api/bookings/:id`: view booking status.
- `PATCH /api/bookings/:id`: approve a pending booking with `{"status":"APPROVED"}`.

## Booking workflow

A new reservation starts in `PENDING`. Before insertion, the system checks whether its space exists, is operational, has sufficient capacity, and lacks overlapping approved reservations. Approval checks these rules again. The approval operation serializes concurrent approvals through a lock row to prevent two overlapping bookings from being approved simultaneously. The two databases remain separate: `bookings.space_id` is a logical reference, not a cross-database foreign key.

## Diagrams

`academico.png` shows the `patrimonio` ER diagram; `repositorio.png` shows the `reservas` ER diagram. These unusual diagram filenames match the exam delivery instructions.
