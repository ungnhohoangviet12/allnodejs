const httpStatus = require('http-status');
const { Lopt } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a lopt
 * @param {Object} loptBody
 * @returns {Promise<Lopt>}
 */
const createLopt = async (loptBody) => {
  
  return Lopt.create(loptBody);
};

/**
 * Query for lopts
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryLopts = async (filter, options) => {
  const lopts = await Lopt.paginate(filter, options);
  return lopts;
};

/**
 * Get lopt by id
 * @param {ObjectId} id
 * @returns {Promise<Lopt>}
 */
const getLoptById = async (id) => {
  return Lopt.findById(id);
};

/**
 * Get lopt by email
 * @param {string} email
 * @returns {Promise<Lopt>}
 */
const getLoptByEmail = async (email) => {
  return Lopt.findOne({ email });
};

/**
 * Update lopt by id
 * @param {ObjectId} loptId
 * @param {Object} updateBody
 * @returns {Promise<Lopt>}
 */
const updateLoptById = async (loptId, updateBody) => {
  const lopt = await getLoptById(loptId);
  if (!lopt) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Lopt not found');
  }
  if (updateBody.email && (await Lopt.isEmailTaken(updateBody.email, loptId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(lopt, updateBody);
  await lopt.save();
  return lopt;
};

/**
 * Delete lopt by id
 * @param {ObjectId} loptId
 * @returns {Promise<Lopt>}
 */
const deleteLoptById = async (loptId) => {
  const lopt = await getLoptById(loptId);
  if (!lopt) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Lopt not found');
  }
  await lopt.remove();
  return lopt;
};

module.exports = {
  createLopt,
  queryLopts,
  getLoptById,
  getLoptByEmail,
  updateLoptById,
  deleteLoptById,
};
