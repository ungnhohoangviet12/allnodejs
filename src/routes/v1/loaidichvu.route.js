const express = require('express');
const loaidichvuController = require('../../controllers/loaidichvu.controller');

const router = express.Router();

router
  .route('/')
  .post(loaidichvuController.createLoaidichvu)
  .get(loaidichvuController.getLoaidichvus);

router
  .route('/:loaidichvuId')
  .get(loaidichvuController.getLoaidichvu)
  .patch(loaidichvuController.updateLoaidichvu)
  .delete(loaidichvuController.deleteLoaidichvu);

module.exports = router;

