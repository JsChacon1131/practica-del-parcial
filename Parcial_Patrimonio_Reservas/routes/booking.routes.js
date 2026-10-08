const express = require('express');
const bookingDao = require('../dao/booking.dao');
const { validateBookingRules } = require('../services/bookingRules.service');
const { validateBooking, isPositiveInteger } = require('../services/validators.service');
const router = express.Router();

router.post('/', async (req, res, next) => {
  const booking = validateBooking(req.body);
  if (!booking) return res.status(400).json({ error: 'Datos de reserva inválidos.' });
  try {
    const violation = await validateBookingRules(booking);
    if (violation) return res.status(violation.status).json({ error: violation.error });
    const id = await bookingDao.createBooking(booking);
    res.status(201).json({ id, status: 'PENDING' });
  } catch (error) { next(error); }
});

router.get('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  if (!isPositiveInteger(id)) return res.status(400).json({ error: 'ID inválido.' });
  try {
    const booking = await bookingDao.findBookingById(id);
    if (!booking) return res.status(404).json({ error: 'Reserva no encontrada.' });
    res.json(booking);
  } catch (error) { next(error); }
});

router.patch('/:id', async (req, res, next) => {
  const id = Number(req.params.id);
  if (!isPositiveInteger(id) || !req.body || req.body.status !== 'APPROVED') {
    return res.status(400).json({ error: 'Solicitud de aprobación inválida.' });
  }
  try {
    const booking = await bookingDao.findBookingById(id);
    if (!booking) return res.status(404).json({ error: 'Reserva no encontrada.' });
    const violation = await validateBookingRules({
      spaceId: booking.space_id, attendeeCount: booking.attendee_count,
      startTime: booking.start_time, endTime: booking.end_time
    });
    if (violation) return res.status(violation.status).json({ error: violation.error });
    const result = await bookingDao.approveBooking(id);
    if (result.kind === 'not_found') return res.status(404).json({ error: 'Reserva no encontrada.' });
    if (result.kind !== 'approved') return res.status(409).json({ error: 'La reserva no puede aprobarse.' });
    res.json({ id, status: 'APPROVED' });
  } catch (error) { next(error); }
});
module.exports = router;
