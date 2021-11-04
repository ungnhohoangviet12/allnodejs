const httpStatus = require('http-status');
const { Loaidichvu } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a loaidichvu
 * @param {Object} loaidichvuBody
 * @returns {Promise<Loaidichvu>}
 */
const createLoaidichvu = async (loaidichvuBody) => {

  return Loaidichvu.create(loaidichvuBody);
};

/**
 * Query for loaidichvus
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryLoaidichvus = async (filter, options) => {
  const loaidichvus = await Loaidichvu.paginate(filter, options);
  return loaidichvus;
};

/**
 * Get loaidichvu by id
 * @param {ObjectId} id
 * @returns {Promise<Loaidichvu>}
 */
const getLoaidichvuById = async (id) => {
  return Loaidichvu.findById(id);
};

/**
 * Get loaidichvu by email
 * @param {string} email
 * @returns {Promise<Loaidichvu>}
 */
const getLoaidichvuByEmail = async (email) => {
  return Loaidichvu.findOne({ email });
};

/**
 * Update loaidichvu by id
 * @param {ObjectId} loaidichvuId
 * @param {Object} updateBody
 * @returns {Promise<Loaidichvu>}
 */
const updateLoaidichvuById = async (loaidichvuId, updateBody) => {
  const loaidichvu = await getLoaidichvuById(loaidichvuId);
  if (!loaidichvu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Loaidichvu not found');
  }
  if (updateBody.email && (await Loaidichvu.isEmailTaken(updateBody.email, loaidichvuId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(loaidichvu, updateBody);
  await loaidichvu.save();
  return loaidichvu;
};

/**
 * Delete loaidichvu by id
 * @param {ObjectId} loaidichvuId
 * @returns {Promise<Loaidichvu>}
 */
const deleteLoaidichvuById = async (loaidichvuId) => {
  const loaidichvu = await getLoaidichvuById(loaidichvuId);
  if (!loaidichvu) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Loaidichvu not found');
  }
  await loaidichvu.remove();
  return loaidichvu;
};

module.exports = {
  createLoaidichvu,
  queryLoaidichvus,
  getLoaidichvuById,
  getLoaidichvuByEmail,
  updateLoaidichvuById,
  deleteLoaidichvuById,
};
