const httpStatus = require('http-status');
const { Dangkicungcap } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a dangkicungcap
 * @param {Object} dangkicungcapBody
 * @returns {Promise<Dangkicungcap>}
 */
const createDangkicungcap = async (dangkicungcapBody) => {

  return Dangkicungcap.create(dangkicungcapBody);
};

/**
 * Query for dangkicungcaps
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryDangkicungcaps = async (filter, options) => {
  const dangkicungcaps = await Dangkicungcap.paginate(filter, options);
  return dangkicungcaps;
};

/**
 * Get dangkicungcap by id
 * @param {ObjectId} id
 * @returns {Promise<Dangkicungcap>}
 */
const getDangkicungcapById = async (id) => {
  return Dangkicungcap.findById(id);
};

/**
 * Get dangkicungcap by email
 * @param {string} email
 * @returns {Promise<Dangkicungcap>}
 */
const getDangkicungcapByEmail = async (email) => {
  return Dangkicungcap.findOne({ email });
};

/**
 * Update dangkicungcap by id
 * @param {ObjectId} dangkicungcapId
 * @param {Object} updateBody
 * @returns {Promise<Dangkicungcap>}
 */
const updateDangkicungcapById = async (dangkicungcapId, updateBody) => {
  const dangkicungcap = await getDangkicungcapById(dangkicungcapId);
  if (!dangkicungcap) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dangkicungcap not found');
  }
  if (updateBody.email && (await Dangkicungcap.isEmailTaken(updateBody.email, dangkicungcapId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(dangkicungcap, updateBody);
  await dangkicungcap.save();
  return dangkicungcap;
};

/**
 * Delete dangkicungcap by id
 * @param {ObjectId} dangkicungcapId
 * @returns {Promise<Dangkicungcap>}
 */
const deleteDangkicungcapById = async (dangkicungcapId) => {
  const dangkicungcap = await getDangkicungcapById(dangkicungcapId);
  if (!dangkicungcap) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dangkicungcap not found');
  }
  await dangkicungcap.remove();
  return dangkicungcap;
};

module.exports = {
  createDangkicungcap,
  queryDangkicungcaps,
  getDangkicungcapById,
  getDangkicungcapByEmail,
  updateDangkicungcapById,
  deleteDangkicungcapById,
};
