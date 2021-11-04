const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');


const detaiSchema = mongoose.Schema(
  {
    madt: {
      type: String,
      required: true,
      trim: true,
    },
   
    tendt: {
      type: String,
      required: true,
      trim: true,
    },
    kinhphi: {
      type: Number,
      required: true,
      trim: true,
    },
    noithuctap: {
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
detaiSchema.plugin(toJSON);
detaiSchema.plugin(paginate);



/**
 * @typedef Detai
 */
const Detai = mongoose.model('Detai', detaiSchema);

module.exports = Detai;
// ung nho hoang viet