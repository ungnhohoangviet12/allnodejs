const httpStatus = require('http-status');
const { Dongxe } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a dongxe
 * @param {Object} dongxeBody
 * @returns {Promise<Dongxe>}
 */
const createDongxe = async (dongxeBody) => {

  return Dongxe.create(dongxeBody);
};

/**
 * Query for dongxes
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryDongxes = async (filter, options) => {
  const dongxes = await Dongxe.paginate(filter, options);
  return dongxes;
};

const queryDongxefils = async (sochongoi2, options) => {

  const dongxes = await Dongxe.findAll({
    where: { sochongoi:sochongoi2 }
  });
  
  return dongxes;
};

/**
 * Get dongxe by id
 * @param {ObjectId} id
 * @returns {Promise<Dongxe>}
 */
const getDongxeById = async (id) => {
  return Dongxe.findById(id);
};

/**
 * Get dongxe by email
 * @param {string} email
 * @returns {Promise<Dongxe>}
 */
const getDongxeByEmail = async (email) => {
  return Dongxe.findOne({ email });
};

/**
 * Update dongxe by id
 * @param {ObjectId} dongxeId
 * @param {Object} updateBody
 * @returns {Promise<Dongxe>}
 */
const updateDongxeById = async (dongxeId, updateBody) => {
  const dongxe = await getDongxeById(dongxeId);
  if (!dongxe) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dongxe not found');
  }
  if (updateBody.email && (await Dongxe.isEmailTaken(updateBody.email, dongxeId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(dongxe, updateBody);
  await dongxe.save();
  return dongxe;
};

/**
 * Delete dongxe by id
 * @param {ObjectId} dongxeId
 * @returns {Promise<Dongxe>}
 */
const deleteDongxeById = async (dongxeId) => {
  const dongxe = await getDongxeById(dongxeId);
  if (!dongxe) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Dongxe not found');
  }
  await dongxe.remove();
  return dongxe;
};

module.exports = {
  createDongxe,
  queryDongxes,
  getDongxeById,
  getDongxeByEmail,
  updateDongxeById,
  deleteDongxeById,
  queryDongxefils,
};
