const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');


const dongxeSchema = mongoose.Schema(
  {
    dongxe: {
      type: String,
      required: true,
      trim: true,
    },
   
    hangxe: {
      type: String,
      required: true,
      trim: true,
    },
    sochongoi: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
dongxeSchema.plugin(toJSON);
dongxeSchema.plugin(paginate);



/**
 * @typedef Dongxe
 */
const Dongxe = mongoose.model('Dongxe', dongxeSchema);

module.exports = Dongxe;
// ung nho hoang viet