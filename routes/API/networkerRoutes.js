const router = require('express').Router();
const {
  getNetworkers,
  getSingleNetworker,
  createNetworker,
  deleteNetworker,
  addIdea,
  removeIdea,
} = require('../../controllers/networkerController');


router.route('/').get(getNetworkers).post(createNetworker);


router.route('/:networkerId').get(getSingleNetworker).delete(deleteNetworker);


router.route('/:networkerId/ideas').post(addIdea);


router.route('/:networkerId/ideas/:ideaId').delete(removeIdea);

module.exports = router;
