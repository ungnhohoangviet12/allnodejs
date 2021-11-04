const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { huongdanService } = require('../services');

const createHuongdan = catchAsync(async (req, res) => {
  const huongdan = await huongdanService.createHuongdan(req.body);
  res.status(httpStatus.CREATED).send(huongdan);
});

const getHuongdans = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await huongdanService.queryHuongdans(filter, options);
  res.send(result);
});

const getHuongdan = catchAsync(async (req, res) => {
  const huongdan = await huongdanService.getHuongdanById(req.params.huongdanId);
  if (!huongdan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Huongdan not found');
  }
  res.send(huongdan);
});

const updateHuongdan = catchAsync(async (req, res) => {
  const huongdan = await huongdanService.updateHuongdanById(req.params.huongdanId, req.body);
  res.send(huongdan);
});

const deleteHuongdan = catchAsync(async (req, res) => {
  await huongdanService.deleteHuongdanById(req.params.huongdanId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createHuongdan,
  getHuongdans,
  getHuongdan,
  updateHuongdan,
  deleteHuongdan,
};
