const httpStatus = require('http-status');
const { Detai } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a detai
 * @param {Object} detaiBody
 * @returns {Promise<Detai>}
 */
const createDetai = async (detaiBody) => {

  return Detai.create(detaiBody);
};

/**
 * Query for detais
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryDetais = async (filter, options) => {
  const detais = await Detai.paginate(filter, options);
  return detais;
};

/**
 * Get detai by id
 * @param {ObjectId} id
 * @returns {Promise<Detai>}
 */
const getDetaiById = async (id) => {
  return Detai.findById(id);
};

/**
 * Get detai by email
 * @param {string} email
 * @returns {Promise<Detai>}
 */
const getDetaiByEmail = async (email) => {
  return Detai.findOne({ email });
};

/**
 * Update detai by id
 * @param {ObjectId} detaiId
 * @param {Object} updateBody
 * @returns {Promise<Detai>}
 */
const updateDetaiById = async (detaiId, updateBody) => {
  const detai = await getDetaiById(detaiId);
  if (!detai) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Detai not found');
  }
  if (updateBody.email && (await Detai.isEmailTaken(updateBody.email, detaiId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(detai, updateBody);
  await detai.save();
  return detai;
};

/**
 * Delete detai by id
 * @param {ObjectId} detaiId
 * @returns {Promise<Detai>}
 */
const deleteDetaiById = async (detaiId) => {
  const detai = await getDetaiById(detaiId);
  if (!detai) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Detai not found');
  }
  await detai.remove();
  return detai;
};

module.exports = {
  createDetai,
  queryDetais,
  getDetaiById,
  getDetaiByEmail,
  updateDetaiById,
  deleteDetaiById,
};
