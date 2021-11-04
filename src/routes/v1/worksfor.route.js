const express = require('express');
const worksforController = require('../../controllers/worksfor.controller');

const router = express.Router();

router
  .route('/')
  .post(worksforController.createWorksfor)
  .get(worksforController.getWorksfors);

router
  .route('/:worksforId')
  .get(worksforController.getWorksfor)
  .patch(worksforController.updateWorksfor)
  .delete(worksforController.deleteWorksfor);

module.exports = router;

