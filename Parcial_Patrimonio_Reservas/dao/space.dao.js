const db = require('../services/patrimony.service');

async function createSpace(space) {
  const [result] = await db.execute(
    'INSERT INTO cultural_spaces (name, location, max_capacity, conservation_status, administrative_unit) VALUES (?, ?, ?, ?, ?)',
    [space.name, space.location, space.maxCapacity, space.conservationStatus, space.administrativeUnit]
  );
  return result.insertId;
}

async function findSpaceById(spaceId) {
  const [rows] = await db.execute('SELECT * FROM cultural_spaces WHERE id = ?', [spaceId]);
  return rows[0] || null;
}

async function listSpaces() {
  const [rows] = await db.query('SELECT * FROM cultural_spaces ORDER BY id DESC');
  return rows;
}

module.exports = { createSpace, findSpaceById, listSpaces };
