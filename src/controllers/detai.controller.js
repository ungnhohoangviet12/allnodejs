const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { detaiService } = require('../services');

const createDetai = catchAsync(async (req, res) => {
  const detai = await detaiService.createDetai(req.body);
  res.status(httpStatus.CREATED).send(detai);
});

const getDetais = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['madt', 'tendt', 'kinhphi', 'noithuctap']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await detaiService.queryDetais(filter, options);
  res.send(result);
});

const getDetai = catchAsync(async (req, res) => {
  const detai = await detaiService.getDetaiById(req.params.detaiId);
  if (!detai) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Detai not found');
  }
  res.send(detai);
});

const updateDetai = catchAsync(async (req, res) => {
  const detai = await detaiService.updateDetaiById(req.params.detaiId, req.body);
  res.send(detai);
});

const deleteDetai = catchAsync(async (req, res) => {
  await detaiService.deleteDetaiById(req.params.detaiId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createDetai,
  getDetais,
  getDetai,
  updateDetai,
  deleteDetai,
};
