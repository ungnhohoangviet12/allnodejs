const express = require('express');
const huongdanController = require('../../controllers/huongdan.controller');

const router = express.Router();

router
  .route('/')
  .post(huongdanController.createHuongdan)
  .get(huongdanController.getHuongdans);

router
  .route('/:huongdanId')
  .get(huongdanController.getHuongdan)
  .patch(huongdanController.updateHuongdan)
  .delete(huongdanController.deleteHuongdan);

module.exports = router;

