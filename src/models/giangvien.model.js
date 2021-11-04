const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');


const giangvienSchema = mongoose.Schema(
  {
    magv: {
      type: Number,
      required: true,
      trim: true,
    },
   
    hotengv: {
      type: String,
      required: true,
      trim: true,
    },
    luong: {
      type: String,
      required: true,
      trim: true,
    },
    makhoa: {
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
giangvienSchema.plugin(toJSON);
giangvienSchema.plugin(paginate);



/**
 * @typedef Giangvien
 */
const Giangvien = mongoose.model('Giangvien', giangvienSchema);

module.exports = Giangvien;
// ung nho hoang viet