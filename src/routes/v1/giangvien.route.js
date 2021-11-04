const express = require('express');
const giangvienController = require('../../controllers/giangvien.controller');

const router = express.Router();

router
  .route('/')
  .post(giangvienController.createGiangvien)
  .get(giangvienController.getGiangviens);

router
  .route('/:giangvienId')
  .get(giangvienController.getGiangvien)
  .patch(giangvienController.updateGiangvien)
  .delete(giangvienController.deleteGiangvien);

module.exports = router;

