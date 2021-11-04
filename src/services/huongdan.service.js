const httpStatus = require('http-status');
const { Huongdan } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a huongdan
 * @param {Object} huongdanBody
 * @returns {Promise<Huongdan>}
 */
const createHuongdan = async (huongdanBody) => {

  return Huongdan.create(huongdanBody);
};

/**
 * Query for huongdans
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryHuongdans = async (filter, options) => {
  const huongdans = await Huongdan.paginate(filter, options);
  return huongdans;
};

/**
 * Get huongdan by id
 * @param {ObjectId} id
 * @returns {Promise<Huongdan>}
 */
const getHuongdanById = async (id) => {
  return Huongdan.findById(id);
};

/**
 * Get huongdan by email
 * @param {string} email
 * @returns {Promise<Huongdan>}
 */
const getHuongdanByEmail = async (email) => {
  return Huongdan.findOne({ email });
};

/**
 * Update huongdan by id
 * @param {ObjectId} huongdanId
 * @param {Object} updateBody
 * @returns {Promise<Huongdan>}
 */
const updateHuongdanById = async (huongdanId, updateBody) => {
  const huongdan = await getHuongdanById(huongdanId);
  if (!huongdan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Huongdan not found');
  }
  if (updateBody.email && (await Huongdan.isEmailTaken(updateBody.email, huongdanId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(huongdan, updateBody);
  await huongdan.save();
  return huongdan;
};

/**
 * Delete huongdan by id
 * @param {ObjectId} huongdanId
 * @returns {Promise<Huongdan>}
 */
const deleteHuongdanById = async (huongdanId) => {
  const huongdan = await getHuongdanById(huongdanId);
  if (!huongdan) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Huongdan not found');
  }
  await huongdan.remove();
  return huongdan;
};

module.exports = {
  createHuongdan,
  queryHuongdans,
  getHuongdanById,
  getHuongdanByEmail,
  updateHuongdanById,
  deleteHuongdanById,
};
