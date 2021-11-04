const express = require('express');
const loptController = require('../../controllers/lopt.controller');

const router = express.Router();

router
  .route('/')
  .post(loptController.createLopt)
  .get(loptController.getLopts);

router
  .route('/:loptId')
  .get(loptController.getLopt)
  .patch(loptController.updateLopt)
  .delete(loptController.deleteLopt);

module.exports = router;

