require('dotenv').config();
const express = require('express');
const spaceRoutes = require('./routes/space.routes');
const bookingRoutes = require('./routes/booking.routes');

const app = express();
const port = Number(process.env.PORT || 5000);
app.use(express.json());
app.use(express.static('public'));
app.use('/api/spaces', spaceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use((error, req, res, next) => {
  console.error(error.message);
  res.status(500).json({ error: 'Error interno del servidor.' });
});
if (require.main === module) {
  app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
}
module.exports = app;
