const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');


const mucphiSchema = mongoose.Schema(
  {
    mamp: {
      type: String,
      required: true,
      trim: true,
    },
   
    dongia: {
      type: Number,
      required: true,
      trim: true,
    },
    mota: {
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
mucphiSchema.plugin(toJSON);
mucphiSchema.plugin(paginate);



/**
 * @typedef Mucphi
 */
const Mucphi = mongoose.model('Mucphi', mucphiSchema);

module.exports = Mucphi;
// ung nho hoang viet