const express = require('express');
const spaceDao = require('../dao/space.dao');
const { validateSpace } = require('../services/validators.service');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try { res.json(await spaceDao.listSpaces()); } catch (error) { next(error); }
});

router.post('/', async (req, res, next) => {
  if (!validateSpace(req.body)) return res.status(400).json({ error: 'Datos del espacio inválidos.' });
  try {
    const id = await spaceDao.createSpace(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (error) { next(error); }
});
module.exports = router;
