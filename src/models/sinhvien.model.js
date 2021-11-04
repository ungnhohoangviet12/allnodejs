const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');


const sinhvienSchema = mongoose.Schema(
  {
    masv: {
      type: Number,
      required: true,
      trim: true,
    },
   
    hotensv: {
      type: String,
      required: true,
      trim: true,
    },
    makhoa: {
      type: String,
      required: true,
      trim: true,
    },
    namsinh: {
      type: Number,
      required: true,
      trim: true,
    },
    quequan: {
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
sinhvienSchema.plugin(toJSON);
sinhvienSchema.plugin(paginate);



/**
 * @typedef Sinhvien
 */
const Sinhvien = mongoose.model('Sinhvien', sinhvienSchema);

module.exports = Sinhvien;
