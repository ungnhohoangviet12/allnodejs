const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');


const khoaSchema = mongoose.Schema(
  {
    makhoa: {
      type: String,
      required: true,
      trim: true,
    },
   
    tenkhoa: {
      type: String,
      required: true,
      trim: true,
    },
    dienthoai: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
khoaSchema.plugin(toJSON);
khoaSchema.plugin(paginate);



/**
 * @typedef Khoa
 */
const Khoa = mongoose.model('Khoa', khoaSchema);

module.exports = Khoa;
// ung nho hoang viet