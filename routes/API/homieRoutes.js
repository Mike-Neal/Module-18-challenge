const router = require('express').Router();
const {
  getHomies,
  getSingleHomie,
  createHomie,
  updateHomie,
  deleteHomie,
} = require('../../controllers/homieController.js');


router.route('/').get(getHomies).post(createHomie);


router
  .route('/:homieId')
  .get(getSingleHomie)
  .put(updateHomie)
  .delete(deleteHomie);

module.exports = router;
