const test = require('node:test');
const assert = require('node:assert/strict');
const { validateSpace, validateBooking, isPositiveInteger } = require('../services/validators.service');

test('accepts a complete operational space', () => {
  assert.equal(validateSpace({
    name: 'Auditorio Central', location: 'Centro', maxCapacity: 150,
    conservationStatus: 'OPERATIONAL', administrativeUnit: 'Cultura'
  }), true);
});

test('rejects an invalid space capacity', () => {
  assert.equal(validateSpace({
    name: 'Auditorio', location: 'Centro', maxCapacity: -5,
    conservationStatus: 'OPERATIONAL', administrativeUnit: 'Cultura'
  }), false);
});

test('accepts a valid reservation window', () => {
  const booking = validateBooking({
    spaceId: 1, organizationName: 'Fundacion Cultural', attendeeCount: 40,
    startTime: '2026-11-20T09:00', endTime: '2026-11-20T12:00'
  });
  assert.equal(booking.startTime, '2026-11-20 09:00:00');
});

test('rejects reversed or nonexistent reservation dates', () => {
  const booking = { spaceId: 1, organizationName: 'Fundacion Cultural', attendeeCount: 40 };
  assert.equal(validateBooking({ ...booking, startTime: '2026-11-20T12:00', endTime: '2026-11-20T09:00' }), null);
  assert.equal(validateBooking({ ...booking, startTime: '2026-02-30T09:00', endTime: '2026-02-30T12:00' }), null);
});

test('rejects identifiers outside positive safe integers', () => {
  assert.equal(isPositiveInteger(0), false);
  assert.equal(isPositiveInteger(Number.MAX_SAFE_INTEGER + 1), false);
});
