const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const nhacungcapController = require('../../controllers/nhacungcap.controller');

const router = express.Router();

router
  .route('/')
  .post(nhacungcapController.createNhacungcap)
  .get(nhacungcapController.getNhacungcaps);

router
  .route('/:nhacungcapId')
  .get(nhacungcapController.getNhacungcap)
  .patch(nhacungcapController.updateNhacungcap)
  .delete(nhacungcapController.deleteNhacungcap);

module.exports = router;

