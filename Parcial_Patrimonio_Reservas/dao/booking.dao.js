const db = require('../services/booking.service');

async function findBookingById(bookingId) {
  const [rows] = await db.execute('SELECT * FROM bookings WHERE id = ?', [bookingId]);
  return rows[0] || null;
}

async function createBooking(booking) {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const [result] = await connection.execute(
      'INSERT INTO bookings (space_id, organization_name, attendee_count, start_time, end_time, status) VALUES (?, ?, ?, ?, ?, ?)',
      [booking.spaceId, booking.organizationName, booking.attendeeCount, booking.startTime, booking.endTime, 'PENDING']
    );
    await connection.commit();
    return result.insertId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

async function hasApprovedOverlap(spaceId, startTime, endTime, connection = db, excludedId = null) {
  const [rows] = await connection.execute(
    `SELECT id FROM bookings
     WHERE space_id = ? AND status = 'APPROVED'
       AND start_time < ? AND end_time > ?
       AND (? IS NULL OR id <> ?) LIMIT 1`,
    [spaceId, endTime, startTime, excludedId, excludedId]
  );
  return rows.length > 0;
}

async function approveBooking(bookingId) {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const [locks] = await connection.execute('SELECT id FROM booking_locks WHERE id = 1 FOR UPDATE');
    if (!locks.length) throw new Error('Missing booking lock row');
    const [rows] = await connection.execute('SELECT * FROM bookings WHERE id = ? FOR UPDATE', [bookingId]);
    const booking = rows[0];
    if (!booking) { await connection.rollback(); return { kind: 'not_found' }; }
    if (booking.status !== 'PENDING') { await connection.rollback(); return { kind: 'invalid_state' }; }
    if (await hasApprovedOverlap(booking.space_id, booking.start_time, booking.end_time, connection, bookingId)) {
      await connection.rollback();
      return { kind: 'conflict' };
    }
    await connection.execute("UPDATE bookings SET status = 'APPROVED' WHERE id = ?", [bookingId]);
    await connection.commit();
    return { kind: 'approved' };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

module.exports = { findBookingById, createBooking, hasApprovedOverlap, approveBooking };
