const express = require('express');
const dangkicungcapController = require('../../controllers/dangkicungcap.controller');

const router = express.Router();

router
  .route('/')
  .post(dangkicungcapController.createDangkicungcap)
  .get(dangkicungcapController.getDangkicungcaps);

router
  .route('/:dangkicungcapId')
  .get(dangkicungcapController.getDangkicungcap)
  .patch(dangkicungcapController.updateDangkicungcap)
  .delete(dangkicungcapController.deleteDangkicungcap);

module.exports = router;

