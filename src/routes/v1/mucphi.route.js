const express = require('express');
const mucphiController = require('../../controllers/mucphi.controller');

const router = express.Router();

router
  .route('/')
  .post(mucphiController.createMucphi)
  .get(mucphiController.getMucphis);

router
  .route('/:mucphiId')
  .get(mucphiController.getMucphi)
  .patch(mucphiController.updateMucphi)
  .delete(mucphiController.deleteMucphi);

module.exports = router;

