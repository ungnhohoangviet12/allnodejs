const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { dangkicungcapService } = require('../services');

const createDangkicungcap = catchAsync(async (req, res) => {
  const dangkicungcap = await dangkicungcapService.createDangkicungcap(req.body);
  res.status(httpStatus.CREATED).send(dangkicungcap);
});

const getDangkicungcaps = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['madkcc', 'manhacc','maloaidv','dongxe','ngaybatdaucungcap','ngayketthuccungcap','mamp','soluongxedangky']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await dangkicungcapService.queryDangkicungcaps(filter, options);
  res.send(result);
});

const getDangkicungcap = catchAsync(async (req, res) => {
  const dangkicungcap = await dangkicungcapService.getDangkicungcapById(req.params.dangkicungcapId);
  if (!dangkicungcap) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dangkicungcap not found');
  }
  res.send(dangkicungcap);
});

const updateDangkicungcap = catchAsync(async (req, res) => {
  const dangkicungcap = await dangkicungcapService.updateDangkicungcapById(req.params.dangkicungcapId, req.body);
  res.send(dangkicungcap);
});

const deleteDangkicungcap = catchAsync(async (req, res) => {
  await dangkicungcapService.deleteDangkicungcapById(req.params.dangkicungcapId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createDangkicungcap,
  getDangkicungcaps,
  getDangkicungcap,
  updateDangkicungcap,
  deleteDangkicungcap,
};
