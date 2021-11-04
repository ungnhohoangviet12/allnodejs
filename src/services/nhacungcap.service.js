const httpStatus = require('http-status');
const { Nhacungcap } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a nhacungcap
 * @param {Object} nhacungcapBody
 * @returns {Promise<Nhacungcap>}
 */
const createNhacungcap = async (nhacungcapBody) => {

  return Nhacungcap.create(nhacungcapBody);
};

/**
 * Query for nhacungcaps
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryNhacungcaps = async (filter, options) => {
  const nhacungcaps = await Nhacungcap.paginate(filter, options);
  return nhacungcaps;
};

/**
 * Get nhacungcap by id
 * @param {ObjectId} id
 * @returns {Promise<Nhacungcap>}
 */
const getNhacungcapById = async (id) => {
  return Nhacungcap.findById(id);
};

/**
 * Get nhacungcap by email
 * @param {string} email
 * @returns {Promise<Nhacungcap>}
 */
const getNhacungcapByEmail = async (email) => {
  return Nhacungcap.findOne({ email });
};

/**
 * Update nhacungcap by id
 * @param {ObjectId} nhacungcapId
 * @param {Object} updateBody
 * @returns {Promise<Nhacungcap>}
 */
const updateNhacungcapById = async (nhacungcapId, updateBody) => {
  const nhacungcap = await getNhacungcapById(nhacungcapId);
  if (!nhacungcap) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Nhacungcap not found');
  }
  if (updateBody.email && (await Nhacungcap.isEmailTaken(updateBody.email, nhacungcapId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(nhacungcap, updateBody);
  await nhacungcap.save();
  return nhacungcap;
};

/**
 * Delete nhacungcap by id
 * @param {ObjectId} nhacungcapId
 * @returns {Promise<Nhacungcap>}
 */
const deleteNhacungcapById = async (nhacungcapId) => {
  const nhacungcap = await getNhacungcapById(nhacungcapId);
  if (!nhacungcap) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Nhacungcap not found');
  }
  await nhacungcap.remove();
  return nhacungcap;
};

module.exports = {
  createNhacungcap,
  queryNhacungcaps,
  getNhacungcapById,
  getNhacungcapByEmail,
  updateNhacungcapById,
  deleteNhacungcapById,
};
