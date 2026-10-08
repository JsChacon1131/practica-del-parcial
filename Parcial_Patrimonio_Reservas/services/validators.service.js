const SQL_DATE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
const isPositiveInteger = value => Number.isSafeInteger(value) && value > 0;
const isText = value => typeof value === 'string' && value.trim().length > 0 && value.length <= 150;

function validateSpace(body) {
  return body && isText(body.name) && isText(body.location) &&
    isPositiveInteger(body.maxCapacity) && isText(body.administrativeUnit) &&
    ['OPERATIONAL', 'MAINTENANCE', 'CLOSED'].includes(body.conservationStatus);
}

function toSqlDate(value) {
  if (typeof value !== 'string' || !SQL_DATE.test(value)) return null;
  const parsed = new Date(value + ':00Z');
  if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 16) !== value) return null;
  return value.replace('T', ' ') + ':00';
}

function validateBooking(body) {
  if (!body || !isPositiveInteger(body.spaceId) || !isText(body.organizationName) ||
      !isPositiveInteger(body.attendeeCount)) return null;
  const startTime = toSqlDate(body.startTime);
  const endTime = toSqlDate(body.endTime);
  if (!startTime || !endTime || startTime >= endTime) return null;
  return { spaceId: body.spaceId, organizationName: body.organizationName.trim(),
    attendeeCount: body.attendeeCount, startTime, endTime };
}

module.exports = { validateSpace, validateBooking, isPositiveInteger };
