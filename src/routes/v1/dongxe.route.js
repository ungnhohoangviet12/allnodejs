const express = require('express');
const dongxeController = require('../../controllers/dongxe.controller');

const router = express.Router();

router
  .route('/')
  .post(dongxeController.createDongxe)
  .get(dongxeController.getDongxes)

router
  .route('/:dongxeId')
  .get(dongxeController.getDongxe)
  .patch(dongxeController.updateDongxe)
  .delete(dongxeController.deleteDongxe);


  router
  .route('/:sochongoi')
  .get(dongxeController.getDongxee)



module.exports = router;

