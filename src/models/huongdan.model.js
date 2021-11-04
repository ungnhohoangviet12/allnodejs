const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');


const huongdanSchema = mongoose.Schema(
  {
    masv: {
      type: Number,
      required: true,
      trim: true,
    },
   
    madt: {
      type: String,
      required: true,
      trim: true,
    },
    magv: {
      type: Number,
      required: true,
      trim: true,
    },
    ketqua: {
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
huongdanSchema.plugin(toJSON);
huongdanSchema.plugin(paginate);



/**
 * @typedef Huongdan
 */
const Huongdan = mongoose.model('Huongdan', huongdanSchema);

module.exports = Huongdan;
// ung nho hoang viet