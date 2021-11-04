const express = require('express');
const detaiController = require('../../controllers/detai.controller');

const router = express.Router();

router
  .route('/')
  .post(detaiController.createDetai)
  .get(detaiController.getDetais);

router
  .route('/:detaiId')
  .get(detaiController.getDetai)
  .patch(detaiController.updateDetai)
  .delete(detaiController.deleteDetai);

module.exports = router;

