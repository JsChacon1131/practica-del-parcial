const spaceDao = require('../dao/space.dao');
const bookingDao = require('../dao/booking.dao');

async function validateBookingRules(booking) {
  const space = await spaceDao.findSpaceById(booking.spaceId);
  if (!space) return { status: 404, error: 'El espacio cultural no existe.' };
  if (space.conservation_status !== 'OPERATIONAL') {
    return { status: 409, error: 'El espacio no está operativo.' };
  }
  if (booking.attendeeCount > space.max_capacity) {
    return { status: 409, error: 'El aforo solicitado supera la capacidad máxima.' };
  }
  if (await bookingDao.hasApprovedOverlap(booking.spaceId, booking.startTime, booking.endTime)) {
    return { status: 409, error: 'Existe una reserva aprobada en ese horario.' };
  }
  return null;
}
module.exports = { validateBookingRules };
