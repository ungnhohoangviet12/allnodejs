const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { loaidichvuService } = require('../services');

const createLoaidichvu = catchAsync(async (req, res) => {
  const loaidichvu = await loaidichvuService.createLoaidichvu(req.body);
  res.status(httpStatus.CREATED).send(loaidichvu);
});

const getLoaidichvus = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['maloaidv', 'tenloaidv']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await loaidichvuService.queryLoaidichvus(filter, options);
  res.send(result);
});

const getLoaidichvu = catchAsync(async (req, res) => {
  const loaidichvu = await loaidichvuService.getLoaidichvuById(req.params.loaidichvuId);
  if (!loaidichvu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Loaidichvu not found');
  }
  res.send(loaidichvu);
});

const updateLoaidichvu = catchAsync(async (req, res) => {
  const loaidichvu = await loaidichvuService.updateLoaidichvuById(req.params.loaidichvuId, req.body);
  res.send(loaidichvu);
});

const deleteLoaidichvu = catchAsync(async (req, res) => {
  await loaidichvuService.deleteLoaidichvuById(req.params.loaidichvuId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createLoaidichvu,
  getLoaidichvus,
  getLoaidichvu,
  updateLoaidichvu,
  deleteLoaidichvu,
};
