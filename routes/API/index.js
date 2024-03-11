const router = require('express').Router();
const homieRoutes = require('./homieRoutes');
const networkerRoutes = require('./networkerRoutes');

router.use('/homies', homieRoutes);
router.use('/networkers', networkerRoutes);

module.exports = router;
