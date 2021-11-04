const httpStatus = require('http-status');
const { Mucphi } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a mucphi
 * @param {Object} mucphiBody
 * @returns {Promise<Mucphi>}
 */
const createMucphi = async (mucphiBody) => {

  return Mucphi.create(mucphiBody);
};

/**
 * Query for mucphis
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryMucphis = async (filter, options) => {
  const mucphis = await Mucphi.paginate(filter, options);
  return mucphis;
};

/**
 * Get mucphi by id
 * @param {ObjectId} id
 * @returns {Promise<Mucphi>}
 */
const getMucphiById = async (id) => {
  return Mucphi.findById(id);
};

/**
 * Get mucphi by email
 * @param {string} email
 * @returns {Promise<Mucphi>}
 */
const getMucphiByEmail = async (email) => {
  return Mucphi.findOne({ email });
};

/**
 * Update mucphi by id
 * @param {ObjectId} mucphiId
 * @param {Object} updateBody
 * @returns {Promise<Mucphi>}
 */
const updateMucphiById = async (mucphiId, updateBody) => {
  const mucphi = await getMucphiById(mucphiId);
  if (!mucphi) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Mucphi not found');
  }
  if (updateBody.email && (await Mucphi.isEmailTaken(updateBody.email, mucphiId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(mucphi, updateBody);
  await mucphi.save();
  return mucphi;
};

/**
 * Delete mucphi by id
 * @param {ObjectId} mucphiId
 * @returns {Promise<Mucphi>}
 */
const deleteMucphiById = async (mucphiId) => {
  const mucphi = await getMucphiById(mucphiId);
  if (!mucphi) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Mucphi not found');
  }
  await mucphi.remove();
  return mucphi;
};

module.exports = {
  createMucphi,
  queryMucphis,
  getMucphiById,
  getMucphiByEmail,
  updateMucphiById,
  deleteMucphiById,
};
