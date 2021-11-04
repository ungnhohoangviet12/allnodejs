const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { loptService } = require('../services');

const createLopt = catchAsync(async (req, res) => {
  const lopt = await loptService.createLopt(req.body);
  res.status(httpStatus.CREATED).send(lopt);
});

const getLopts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await loptService.queryLopts(filter, options);
  res.send(result);
});

const getLopt = catchAsync(async (req, res) => {
  const lopt = await loptService.getLoptById(req.params.loptId);
  if (!lopt) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Lopt not found');
  }
  res.send(lopt);
});

const updateLopt = catchAsync(async (req, res) => {
  const lopt = await loptService.updateLoptById(req.params.loptId, req.body);
  res.send(lopt);
});

const deleteLopt = catchAsync(async (req, res) => {
  await loptService.deleteLoptById(req.params.loptId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createLopt,
  getLopts,
  getLopt,
  updateLopt,
  deleteLopt,
};
